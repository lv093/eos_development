## 加入EOS开发者专用区块链：DEV开发链
#### 作者：古千峰

DEV（Developer）开发链是由【柚子杯】黑客马拉松官方基于[EOS 1.0.7](https://github.com/EOS-Mainnet/eos)创建的开发者专用区块链，该开发链旨在为开发者提供更好的线上开发和调试环境。

### 一、加入 DEV 开发链的条件

任何个人，组织都可以使用`DEV开发链`。按以下步骤操作即可加入。

### 二、编译安装eosio

按照[EOSIO编译安装](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/eos_compile_install.md)文档说明，在服务器上安装EOSIO。

### 三、节点配置

进到配置文件的目录，默认情况下，输入命令：

```
cd ~/.local/share/eosio/nodeos/config
```
将[config.ini](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/config.ini)文件复制到该目录下，并修改以下内容：

* p2p-server-address = 改成你自己的服务器IP和监听的p2p端口, 默认是 IP:9876。如果你不需要被其他节点链接，则无需设置。
* agent-name = 改成你自己的标识, 域名或其他.
* producer-name = 改成你申请成为BP的账户名称，12个字符（a-z,1-5）。注意事先需要在网络上注册该帐号。
* signature-provider = BP帐号的公钥与私钥，格式为：`公钥=KEY:私钥`
* 可以通过[密钥对生成工具](http://178.62.196.196/eosjs-ecc/)创建并妥善保存好生成的公钥和私钥。

将 [genesis.json](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/genesis.json) 文件拷贝到以上`config`目录, 不需要修改.

### 四、启动节点
如果是服务器节点，则`第一次`必须使用以下命令启动，同步区块数据。

```
nodeos --delete-all-blocks --genesis-json ~/.local/share/eosio/nodeos/config/genesis.json
```

运行起来后，用 `docker logs -f --tail=100 party` 查看最新100条日志。或者通过

```
cleos get info
```
获取最新的区块数据。

**注意：**

1- 第一次启动，必须要使用`--genesis-json`指定块数据文件，否则无法同步

2- 如果因故，同步区块数据停止，则之后只需要执行`nodeos`即可继续同步。

3- 可以用 `nohup` 将以上进程以常驻方式运行。

**到目前为止，该节点是普通节点，并非BP，该节点只同步数据。**

### 五、申请成为BP
如果希望成为`DEV开发链`的区块生产者，即BP，可向官方`免费`申请。申请成为BP，需要具备以下条件：

*   内存大于8G，硬盘容量大于160G，CPU至少双核的公网服务器
*   确保以上服务器能24小时长期在线，且专用于本网络节点，并提供能至少18个月正常运行的缴费证明
*   具有节点部署能力的技术人员，即根据本文档，能自行启动节点
*   参加过由黑客马拉松官方举办的EOS开发者培训，或已经参加过柚子杯黑客马拉松赛事的
*   正在开发或者有计划开发至少一个DAPP应用，提供Demo或者白皮书


#### 1- 创建帐号

在DEV开发链上为BP创建一个帐号，请将配置文件`config.ini`中的`producer-name`的账户名以及对应的公钥发给【柚子杯】黑客马拉松主办方，主办方会在审核BP资格后，创建建立BP帐号。

帐号创建后后，申请人可以通过以下命令，获取该bp账户信息：

```
cleos -u http://178.62.196.196:8888 get account 新账号名
```

#### 2- 自助申请成为BP
首先，创建一个默认钱包并保存好密码

```
cleos wallet create
``` 

其次，导入bp帐号的私钥

```
cleos wallet import 私钥
```

然后，注册申请成为BP

```
cleos -u http://178.62.196.196:8888 system regproducer {BP用户名producer-name} {公钥} http://{服务器IP}:8888
```

执行完后以上命令，再运行

```
cleos -u http://178.62.196.196:8888 system listproducers
```
在produducers列表中应该有你的`producer-name`。

#### 3- 投票并获取BP资格

注册成为BP之后并不会立即出块, 因为你还没有投票。与【柚子杯】黑客马拉松官方联系，由官方为您投票，即可完成bp资格确认。
