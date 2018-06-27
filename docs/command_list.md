## 快速命令查询

#### 启动节点
```
nodeos -e -p --plugin eosio::wallet_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::account_history_api_plugin --plugin eosio::prod
ucer_plugin
```
如果在config.ini配置中已经将plugin都配置好，则只需要
```
nodeos
```
在linux中，nodeos作为一个可执行文件，会复制到`/usr/local/bin`目录中，从而在任何目录下都可以执行该命令。

#### 创建默认钱包
```
./cleos wallet create
```

#### 设置基础配置智能合约：eosio.bios
```
./cleos set contract eosio ../../contracts/eosio.bios -p eosio -j
```

#### 设置系统智能合约：eosio.system 
部署了该智能合约，eosio账户才可以改包括自己在内的所有账户发行EOS token，才可以执行，注册producer,投票者下注，投票等操作
```
./cleos set contract eosio ../../contracts/eosio.system -j
```

#### 给eosio账户发行EOS token 10个亿
```
./cleos push action eosio issue '{"to":"eosio","quantity":"1000000000.0000 EOS"}' --permission eosio@active -j
```

#### 创建两组密钥对
```
./cleos create key

#keypair1   
#Private key: 5JZ5Wwb8uQbi3A7DmMsD2zevcKCYw1pxmitij1x4xCjU8gv7ucj
#Public key: EOS6a5pr4DS4CksCQSHqTdKMPbAdCyrE4b7QExDwTuCxH1vbkYMqG

#keypair2   
#Private key: 5JKkei9CFtawsvnHt728DUQaahcjHm5nqJsNgZzna9XZKq8eA5c
#Public key: EOS5NiFNF4bG7T49S6f7qVXMAt4RN2WM211s77UZrwD4cz2Xu6gw9
```

#### 导入密钥到默认钱包
```
./cleos wallet import 5JZ5Wwb8uQbi3A7DmMsD2zevcKCYw1pxmitij1x4xCjU8gv7ucj
./cleos wallet import 5JKkei9CFtawsvnHt728DUQaahcjHm5nqJsNgZzna9XZKq8eA5c
```

#### 查看钱包中的密钥对
```
./cleos wallet keys
```

#### 创建账户 currency
```
./cleos create account eosio currency EOS6a5pr4DS4CksCQSHqTdKMPbAdCyrE4b7QExDwTuCxH1vbkYMqG EOS5NiFNF4bG7T49S6f7qVXMAt4RN2WM211s77UZrwD4cz2Xu6gw9 -j
```

#### 设置currency的智能合约
```
./cleos set contract currency ../../contracts/currency -j
```

#### currency 创建合约token CUR 最大发行量10个亿
```
./cleos push action currency create '{"issuer":"currency","maximum_supply":"1000000000.0000 CUR","can_freeze":0,"can_recall":0,"can_whitelist":0}' --permission currency@active -j
```

#### 给currency账户发行 10万 CUR
```
./cleos push action currency issue '{"to":"currency","quantity":"100000.0000 CUR","memo":""}' --permission currency@active -j
```

#### 查询 currency 账户中CUR tokenr的总量
```
./cleos get currency balance 合约名称 用户帐号 代币名称
```

#### currency token 转账
```
./cleos push action currency transfer '{"from":"currency","to":"eosio","quantity":"200.0000 CUR","memo":"my first transfer"}' --permission currency@active -j
```

#### 查询余额 CUR
```
./cleos get currency balance 合约名称 用户帐号
```

## 主网操作命令速查

*主账号与子帐号：EOS采取主账号为子帐号开户，并且分配资源的方式。如果主账号为子帐号分配了资源，则主账号的减少=子帐号的增加*

#### 一、查看资源

```
cleos -u https://eos.greymass.com get account 账户名
```

#### 二、新建账户

```
cleos -u https://eos.greymass.com system newaccount --stake-net "1 EOS" --stake-cpu "1 EOS" --buy-ram-kbytes 1000 主账号 新账户 新账户的owner公钥 [新账户的active公钥]
```

#### 三、列出所有BP

```
cleos -u https://eos.greymass.com system listproducers
```

#### 四、购买RAM

```
cleos -u https://eos.greymass.com system buyram 主账号 子帐号 "1 EOS” 
```

#### 五、卖出RAM

```
cleos -u https://eos.greymass.com system sellram 卖出帐号 RAM字节数
```

#### 六、抵押net和cpu资源

```
cleos -u https://eos.greymass.com system delegatebw 主账号 子帐号 "1 EOS" "1 EOS”
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 七、取消抵押net和cpu资源

```
cleos -u https://eos.greymass.com system undelegatebw 主账号 子帐号 "1 EOS" "1 EOS”
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 八、列出帐号的net和cpu资源

```
cleos -u https://eos.greymass.com system listbw 账号名
```

#### 九、竞拍账号名

```
cleos -u https://eos.greymass.com system bidname 账号名 竞拍帐号 "2.145 EOS”
```
竞拍帐号名，花费2.145 EOS

#### 十、列出拍卖的账号名信息

```
cleos -u https://eos.greymass.com system bidnameinfo 竞拍账号名
```
