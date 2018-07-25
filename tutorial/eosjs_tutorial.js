/**
 * eosjs 培训课程用js
 * By 古千峰@BTCMedia
 * July.14, 2018
 */

Eos = require('eosjs')         // 实例化 eosjs
binaryen = require('binaryen') // 如果执行vast的智能合约，需要安装并引用 binaryen
fs = require('fs')             // 文件管理

const PrivateKey = "5K7gP9ZifrUmatPHpEj4pf7N3Wq7vNyXVsUcYWjc768rVcR9hTV"    //testtesttest on dev network
const PublicKey = "EOS5Xs5ywPaP2qZRRw5A9apjnbbbR4Q8eb1gAsxCKzWG1CBQCop5w"   //testtesttest on dev network
const Privatekey2 = "5KZHXHB3Hzj6YpWPqWDQqubQLzsSn187TQ5qpTArCBmo6xtHTzQ"   //testtest1114 账户中部署合约，所以需要将此账户的私钥导入
const eosioPriKey = ""                                                      //如果需要做eosio的系统操作，则需要将eosio的私钥导入
const chainid = "0b08e71a2f8caaccc2dc13244b788f5eba29462ecd5d5dea1ad8cbe9581e885a" //dev network，通过cleos get info命令得到

config = {
    keyProvider: [PrivateKey, Privatekey2], //将操作方的私钥加入到 keyProvider 数组中，类似于将私钥导入到钱包的操作
    httpEndpoint: 'http://178.62.196.196:8888', //这是DEV测试链的地址
    chainId: chainid,
    mockTransactions: () => null,
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    verbose: false,
    sign: true,
    binaryen: binaryen
}
eos = Eos(config)
// 统一用回调函数
callback = (err, res) => { err ? console.error(err) : console.log(res) }

/**
 * =============================
 * 第一部分：获取链上信息
 * =============================
 */

//eos.getBlock() //获取区块 getBlock 的帮助
//eos.getBlock(200000).then(result => { console.log(result) })
//eos.getBlock({ block_num_or_id: 200000 }).then(result => console.log(result))
//eos.getBlock({ block_num_or_id: '00030d4011a6744857533a6e6d907037a94c27a2dc006b4d28125f76bed2b355'}).then(result => { console.log(result) })
//eos.getBlock(200000, callback)
//eos.getBlock({ block_num_or_id: 1 }, callback)

//eos.getInfo({}).then(result => { console.log(result) })

/**
 * =============================
 * 第二部分：获取账户相关信息
 * =============================
 */

// eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "DEV" }).then(result => console.log(result))
// eos.getCurrencyStats({code: "eosio.token", symbol: "DEV"}, callback)
// eos.getAccount({account_name: "testtesttest"}, callback)
// eos.getCode({ account_name: "eosio.token"}, callback) //EOS的智能合约归属于一个账户，账户名即该合约的合约名，一个账户只能部署一个合约，合约可以被替换
// eos.getAbi({ account_name: "eosio.token" }, callback)
// eos.getActions({account_name: "testtesttest", pos: 0, offset: 15}, callback)
// eos.getKeyAccounts({ public_key: PublicKey}, callback)
// eos.getControlledAccounts({ controlling_account: "testtesttest"}, callback)
// eos.getTransaction({ id: "d67c1c448e7c38279a575d845f5a2acedcb3c64d9bb70a0984909c5b19acb1fe"}, callback)

/**
 * =============================
 * 第三部分：转账
 * =============================
 */
/*
options = {
    authorization: 'testtesttest@active',
    broadcast: true,
    sign: true
}
*/

/**
 * 方法一：使用对象参数
 */

//eos.transfer({ from: 'testtesttest', to: 'testtest1111', quantity: '0.1000 DEV', memo: '', callback }) //从testtesttest发送0.1个EOS到testtest1111账户

/**
 * 方法二：使用普通参数
 */

//eos.transfer('testtesttest', 'testtest1111', '0.0500 DEV','', options, callback) 

/**
 * 方法三：使用 transaction 通用方法
 */

/*
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: 'testtesttest',
                    permission: 'active'
                }],
                data: {
                    from: 'testtesttest',
                    to: 'testtest1111',
                    quantity: '0.0300 DEV',
                    memo: 'from eos.transaction'
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
)
*/

/**
 * =============================
 * 第四部分：新建账户
 * =============================
 */

/*
newaccount = "testtest1114"
newaccount_pubkey = "EOS7pZi4BxY2HK5kjxbM6NZApy31gUhazQFx6bsixs2Gdg7R1C72C"
eos.transaction(tr => {
    tr.newaccount({
        creator: 'testtesttest',
        name: newaccount,
        owner: newaccount_pubkey,
        active: newaccount_pubkey
    })

    tr.buyrambytes({
        payer: 'testtesttest',
        receiver: newaccount,
        bytes: 8192
    })

    tr.delegatebw({
        from: 'testtesttest',
        receiver: newaccount,
        stake_net_quantity: '1.0000 DEV',
        stake_cpu_quantity: '1.0000 DEV',
        transfer: 0
    })
}).then(result => console.log(result))
*/

/**
 * =============================
 * 第五部分：购买与销售RAM
 * =============================
 */

/*
eos.transaction(tr => {
    tr.buyrambytes({
        payer: 'testtesttest',
        receiver: 'testtest1114',
        bytes: 819200
    })
}).then(result => console.log(result))
*/

/*
eos.transaction(tr => {
    tr.sellram({
        account: 'testtesttest',
        bytes: 1024 //出售1k内存
    })
}).then(result => console.log(result))
*/

/**
 * =============================
 * 第六部分：竞拍账户名
 * =============================
 */
