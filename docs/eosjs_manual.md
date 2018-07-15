## eosjs简明使用手册（最新版）
##### 作者：古千峰 2018-7-15

以下教程用于EOS正式版，已在DEV开发链和EOS1.0.5-1.0.7版本的主链上测试通过。

[官方文档](https://github.com/EOSIO/eosjs/blob/master/README.md)因为版本的原因，内容多有错误，仅供参考。

*eosjs的API与http-RPC调用一致，如rpc使用get-block，则在js中使用getBlock()方法。即去横岗，首字符大写*

### eosjs几个容易出错的地方
* asset类型，表达方式为字符串，如：`100.0000 EOS`，千万注意小数点后四位，少一位都不行
(不断添加中)

### 1- 安装eosjs
`eosjs`用于对交易签名、交易等操作
`eosjs-api`用于读取链上数据，只读，如果只需要读取链上数据的话，只需要使用`eosjs-api`

```
npm install eosjs
npm install eosjs-api
```

### 2- 建立eosjs与链的连接
```
Eos = require('eosjs')

// Optional configuration..
config = {
  keyProvider: ['PrivateKeys...'], // 配置私钥字符串
  httpEndpoint: 'http://178.62.196.196:8888', //DEV开发链url与端口
  chainId: "0b08e71a2f8caaccc2dc13244b788f5eba29462ecd5d5dea1ad8cbe9581e885a", // 通过cleos get info可以获取chainId
  mockTransactions: () => null, // 如果要广播，需要设为null
  transactionHeaders: (expireInSeconds, callback) => {
    callback(null/*error*/, headers) //手动设置交易记录头，该方法中的callback回调函数每次交易都会被调用
  },
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true,
  authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission
}

eos = Eos(config)
```

### 3- 建立eosjs-api与链的连接
如果加载了eosjs后，默认加载eosjs-api，无需单独链接`eosjs-api`与链

```
EosApi = require('eosjs-api')

// everything is optional
options = {
  httpEndpoint: 'http://178.62.196.196:8888',
  verbose: false, // API logging
  logger: { // Default logging functions
    //log: config.verbose ? console.log : '',
    error: console.error
  },
  fetchConfiguration: {}
}

eos = EosApi(options)

```

### 4- 获取帮助
不添加如何参数，可以获取该方法的使用说明，如：

```
eos.getBlock()
```

### 5- 获取链上最新块信息
```
eos.getInfo({}).then(result => { 
	console.log(result) 
})
```

返回：

```
{ server_version: 'b195012b',
  chain_id: '0b08e71a2f8caaccc2dc13244b788f5eba29462ecd5d5dea1ad8cbe9581e885a',
  head_block_num: 209307,
  last_irreversible_block_num: 209267,
  last_irreversible_block_id: '00033173a9ccd4bdd60a92d257e9354023b0457b134797be472a236cd908bc31',
  head_block_id: '0003319ba8ddc60d80c3cd0c7a70695cfd951f51ace9a798c913384cfbae659c',
  head_block_time: '2018-07-15T01:51:07.500',
  head_block_producer: 'eoshackathon',
  virtual_block_cpu_limit: 100000000,
  virtual_block_net_limit: 1048576000,
  block_cpu_limit: 99900,
  block_net_limit: 1048576 
}
```
如果需要拿到某一个数据值，比如：`head_block_producer`，则使用：

```
eos.getInfo({}).then(result => { 
	console.log(result.head_block_producer) 
})
```

### 6- 获取指定区块信息
```
eos.getBlock(200000).then(result => { console.log(result) }) //获取第200000个区块
```
或者：

```
eos.getBlock({block_num_or_id: 200000}).then(result => { console.log(result) }) //获取第200000个区块
```
或者：

```
eos.getBlock('00030d4011a6744857533a6e6d907037a94c27a2dc006b4d28125f76bed2b355').then(result => { console.log(result) }) //根据id获取区块
```
或者：

```
eos.getBlock({block_num_or_id: '00030d4011a6744857533a6e6d907037a94c27a2dc006b4d28125f76bed2b355'}).then(result => { console.log(result) }) //根据id获取区块
```

或者将返回值传到回调函数callback中处理：

```
callback = (err, res) => { err ? console.error(err) : console.log(res) }
eos.getBlock(200000, callback)
```

### 7- 获取账户余额
```
eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "DEV" }).then(result => console.log(result))
```
以上命令相当于

```
cleos get currency balance eosio.token eosio DEV
```

### 8- 获取某代币的信息
```
eos.getCurrencyStats({code: "eosio.token", symbol: "DEV"}, callback) //用上面出现的callback，下同
```

### 9- 获取账户信息
```
eos.getAccount({account_name: "eoshackathon"}, callback) //获取eoshackathon账户的信息
```

相当于：
```
cleos get account eoshackathon
```

返回：

```
{ account_name: 'eoshackathon',
  head_block_num: 219997,
  head_block_time: '2018-07-15T03:20:12.500',
  privileged: false,
  last_code_update: '1970-01-01T00:00:00.000',
  created: '2018-07-13T20:54:28.000',
  ram_quota: 8148,
  net_weight: 500000,
  cpu_weight: 500000,
  net_limit: { used: 145, available: 120795486, max: 120795631 },
  cpu_limit: { used: 1511, available: 11518458, max: 11519969 },
  ram_usage: 3414,
  permissions:
   [ { perm_name: 'active', parent: 'owner', required_auth: [Object] },
     { perm_name: 'owner', parent: '', required_auth: [Object] } ],
  total_resources:
   { owner: 'eoshackathon',
     net_weight: '50.0000 DEV',
     cpu_weight: '50.0000 DEV',
     ram_bytes: 8148 },
  self_delegated_bandwidth: null,
  refund_request: null,
  voter_info: null 
}
```

### 10- 获取智能合约代码
```
eos.getCode({ account_name: "eosio"}, callback)
```
获取`eosio`账户的所有合约代码

### 11- 获取智能合约ABI
```
eos.getAbi({ account_name: "eosio"}, callback)

```

### 12- 获取Table行数据
```

```

### 13- 获取账户的Actions列表
```
eos.getActions({account_name: "eoshackathon", pos: 0, offset: 15}, callback)
```

### 14- 获取公钥对应的账户
```
eos.getKeyAccounts({ public_key: 公钥字符串}, callback)
```
如果查找到帐号，则返回`[]`（为什么会这样？），如果该公钥没有对应帐号，则报错。
相当于：

```
cleos get accounts 公钥
```

### 15- 获取主账号控制的其他帐号
```
eos.getControlledAccounts({ controlling_account: "eoshackathon"}, callback)
```

### 16- 获取transaction交易细节
该指令有bug，慎用！

```
eos.getTransaction({id: "xxxx"}, callback)
```

### 17- 转账交易
首先，在链接配置`config`中，`keyProvider: [发送方私钥]`
其次，可以设置`options`参数如下：

```
options = {
    authorization: 'testtesttest@active',
    broadcast: true,
    sign: true
}
```
##### 方式1：
```
eos.transfer('发送方帐号', '接收方帐号', '0.3000 DEV','memo')
```
如果需要对返回值处理：

```
eos.transfer('发送方帐号', '接收方帐号', '0.3000 DEV','memo', callback)
```
如果有`options`参数，则：

```
eos.transfer('发送方帐号', '接收方帐号', '0.3000 DEV','memo', options, callback)
```
##### 方式2：
使用对象：

```
eos.transfer({ from: '发送方帐号', to: '接收方帐号', quantity: '0.1000 DEV', memo: '备注', callback })
```
如果不想广播交易，可以使用以下简便指令：

```
eos.transfer('发送方帐号', '接收方帐号', '0.3000 DEV','memo', false) //在最后加上false，不广播
```

##### 方式3：
使用`eos.transaction`，构造对象执行

```
eos.transaction(
	{
        // ...headers,
        actions: [
            {
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: '发送方帐号',
                    permission: 'active'
                }],
                data: {
                    from: '发送方帐号',
                    to: '接收方帐号',
                    quantity: '0.3000 DEV',
                    memo: '备注'
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
)
```

以上命令与以下`cleos`相同：

```
cleos push action eosio.token transfer '[ "发送方帐号", "接收方帐号",  "0.3000 DEV", "备注" ]' -p 发送方帐号
```

### 18- 新建帐号
```
creatoraccount = "testtesttest" //主账号
newaccount = "testtest1113" //新账号
newaccount_pubkey = "EOS5LUYdLZAd3uHF5XGAeE61aTeSXWqvqxBSUq3uhqYH7kY15Drjf" //新账号的公钥

eos.transaction(tr => {
    tr.newaccount({
        creator: creatoraccount,
        name: newaccount,
        owner: newaccount_pubkey,
        active: newaccount_pubkey
    })

    tr.buyrambytes({
        payer: creatoraccount,
        receiver: newaccount,
        bytes: 8192
    })

    tr.delegatebw({
        from: creatoraccount,
        receiver: newaccount,
        stake_net_quantity: '1.0000 DEV',
        stake_cpu_quantity: '1.0000 DEV',
        transfer: 0
    })
})

```

### 19- 购买RAM
```
creatoraccount = "testtesttest" //主账号
newaccount = "testtest1113" //新账号

eos.transaction(tr => {
    tr.buyrambytes({
        payer: creatoraccount,
        receiver: newaccount,
        bytes: 8192 
    })
```
或者

```
eos.transaction(tr => {
    tr.buyram({
        payer: creatoraccount,
        receiver: newaccount,
        quant: 8 //以k为单位的内存，8k=8192字节
    })

```

### 20- 出售RAM
```
eos.transaction(tr => {
    tr.sellram({
        account: 'testtesttest',
        bytes: 1024 //出售1k内存
    })
})

```

### 21- 竞拍账号名
```
eos.transaction(tr => {
    tr.bidname ({
        bidder: "testtesttest",
        newname: "竞拍的名字",
        bid: 价格
    })
})
```

### 22- 抵押CPU和NET
```
eos.transaction(tr => {
    tr.delegatebw({
        from: "testtesttest",
        receiver: "testtesttest",
        stake_net_quantity: "1.0000 DEV",
        stake_cpu_quantity: "1.0000 DEV",
        transfer: 0 //必须是0
    })
})

```

### 23- 取消抵押（赎回）CPU和NET
```
eos.transaction(tr => {
    tr.undelegatebw({
        from: "testtesttest",
        receiver: "testtesttest",
        unstake_net_quantity: "0.1000 DEV", //速回0.1个DEV
        unstake_cpu_quantity: "0.1000 DEV"
    })
})
```

### 24- 智能合约部署
如果是加载`wasm`合约，不用使用`binaryen`，如果加载`wast`合约，需要安装并使用`binaryen`，如下：

```
npm install binaryen@39.0.0
```
并用以下方式导入到js

```
binaryen = require('binaryen')
eos = Eos({keyProvider, binaryen})
```

##### 部署合约

```
wasm = fs.readFileSync(`contracts/hello/hello.wasm`) //这个文件在客户端上，而不是在服务器上
abi = fs.readFileSync(`contracts/hello/hello.abi`)

// Publish contract to the blockchain
eos.setcode('contract_name', 0, 0, wasm) // contract_name 为合约名
eos.setabi('contract_name', JSON.parse(abi)) // @returns {Promise}
```

### 25- 智能合约的执行
##### 方法一：
```
eos.contract("contract_name").then(hello => {  //hello随便起的变量名
    hello.hi('axay', {                         //hi是方法名, 'axay'是该hello合约hi方法的参数
    	authorization: ['testtesttest']        //testtesttest是建立该合约的用户
    }).then(result => {
        console.log(result);
    });
});
```

##### 方法二：
```
eos.transaction(
    {
        actions: [
            {
                account: 'testtesttest',  //合约名
                name: 'hi',               //方法名
                authorization: [{
                    actor: 'testtesttest',
                    permission: 'active'
                }],
                data: {
                    user: 'axay'
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
```

### 24- 通过eosjs发行一个代币
发行代币有两种方式，一种是通过`cleos`，[参考这里](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/token_exchange_msig.md)，但前提是必须要安装好EOS系统。
另一种方式是通过`eosjs`，无需在本机安装EOS系统。

注意：

1- 需要将`eosio.token`的私钥导入到`keyProvider`数组中

2- 如果出于安全原因，不允许将`eosio.token`加到程序中，则可以由发币的用户部署`eosio.token`合约，然后再做接下去的操作。

#### 第一步：创建代币
```
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'eosio.token',       //合约
                name: 'create',               //调用创建代币的方法
                authorization: [{
                    actor: 'eosio.token',     //必须是eosio.token
                    permission: 'active'
                }],
                data: {
                    issuer: 'testtesttest',   //代币发行方
                    maximum_supply: '10000.0000 AAA', //代币总量与名称
                    can_freeze: 0,
                    can_recall: 0,
                    can_whitelist: 0
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
```
#### 第二步：发行代币
```
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'eosio.token',      //合约
                name: 'issue',               //调用发行代币的方法
                authorization: [{
                    actor: 'testtesttest',   //必须是代币的发行方
                    permission: 'active'
                }],
                data: {
                    to: 'testtesttest',      //收到代币的帐号
                    quantity: '1000.0000 AAA',
                    memo: "testtesttest issue 1000 AAA"
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
```

可以将以上两步合在一起操作，如：

```
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'eosio.token',  //合约
                name: 'create',               //方法
                authorization: [{
                    actor: 'eosio.token',
                    permission: 'active'
                }],
                data: {
                    issuer: 'testtesttest',
                    maximum_supply: '10000000.0000 GAT',
                    can_freeze: 0,
                    can_recall: 0,
                    can_whitelist: 0
                }
            },
            {
                account: 'eosio.token',  //合约
                name: 'issue',               //方法
                authorization: [{
                    actor: 'testtesttest',
                    permission: 'active'
                }],
                data: {
                    to: 'testtest1111',
                    quantity: '1000.0000 GAT',
                    memo: "testtesttest issue 1000 GAT to testtest1111"
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
```

