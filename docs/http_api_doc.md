## HTTP API调用文档
即RPC调用

官方文档：[https://developers.eos.io/eosio-nodeos/reference](https://developers.eos.io/eosio-nodeos/reference)

## HTTP API

### Chain 关于链的API
#### 1- get_info
功能：获取最新区块信息

参数：无

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_info
```

#### 2- get_block
功能：获取指定块信息

参数：`block_num_or_id`

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_block -d '{"block_num_or_id":191}'
```

#### 3- get_block_header_state
功能：获取区块头状态

参数：`block_num_or_id`

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_block_header_state -d '{"block_num_or_id":191}`
```

#### 4- get_account
功能：获取账户信息

参数：`account_name`

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_account -d '{"account_name":"tester"}'
```

#### 4- get_abi
功能：获取ABI信息

参数：`account_name`

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_abi -d '{"account_name":"eosio.token"}'
```

#### 5- get_code
功能：获取代码

参数：`account_name`, `code_as_wasm`

```
curl -X POST --url http://127.0.0.1:8888/v1/chain/get_code -d '{"code_as_wasm":"true","account_name":"eosio.token"}'
```

#### 6- get_table_rows
功能：获取表格行数

参数：`scope`, `code`, `table`, `json`, `lower_bound`, `upper_bound`, `limit`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/chain/get_table_rows \
  --data '{"scope":"eosio","code":"eosio.token","table":"test_table","json":"true","upper_bound":8}'
```

#### 7- get_currency_balance
功能：获取账户余额

参数：`code`, `account`, `symbol`

```
curl --request POST --url 'http://127.0.0.1:8888/v1/chain/get_currency_balance' -d '{"code":"eosio.token", "account":"user","symbol":"
EOS"}'
```

#### 8- abi_json_to_bin
功能：将JSON的智能合约转换成二进制

参数：`code`, `action`, `args`

args参数位JSON格式

```
curl --request POST --url http://127.0.0.1:8888/v1/chain/abi_json_to_bin --data '{"code":"eosio.token","action":"transfer","args":"{\"from\":\"user\",\"to\":\"tester\",\"quantity\":\"40 EOS\"}"}'
```

#### 9- abi_bin_to_json
功能：将二进制代码转换成JSON格式的智能合约

参数：`code`, `action`, `binargs`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/chain/abi_bin_to_json \
  --data '{"code":"eosio.token","action":"issue","binargs":"000000000587203..."}'
```

#### 10- get_required_keys
功能：返回用于给一个交易签名的keys

参数：`transaction`, `available_keys`

如：有`transaction`（JSON格式）

```
{
  "ref_block_num": "100",
  "ref_block_prefix": "137469861",
  "expiration": "2017-09-25T06:28:49",
  "scope": ["initb", "initc"],
  "actions": [{
    "code": "currency",
    "type": "transfer",
    "recipients": ["initb", "initc"],
    "authorization": [{
      "account": "initb",
      "permission": "active"
    }],
    "data": "000000000041934b000000008041934be803000000000000"
  }],
  "signatures": [],
  "authorizations": []
}
```

以及 `available_keys`（数组格式）

```
["EOS4toFS3YXEQCkuuw1aqDLrtHim86Gz9u3hBdcBw5KNPZcursVHq",
 "EOS7d9A3uLe6As66jzN8j44TXJUqJSK3bFjjEEqR4oTvNAB3iM9SA",
 "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"]
```

则该命令的cURL为：

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/chain/get_required_keys \
  --data '{"available_keys":["EOS4toFS3YXEQCkuuw1aqDLrtHim86Gz9u3hBdcBw5KNPZcursVHq","EOS7d9A3uLe6As66jzN8j44TXJUqJSK3bFjjEEqR4oTvNAB3iM9SA","EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"],"transaction":"{\n  \"ref_block_num\": \"100\",\n  \"ref_block_prefix\": \"137469861\",\n  \"expiration\": \"2017-09-25T06:28:49\",\n  \"scope\": [\"initb\", \"initc\"],\n  \"actions\": [{\n    \"code\": \"currency\",\n    \"type\": \"transfer\",\n    \"recipients\": [\"initb\", \"initc\"],\n    \"authorization\": [{\n      \"account\": \"initb\",\n      \"permission\": \"active\"\n    }],\n    \"data\": \"000000000041934b000000008041934be803000000000000\"\n  }],\n  \"signatures\": [],\n  \"authorizations\": []\n}"}'
```

#### 11- get_currency_stats
功能：获取代币的信息

参数：`code`, `symbol`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/chain/get_currency_stats \
  --data '{"code":"eosio.token","symbol":"EOS"}'
```

如果使用本教程，会看到如下返回，即最大发行量10亿个EOS，已经发行2000个，发行人是eosio

```
{"EOS":{"supply":"2000.0000 EOS","max_supply":"1000000000.0000 EOS","issuer":"eosio"}}
```

#### 12- get_producers
功能：获取节点（BP）信息

参数：`limit`, `lower_bound`, `json`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/chain/get_producers \
  --data '{"limit":"10","json":"true"}'
```

#### 13- push_block
功能：推块

参数较多，[点击链接到官网](https://developers.eos.io/eosio-nodeos/reference#push_block)

#### 14- push_transaction
功能：发送一个交易

该命令非常重要，且使用较为复杂，[请点击这里](how_to_push_transaction_by_http_api.md)

#### 15- push_transactions
功能：发送一组交易

同上

### Wallet 关于钱包的API
#### 1- create 
作用：新建钱包

参数：直接用钱包名

返回：钱包密码

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/create --data '"guqianfeng"'
```
**注意:**
通过http_api建立的钱包，将保存在`~/.local/share/eosio/nodeos/data/`目录下，而不是`~/eosio-wallet/config.ini`中设置的目录。因此，可能发生cleos和http api在不同的钱包目录中操作的情况。（不知道是不是一个bug）

#### 2- open 
功能：打开钱包

参数：直接用钱包名

返回：如果返回值为空，则成功打开钱包

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/open --data '"guqianfeng"'
```

#### 3- lock 
功能：锁定钱包

参数：直接用钱包名

返回：如果返回值为空，则成功锁定钱包

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/lock --data '"guqianfeng"'
```

#### 4- lock_all 
功能：锁定所有钱包

参数：无

返回：空值

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/lock_all
```

#### 5- unlock 
功能：解锁钱包

参数：一个json格式的数组，第一项是`钱包名`，第二项是`钱包密码`

返回：如果返回值为空，则成功解锁钱包

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/unlock --data '["guqianfeng","PW5HuyuuNftajiTPPvABkXZmRG2AyrFpx3W3cgMmeBmZYXK6Q5KEQ"]'
```

#### 6- import_key 
功能：导入私钥

参数：一个json格式的数组，第一项是`钱包名`，第二项是`私钥`（该私钥可以通过其他方式生成，如：`cleos create key`）

返回：如果返回值为空，则成功导入私钥

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/wallet/import_key \
  --data '["guqianfeng","5J5T3cfraaYYnHTRpKdEwu23SwFLiyNykAXK4FZnMxvQRE5eqah"]'
```

#### 7- list_wallets
功能：列出所有钱包

参数：无

返回：钱包数组，如：`["guqianfeng *"]`，如果有*，则说明已经解锁

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/list_wallets
```

#### 8- list_keys
功能：暂时无法使用

参数：无

返回：

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/list_keys
```

#### 9- get_public_keys
功能：列出所有公钥

参数：无

返回：公钥数组

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/get_public_keys
```

#### 10- set_timeout
功能：设置自动锁定钱包的时间，秒数

参数：秒数

返回：如果返回值为空，则成功设置

```
curl --request POST --url http://127.0.0.1:8888/v1/wallet/set_timeout --data 1800
```

#### 11- sign_transaction
功能：对交易签名

请参考push_transaction文档，[请点击这里](how_to_push_transaction_by_http_api.md)

#### 12- set_dir
功能：暂时无法使用

#### 13- set_eosio_key
功能：暂时无法使用

#### 14- sign_digest
功能：暂时无法使用

#### 15- create_key
功能：创建密钥对（暂时无法使用）

### History 获取历史纪录
#### 1- get_actions
功能：获取Actions历史

参数：`pos`, `offset`, `account_name`

返回：Actions数组

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/history/get_actions \
  --data '{"pos":1,"offset":20,"account_name":"user"}'
```

#### 2- get_transaction
功能：返回transaction历史记录

参数：`id`

返回：该交易的json对象

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/history/get_transaction \
  --data '{"id":1000}'
```

#### 3- get_key_accounts
功能：返回给定某个公钥下的所有账户

参数：`public_key`

返回：例如`{"account_names":["eosio.hello","eosio.token","tester","user"]}`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/history/get_key_accounts \
  --data '{"public_key":"EOS4wM7RcsymSrjTR4S4RixzrRPJpfz1hNrToa85kEW34bSMu7e8Z"}'
```

#### 4- get_controlled_accounts
功能：获得控制的账户

参数：`controlling_account`

```
curl --request POST \
  --url http://127.0.0.1:8888/v1/history/get_controlled_accounts \
  --data '{"controlling_account":"guqianfeng"}'
```

### net 网络相关
#### 1- connect

#### 2- disconnect

#### 3- connections

#### 4- status

