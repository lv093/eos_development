## cleos快速命令查询

#### 作者：古千峰

本手册中的命令，基于主网操作，如需在DEV开发链上操作，请将命令中的`http://mainnet.eoscalgary.io`改为`http://178.62.196.196:8888`。

如果`http://mainnet.eoscalgary.io`无法访问，则请查阅[BP节点链接](bp_urls.md)选择任意一个链接取代即可。

#### 一、查看资源

```
cleos -u http://mainnet.eoscalgary.io get account 账户名
```

#### 二、新建账户

```
cleos -u http://mainnet.eoscalgary.io system newaccount --stake-net "0.0100 EOS" --stake-cpu "0.0100 EOS" --buy-ram-kbytes 10 主账号 新账户 新账户的owner公钥 [新账户的active公钥]
```

#### 三、列出所有BP

```
cleos -u http://mainnet.eoscalgary.io system listproducers
```

#### 四、购买RAM

```
cleos -u http://mainnet.eoscalgary.io system buyram 主账号 子帐号 "1.0000 EOS"
```

#### 五、卖出RAM

```
cleos -u http://mainnet.eoscalgary.io system sellram 卖出帐号 RAM字节数
```

#### 六、抵押net和cpu资源

```
cleos -u http://mainnet.eoscalgary.io system delegatebw 主账号 子帐号 "1.0000 EOS" "1.0000 EOS"
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 七、取消抵押net和cpu资源

```
cleos -u http://mainnet.eoscalgary.io system undelegatebw 主账号 子帐号 "1.0000 EOS" "1.0000 EOS"
```
第一个1 EOS是net资源，第二个1 EOS是cpu资源

#### 八、列出帐号的net和cpu资源

```
cleos -u http://mainnet.eoscalgary.io system listbw 账号名
```

#### 九、竞拍账号名

```
cleos -u http://mainnet.eoscalgary.io system bidname 账号名 竞拍帐号 "2.1450 EOS"
```
竞拍帐号

#### 十、修改active密钥对
首先，[点击这里](http://178.62.196.196/eosjs-ecc/)生成一对新的密钥对。

```
cleos -u http://mainnet.eoscalgary.io set account permission 帐号 active 新的公钥 owner -p 帐号@owner
```
注意：`-p`前的`owner`不能少。

使用新的密钥对，需要将新的私钥用`cleos wallet import `导入到钱包

#### 十一、修改owner密钥对
同上，先生成新的密钥对。

```
cleos -u http://mainnet.eoscalgary.io set account permission 帐号 owner 新的公钥 -p 帐号@owner
```
注意：`-p`前不需要`owner`
