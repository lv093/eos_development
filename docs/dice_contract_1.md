### EOS随机数生成与比大小游戏

#### 古千峰 Jacky@BTCMedia

[原文](https://github.com/EOSIO/eos/blob/master/contracts/dice/README.md)

### 第一部分：体验dice合约

首先，生成一个合约账户：`dicedicedice`，公钥：`EOS7RwXcWQVBwV4gkaUSAbuV6kws793LvxDgVvRZQzfUySTHmSJBj`，该账户中已经有了足够的RAM。

生成两个玩家账户：`testtest1112`，`testtest1114`，并给这两个帐号充值些`DEV`。

##### 第一步：部署`dice`合约
```
cleos set contract dicedicedice ~/eos/build/contracts/dice -p dicedicedice
```

##### 第二步：授权`dicedicedice`合约允许控制玩家账户

```
//授权testtest1112用户
cleos set account permission testtest1112 active '{"threshold": 1,"keys": [{"key": "EOS7Zyb7Z3ABStRes5vmg5Ar83hhwVyiMWeLgkKLxNMCKjFFFSuTd","weight": 1}],"accounts": [{"permission":{"actor":"dicedicedice","permission":"eosio.code"},"weight":1}]}' owner -p testtest1112

//授权testtest1114用户
cleos set account permission testtest1114 active '{"threshold": 1,"keys": [{"key": "EOS7pZi4BxY2HK5kjxbM6NZApy31gUhazQFx6bsixs2Gdg7R1C72C","weight": 1}],"accounts": [{"permission":{"actor":"dicedicedice","permission":"eosio.code"},"weight":1}]}' owner -p testtest1114
```

注意：`permission`必须使用`eosio.code`，而不是教程中的`active`，这是BM对`#3013`号问题的回答。

完成以上步骤后，输入命令：`cleos get account testtest1112`，可以看到：

```
permissions:
     owner     1:    1 EOS7Zyb7Z3ABStRes5vmg5Ar83hhwVyiMWeLgkKLxNMCKjFFFSuTd
     active    1:    1 EOS7Zyb7Z3ABStRes5vmg5Ar83hhwVyiMWeLgkKLxNMCKjFFFSuTd1 dicedicedice@eosio.code,
```

##### 第三步：两个玩家分别充值`10 DEV`到合约中
```
cleos push action dicedicedice deposit '[ "testtest1112", "10.0000 DEV" ]' -p testtest1112

cleos push action dicedicedice deposit '[ "testtest1114", "10.0000 DEV" ]' -p testtest1114
```

##### 第四步：双方下注
1- `testtest1112`使用如下命令生成随机密钥：

```
$ openssl rand 32 -hex
```
比如得到：`b6421bf83a31a797f7223a1f78987bceb842dcbf48efd86a8b62b3570d65b547`

2- 然后根据以上密钥生成SH256密钥：

```
$ echo -n 'b6421bf83a31a797f7223a1f78987bceb842dcbf48efd86a8b62b3570d65b547' | xxd -r -p | sha256sum -b | awk '{print $1}'
```
得到：`22d3610089ea01263fb3eef0792523a36a822c1d2f258145886905de707473ab`

3- 下注3个DEV
```
$ cleos push action dicedicedice offerbet '[ "3.0000 DEV", "testtest1112", "22d3610089ea01263fb3eef0792523a36a822c1d2f258145886905de707473ab" ]' -p testtest1112
```

同样的，`testtest1114`账户也分别使用以下命令下注：

```
$ openssl rand 32 -hex

$ echo -n '上面命令生成的随机密钥' | xxd -r -p | sha256sum -b | awk '{print $1}'

$ cleos push action dicedicedice offerbet '[ "3.0000 DEV", "testtest1114", "上面命令生成的SHA256" ]' -p testtest1114
```

##### 第五步：查看合约数据库中状态
1- 输入以下命令：

```
cleos get table dicedicedice dicedicedice account
```
得到如下游戏状态：

```
{
  "rows": [{
      "owner": "testtest1112",
      "eos_balance": "7.0000 DEV",
      "open_offers": 0,
      "open_games": 1
    },{
      "owner": "testtest1114",
      "eos_balance": "7.0000 DEV",
      "open_offers": 0,
      "open_games": 1
    }
  ],
  "more": false
}
```
说明两个账户中都充值了`10 DEV`，每个账户下注了`3 DEV`，余下还有`7 DEV`。

2- 输入以下命令：

```
cleos get table dicedicedice dicedicedice game
```

得到如下数据：

```
{
  "rows": [{
      "id": 1,
      "bet": "3.0000 DEV",
      "deadline": "1970-01-01T00:00:00",
      "player1": {
        "commitment": "22d3610089ea01263fb3eef0792523a36a822c1d2f258145886905de707473ab",
        "reveal": "0000000000000000000000000000000000000000000000000000000000000000"
      },
      "player2": {
        "commitment": "f4c56b665f396b31dea02946d626fe60ce12d30feeaf7db24d1519d1a51cad3b",
        "reveal": "0000000000000000000000000000000000000000000000000000000000000000"
      }
    }
  ],
  "more": false
}
```
以上`commitment`是之前生成的双方的`SHA256`密钥。

##### 第六步：开奖
双方分别执行以下命令：

```
cleos push action dicedicedice reveal '[ "testtest1112的SHA256密钥", "testtest1112的随机密钥" ]' -p testtest1112

cleos push action dicedicedice reveal '[ "testtest1114的SHA256密钥", "testtest1114的随机密钥" ]' -p testtest1114
```

##### 第七步：查看结果
```
cleos get table dicedicedice dicedicedice account
```

得到：

```
{
  "rows": [{
      "owner": "testtest1112",
      "eos_balance": "13.0000 DEV", //赢了3 DEV
      "open_offers": 0,
      "open_games": 0
    },{
      "owner": "testtest1114",
      "eos_balance": "7.0000 DEV",  //输了3 DEV
      "open_offers": 0,
      "open_games": 0
    }
  ],
  "more": false
}
```

##### 第八步：双方提现

```
cleos push action dicedicedice withdraw '[ "testtest1112", "13.0000 DEV" ]' -p testtest1112

cleos push action dicedicedice withdraw '[ "testtest1114", "7.0000 DEV" ]' -p testtest1114
```

注：EOSIO 1.1.2 版本之前，该功能无法使用，是EOSIO的bug。

### 第二部分：解读dice合约
#### 解读`dice`合约的目的：
1- 掌握一个游戏的基本框架设计

2- 学习多索引数据表的操作

3- 学习智能合约级别的转账操作

4- 随机数生成

5- 智能合约的权限管理

[查看dice.cpp程序源码](https://www.eternum.io/ipfs/QmWSVXGbNJWJgSvP93o1yNL3HcGjbkUvCHeMkMPTs9Qyrr)

[解读随机数比较原理，点击这里](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/docs/randomization.md)

### 第三部分：前端javascript开发
(后续)
