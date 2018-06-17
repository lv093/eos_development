## EOS Party测试网络
测试区块链浏览器: [https://party.eosmonitor.io/](https://party.eosmonitor.io/)

EOS Party 测试网络是由EOSFans基于[EOS DAWN v1.0.1](https://github.com/EOS-Mainnet/eos)创建的测试网络，该测试网络旨在为开发者提供更好的线上开发和测试环境．

### 加入 EOS Party 测试网络

任何个人,组织都可以加入`EOS Party`, 加入 `EOS Party` 测试网络成为BP需要以下几个步骤：

*   自己的服务器
*   EOS环境搭建(建议使用Docker)
*   创建账号

#### 1- 自己的服务器

作为EOS节点要为网络提供稳定的产生区块，所以需要参与者有稳定的服务器，基础服务器参考配置：   

*   CPU:1核
*   内存:4G
*   磁盘：40G

#### 2- EOS环境搭建(Docker快速部署)

确保你的服务器已经安装`Docker`和`Docker-Compose`, `Docker-Compose`不是必须.

*   `mkdir -p /data/eos` 创建你的EOS节点数据存储的目录, 也可以是其他目录.
*   将 [config.ini](https://github.com/eosfansio/EOS-Party-Testnet/blob/master/config.ini) 拷贝到`/data/eos` 并修改四处地方.
    *   p2p-server-address: 改成你自己的服务器IP和监听的p2p端口, 默认是 IP:9876。如果你不需要被其他节点链接，则无需设置。
    *   agent-name: 改成你自己的标识, 域名或其他.
    *   private-key: 你的密钥对, 建议[创建](https://eosfans.io/tools/generate/)全新的.
    *   主网1.0.2.2版本后，`private-key`被弃用，改为：`signature-provider = 公钥=KEY:私钥`
    *   producer-name: 节点账户名(12位[12345a-z]字符串).

*   将 [genesis.json](https://github.com/eosfansio/EOS-Party-Testnet/blob/master/genesis.json) 文件拷贝到`/data/eos`目录, 不需要修改.
运行Docker命令：
```
    docker run -d \
        --restart=always \
        --name party \
        -v /data/eos:/opt/eosio/bin/data-dir \
        -v /data/eos/nodeos:/root/.local/share/eosio/nodeos \
        -p 8888:8888 \
        -p 9876:9876 \
        eosfans/eos:launch-1.0.1 nodeosd.sh --delete-all-blocks  --genesis-json /opt/eosio/bin/data-dir/genesis.json
```
启动节点.
用`docker logs -f --tail=100 party`  查看最新100条日志.

*   如果是服务器节点，则`第一次`必须使用以下命令启动，同步区块数据。
```
nodeos --delete-all-blocks --genesis-json /opt/eosio/bin/data-dir/genesis.json
```
*注意：必须要使用`--genesis-json`指定块数据文件，否则无法同步*

*   如果因故，同步区块数据停止，则之后只需要执行`nodeos`即可继续同步。

#### 3- 创建帐号

在测试网络上需要为该BP帐号创建一个账号

##### 方法一：如果在Party测试网络上没有任何帐号，则到[这里](http://203.195.171.163:8081)

![](http://images.laidingyi.com/18-6-17/24411891.jpg)

Account：BP帐号名，即`config.ini`配置文件中`producer-name`

Public Key：公钥，即`config.ini`配置文件中`signature-provider`中的公钥

Transfer：代币SYS数量，最大10000个

##### 方法二：如果在Party测试网络上已经有了帐号，可以键入如下命令：

```
cleos system newaccount --stake-net "10 SYS" --stake-cpu "10 SYS" --buy-ram-kbytes 10000 已有的帐号hackathon123 新账号名guqianfeng13 新账号的公钥EOSXXX
```

*注意：建立新账号时，为新账号开通的资源，将消耗SYS代币。这些消耗，将从已有帐号（父帐号）中扣除。如以上命令运行后：*

```
2498372ms thread-0   main.cpp:428                  create_action        ] result: {"binargs":"304498b46503916930029b6a4de3ac6600409c00"} arg: {"code":"eosio"
,"action":"buyrambytes","args":{"payer":"hackathon123","receiver":"guqianfeng13","bytes":10240000}} 
2498378ms thread-0   main.cpp:428                  create_action        ] result: {"binargs":"304498b46503916930029b6a4de3ac66a086010000000000045359530000000
0a086010000000000045359530000000000"} arg: {"code":"eosio","action":"delegatebw","args":{"from":"hackathon123","receiver":"guqianfeng13","stake_net_quantity"
:"10.0000 SYS","stake_cpu_quantity":"10.0000 SYS","transfer":false}} 

executed transaction: 9c6fe9e0fc005b35e34c9f46a467617127133a91b062fe3e5449410260b90f8a  336 bytes  9293 us
#         eosio <= eosio::newaccount            {"creator":"hackathon123","name":"guqianfeng13","owner":{"threshold":1,"keys":[{"key":"EOS8UHLAw1NJ4...
#         eosio <= eosio::buyrambytes           {"payer":"hackathon123","receiver":"guqianfeng13","bytes":10240000}
#   eosio.token <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ram","quantity":"153.4432 SYS","memo":"buy ram"}
#  hackathon123 <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ram","quantity":"153.4432 SYS","memo":"buy ram"}
#     eosio.ram <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ram","quantity":"153.4432 SYS","memo":"buy ram"}
#   eosio.token <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ramfee","quantity":"0.7710 SYS","memo":"ram fee"}
#  hackathon123 <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ramfee","quantity":"0.7710 SYS","memo":"ram fee"}
#  eosio.ramfee <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.ramfee","quantity":"0.7710 SYS","memo":"ram fee"}
#         eosio <= eosio::delegatebw            {"from":"hackathon123","receiver":"guqianfeng13","stake_net_quantity":"10.0000 SYS","stake_cpu_quant...
#   eosio.token <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.stake","quantity":"20.0000 SYS","memo":"stake bandwidth"}
#  hackathon123 <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.stake","quantity":"20.0000 SYS","memo":"stake bandwidth"}
#   eosio.stake <= eosio.token::transfer        {"from":"hackathon123","to":"eosio.stake","quantity":"20.0000 SYS","memo":"stake bandwidth"}
```
可以看到，主账户消耗了`153.4432 RAM + 0.7710 RAMFee + 10 + 10 = 174.2142 SYS`

成功申请后，通过以下命令，获取该账户信息：

```
cleos get account 账号名
```

通过以下命令，查看该帐号余额

```
cleos get currency balance eosio.token 帐号名
```

#### 4- 自助申请成为BP

`docker exec -it party bash` 进入容器

`cleos wallet create`  创建一个默认钱包并保存好密码

`cleos wallet import {Private_Key}` 导入私钥

`cleos  system regproducer {producer-name}  {public_key} http://{server_ip}:8888`

执行完后以上命令，再运行`cleos system listproducers`，在produducers列表中应该有你的`producer-name`。

#### 5- 给自己投票

注册成为BP之后并不会立即出块, 因为你没有票. 可以在水龙头上尝试给自己转一笔SYS(一次最大1万个).

抵押你的1万个SYS:

`cleos system delegatebw {producer-name} {producer-name} '5000.0000 SYS' '5000.0000 SYS' --transfer`

投票给自己:

`cleos system voteproducer prods {producer-name} {producer-name}`
