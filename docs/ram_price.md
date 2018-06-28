## 获取RAM价格

命令行中输入：

```
cleos -u http://nodes.get-scatter.com:80 get table eosio eosio rammarket
```

结果：

```
{
  "rows": [{
      "supply": "10000000000.0000 RAMCORE",
      "base": {
        "balance": "26352582837 RAM",
        "weight": "0.50000000000000000"
      },
      "quote": {
        "balance": "2607707.4971 EOS",
        "weight": "0.50000000000000000"
      }
    }
  ],
  "more": false
}
```

然后使用Bancor算法，计算出需要`nKB`的RAM的价格：

```
RAM价格 = (n + quote.balance) / (base.balance / 1024 + n)
```