/*
eos.transaction(tr => {
    tr.bidname({
        bidder: "testtesttest",
        newname: "竞拍的名字",
        bid: 价格
    })
}).then(result => console.log(result))
*/

/**
 * =============================
 * 第七部分：抵押 CPU 和 NET
 * =============================
 */

// 抵押CPU
/*
eos.transaction(tr => {
    tr.delegatebw({
        from: "testtesttest",
        receiver: "testtesttest",
        stake_net_quantity: "1.0000 DEV",
        stake_cpu_quantity: "1.0000 DEV",
        transfer: 0
    })
}).then(result => console.log(result))
*/

// 取消抵押
/*
eos.transaction(tr => {
    tr.undelegatebw({
        from: "testtesttest",
        receiver: "testtesttest",
        unstake_net_quantity: "0.1000 DEV",
        unstake_cpu_quantity: "0.1000 DEV"
    })
}).then(result => console.log(result))
*/

/**
 * =============================
 * 第八部分：智能合约部署
 * =============================
 * 每个账户只能部署一个合约，账户名即合约名，如以下命令在 testtest1114 账户建立一个 testtest1114 的合约
 * hello 合约可以[点击这里下载](https://github.com/eoshackathon/eos_dapp_development_cn/tree/master/contract)，将wasm和abi文件直接下载到本机目录下。
 *
 * 注意:
 * 1- 需要将 testtest1114 账户的私钥导入
 * 2- 部署合约消耗的 RAM 很高，需要分配足够的 RAM
 * 3- 检测是否不熟成功，用 cleos get code 账户名
 */
/*
wasm = fs.readFileSync(`/Users/guqianfeng/Downloads//hello/hello.wasm`)
abi = fs.readFileSync(`/Users/guqianfeng/Downloads//hello/hello.abi`)

eos.setcode('testtest1114', 0, 0, wasm)
eos.setabi('testtest1114', JSON.parse(abi))
*/

/**
 * =============================
 * 第九部分：执行智能合约
 * =============================
 */

// 方法一：
// 以下hi为方法名
// 以下命令等同于：cleos push action testtest1114 hi '["guqianfeng"]' -p testtesttest
/*
eos.contract("testtest1114").then(hello => {
    hello.hi('guqianfeng', { authorization: ["testtesttest"] }).then(res => {
        console.log(res);
    });
});
*/

// 方法二：
/*
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'testtest1114',  //合约
                name: 'hi',               //方法
                authorization: [{
                    actor: 'testtesttest',
                    permission: 'active'
                }],
                data: {
                    user: 'guqianfeng'
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

/**
 * =======================================
 * 第十部分：使用eosio.token账户 发行代币
 * =======================================
 */

// 第一步：创建
/*
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
                    issuer: 'eosio',
                    maximum_supply: '10000.0000 AAA',
                    can_freeze: 0,
                    can_recall: 0,
                    can_whitelist: 0
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

// 第二步：发行到某账户
/*
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'eosio.token',  //合约
                name: 'issue',               //方法
                authorization: [{
                    actor: 'testtesttest',
                    permission: 'active'
                }],
                data: {
                    to: 'testtest1111',
                    quantity: '500.0000 AAA',
                    memo: ""
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

//创建与发行合并在一起
/*
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
                    maximum_supply: '10000.0000 AAA',
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
                    to: 'testtesttest',
                    quantity: '500.0000 AAA',
                    memo: "testtesttest issue 500 AAA"
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

/**
 * =======================================
 * 第十一部分：通过用户自己的账户 发行代币
 * =======================================
 * 由于eosio.token账户操作需要在js中导入eosio.token私钥，这种操作是很危险的，因此，一般用户自己会部署eosio.token合约，然后在该合约中户中发行代币
 */

// 第一步：部署 eosio.token 合约
// eosio.token 合约可以[点击这里下载](https://github.com/eoshackathon/eos_dapp_development_cn/tree/master/contract)，将wasm和abi文件直接下载到本机目录下。
// 注意：如果部署合约失败，请先部署一个hello合约，然后将其覆盖，原因不知。

/*
wasm = fs.readFileSync(`/Users/guqianfeng/Downloads/eosio.token/eosio.token.wasm`)
abi = fs.readFileSync(`/Users/guqianfeng/Downloads/eosio.token/eosio.token.abi`)

eos.setcode('testtest1114', 0, 0, wasm) //仍旧部署在 testtest1114 账户上
eos.setabi('testtest1114', JSON.parse(abi))
*/

// 第二步：创建代币
/*
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'testtest1114',      //合约名，即发行帐号
                name: 'create',               //方法
                authorization: [{
                    actor: 'testtest1114',    //创建帐号
                    permission: 'active'
                }],
                data: {
                    issuer: 'testtest1114',   //发行方
                    maximum_supply: '10000.0000 AAB',
                    can_freeze: 0,
                    can_recall: 0,
                    can_whitelist: 0
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

//发行成功后，通过以下命令检测是否成功
//eos.getCurrencyStats({code: "testtest1114", symbol: "AAB"}, callback)

// 第三步：发行到某账户
/*
eos.transaction(
    {
        // ...headers,
        actions: [
            {
                account: 'testtest1114',     //合约
                name: 'issue',               //方法
                authorization: [{
                    actor: 'testtest1114',
                    permission: 'active'
                }],
                data: {
                    to: 'testtesttest',
                    quantity: '500.0000 AAB',
                    memo: ""
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => console.log(result))
*/

//以上步骤完成后，可以通过以下命令查看账户余额，应该可以看到 testtesttest 账户中有 500.0000 AAB
//eos.getCurrencyBalance({ code: "testtest1114", account: "testtesttest", symbol: "AAB" }).then(result => console.log(result))
