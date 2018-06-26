## 创建EOS主网账户

EOS主网已经上线，本教程用来说明如何通过cleos工具来创建一个新账户。

假设`Alice`为`Bob`创建帐号，则`Alice`需要准备如下工具：

* `cleos`工具，该工具的安装与使用见[EOSIO编译安装](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/eos_compile_install.md)

* 拥有一个EOS账户，有自己的公钥/私钥对，并在这个账户中存有一些EOS代币。

如果`Alice`不想安装`cleos`工具，可以使用Scatter钱包结合[eostoolkit工具](https://eostoolkit.io/create)创建，[参考英文视频教程](https://www.youtube.com/watch?v=Q4knOqiwDsU)

#### 一、链接主网

下面列了一些节点链接：

*   [https://eos.greymass.com](https://eos.greymass.com/)
*   [https://api.cypherglass.com](https://api.cypherglass.com)
*   [https://publicapi-mainnet.eosauthority.com](https://publicapi-mainnet.eosauthority.com)
*   [https://mainnet.eoscanada.com](https://mainnet.eoscanada.com)

使用`cleos`工具连接以上任意节点，如：

```
cleos -u https://eos.greymass.com get info
```

会看到如下节点信息：

```
{
  "server_version": "aa351733",
  "chain_id": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  "head_block_num": 2644635,
  "last_irreversible_block_num": 2644305,
  "last_irreversible_block_id": "00285951cd16c4a56a3e534530631c6b087e26901073e66d40fac7e4381fb47f",
  "head_block_id": "00285a9b184a3ccda5429f8bfbbcad8924082d0d25c39586f6e99207cfd00552",
  "head_block_time": "2018-06-25T23:33:02.500",
  "head_block_producer": "eosbeijingbp",
  "virtual_block_cpu_limit": 200000000,
  "virtual_block_net_limit": 1048576000,
  "block_cpu_limit": 199900,
  "block_net_limit": 1048576
}

```

以上说明，当前块高度为`2644635`，由超级节点`eosbeijingbp`产出。

#### 二、Alice创建钱包

如果是第一次操作，`Alice`需要创建一个钱包。(如果已经创建了，则可以跳过本步骤）

```
cleos wallet create
```

然后，将`Alice`账户的私钥导入到该钱包：

```
cleos wallet import *********
```

导入私钥后，可以通过以下命令查看`Alice`的公钥：

```
cleos wallet keys
```

然后将获取到的公钥在主网上确认该账户是否存在：

```
cleos -u https://eos.greymass.com get accounts Alice公钥
```

或者使用下面命令，获取该账号的资源信息：

```
cleos -u https://eos.greymass.com get account Alice账号名
```

#### 三、Bob创建私钥对

`Bob`需要自己操作，创建一个私钥对，命令：

```
cleos create key
```

会得到如下结果：

```
Private key: 5KLUF5********
Public key: EOS8hk*********
```

`Bob`需要将以上两个密钥对保存在安全的地方，然后将公钥`Public key`给`Alice`

#### 四、Alice为Bob创建帐号

`Alice`为`Bob`创建帐号，意味着`Alice`把自己的一部分计算资源分配给了`Bob`，所以需要消耗EOS，笔者测试，如果按以下配置创建帐号的话，需要消耗：0.32左右个EOS。

注意：所有账号名必须为`12`个字符，包括`a-z`以及`1-5`，不含`0`。

首先，`Alice`用以下命令查看余额：

```
cleos -u https://api.cypherglass.com get currency balance eosio.token Alice的帐号名
```

然后，`Alice`用下面命令为`Bob`创建新账号：

```
cleos -u https://api.cypherglass.com system newaccount -x 1000 --stake-net "0.1 EOS" --stake-cpu "0.1 EOS" --buy-ram-kbytes 8 Alice账号名 Bob账号名
```

一会，`Bob`帐号会被建立，通过以下命令查看`Bob`的账户余额：

```
cleos -u https://api.cypherglass.com get account Bob账号
```

接下去，使用以下命令，`Alice`转`0.1个EOS`给`Bob`

```
cleos -u https://api.cypherglass.com transfer Alice账号 Bob账号 "1.0 EOS"
```

完成后，通过以下命令查看`Bob`是否收到了`1.0个EOS`

```
cleos -u https://api.cypherglass.com get currency balance eosio.token Bob账号
```

### Binggo，完成！
