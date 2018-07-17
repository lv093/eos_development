## cleos快速命令查询

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

## 主网操作命令速查

*主账号与子帐号：EOS采取主账号为子帐号开户，并且分配资源的方式。如果主账号为子帐号分配了资源，则主账号的减少=子帐号的增加*

#### 一、查看资源

```
cleos -u https://eos.greymass.com get account 账户名
```

#### 二、新建账户

```
cleos -u https://eos.greymass.com system newaccount --stake-net "0.01 EOS" --stake-cpu "0.01 EOS" --buy-ram-kbytes 10 主账号 新账户 新账户的owner公钥 [新账户的active公钥]
```

#### 三、列出所有BP

```
cleos -u https://eos.greymass.com system listproducers
```

#### 四、购买RAM

```
cleos -u https://eos.greymass.com system buyram 主账号 子帐号 "1 EOS"
```

#### 五、卖出RAM

```
cleos -u https://eos.greymass.com system sellram 卖出帐号 RAM字节数
```

#### 六、抵押net和cpu资源

```
cleos -u https://eos.greymass.com system delegatebw 主账号 子帐号 "1 EOS" "1 EOS"
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 七、取消抵押net和cpu资源

```
cleos -u https://eos.greymass.com system undelegatebw 主账号 子帐号 "1 EOS" "1 EOS"
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 八、列出帐号的net和cpu资源

```
cleos -u https://eos.greymass.com system listbw 账号名
```

#### 九、竞拍账号名

```
cleos -u https://eos.greymass.com system bidname 账号名 竞拍帐号 "2.145 EOS"
```
竞拍帐号名，花费2.145 EOS

#### 十、列出拍卖的账号名信息

```
cleos -u https://eos.greymass.com system bidnameinfo 竞拍账号名
```
