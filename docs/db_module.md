## EOS数据库操作

#### 作者：古千峰@BTCMedia

数据库类为`eosio::multi-index`，[官方帮助文档](https://developers.eos.io/eosio-cpp/reference#multi-index)

### 一、定义数据表与程序框架
```
#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

class addressbook : public eosio::contract
{
  // @abi table data i64
  //上面一行不能少，用来编译abi文件需要。上面的 data 就是这个表的名字
  struct address {
     uint64_t account_name; //注意account_name必须是uint64_t类型，并且12个字符，a-z1-5
     string first_name;
     string last_name;
     string street;
     string city;
     string state;
     uint64_t primary_key() const { return account_name; }
     EOSLIB_SERIALIZE( address, (account_name)(first_name)(last_name)(street)(city)(state) )
  };
  public:
    addressbook(account_name self):contract(self) {}  //注意：这里要与类名相同addressbook
    typedef eosio::multi_index< N(address), address > address_index;
    //...
    //接下面的增删改查方法
    //...
}
```
以上代码定义了一个数据表，包括：`account_name`, `first_name`, `last_name`, `street`, `city`, `state` 六个字段，并且将`account_name`设为了主键。

### 二、查询表数据 find
```
    // @abi action
    void get() { //方法名，通过cleos push action myaction 调用
      address_index addresses(_self, _self); // code是合约名, scope是签名方
      // 先添加一个记录，然后再查询表
      addresses.emplace(_self, [&](auto& address) {
        address.account_name = N(dandandandan); //注意是12个字符
        address.first_name = "Daniel";
        address.last_name = "Larimer";
        address.street = "1 EOS Way";
        address.city = "Blacksburg";
        address.state = "VA";
      });
      auto itr = addresses.find(N(dandandandan));
      print(itr->first_name, " ", itr->last_name); //打印名字
      eosio_assert(itr != addresses.end(), "Couldn't get him.");
    }
```
查询数据时，不需要支付RAM费用

### 三、修改数据 modify
```
    // @abi action
    void update() {
      address_index addresses(_self, _self); // code, scope
      // 先添加一个记录，然后再修改数据
      addresses.emplace(_self, [&](auto& address) {
        address.account_name = N(dandandandan);
        address.first_name = "Daniel";
        address.last_name = "Larimer";
        address.street = "1 EOS Way";
        address.city = "Blacksburg";
        address.state = "VA";
      });
      auto itr = addresses.find(N(dandandandan));
      eosio_assert(itr != addresses.end(), "Address for account not found");
      addresses.modify( itr, payer, [&]( auto& address ) { //payer是支付这笔修改费用的帐号，一般用_self
        address.city = "San Luis Obispo";
        address.state = "CA";
      });
    }
```
修改数据时，需要支付RAM费用

### 四、添加数据 emplace
```
    // @abi action
    void add() {
      address_index addresses(_self, _self); // code, scope
      // 添加一个记录
      addresses.emplace(_self, [&](auto& address) { //_self是支付这笔修改费用的帐号，即自己
        address.account_name = N(dandandandan);
        address.first_name = "Daniel";
        address.last_name = "Larimer";
        address.street = "1 EOS Way";
        address.city = "Blacksburg";
        address.state = "VA";
      });
    }
```
修改数据时，需要支付RAM费用

### 五、删除数据
```
    // @abi action
    void erase() {
      address_index addresses(_self, _self); // code, scope
      // 先添加一个记录，然后再删除数据
      addresses.emplace(_self, [&](auto& address) {
        address.account_name = N(dandandandan);
        address.first_name = "Daniel";
        address.last_name = "Larimer";
        address.street = "1 EOS Way";
        address.city = "Blacksburg";
        address.state = "VA";
      });
      auto itr = addresses.find(N(dan));
      eosio_assert(itr != addresses.end(), "Address for account not found");
      addresses.erase( itr ); //删除数据
      eosio_assert(itr != addresses.end(), "Address not erased properly");
    }
```
删除数据时，不需要支付RAM费用

### 六、编译
可以批量执行以下命令

```
# eosiocpp -g ABI文件名.abi CPP源码.cpp                                  //生产abi文件
# eosiocpp -o WAST文件名.wast CPP源码.cpp                                //生成wast和wasm文件
# cleos set contract 合约账户名 ~/eos/build/contracts/hello -p 合约账户名  //试部署hello合约
# cleos set contract 合约账户吗 合约所在目录 -p 合约账户名                   //部署正式合约
```
注意：因为EOSIO的bug，有时候更新合约会失败，需要重新部署其他合约后，才能更新合约，因此有了上面第三步：部署`hello`这个官方给的最简单的合约。

### 七、使用`cleos`查看数据表

```
cleos get table contract_name scope table_name
```
其中：

`contract_name` 是合约账户名

`scope` 是数据库中数据所有人的账户名

`table_name` 是表名，本教程中即数据结构声明中 `@abi table data i64`中的 `data`

### 八、实战一个完成的增删改查合约
以下智能合约完整的实现了数据库的增删改查操作。

#### 第一步：下载智能合约[database.cpp](https://github.com/eoshackathon/eos_dapp_development_cn/blob/master/contract/database.cpp)，到目录 `~/eos/contracts/db/`下

#### 第二步：编译该合约

```
eosiocpp -g database.abi database.cpp
eosiocpp -o database.wast database.cpp
```

#### 第三步：部署合约

```
cleos set contract 部署的合约帐号名 ~/eos/contracts/db -p 帐号名@active
```

#### 第四步：使用`cleos`运行合约
##### 1- 添加数据，如：

```
cleos push action 合约账号名 create '[3, "Eva Gu", "China"]' -p 使用者账号名 //添加id为3的数据
```

##### 2- 更新数据，如：

```
cleos push action 合约账号名 update '[2, "Jacky Gu", "China"]' -p 使用者账号名 //更新id为2的数据
```

##### 3- 查询数据，如：

```
cleos push action 合约账号名 get '[2]' -p 使用者账号名 //获取id为2的数据
```

##### 4- 删除数据，如：

```
cleos push action 合约账号名 erase '[2]' -p 使用者账号名 //获取id为2的数据
```

#### 第五步：查询合约数据

```
cleos get table  合约账号名 使用者账号名 mltidxdb //查询名为mltidxdb的表数据，该表名在合约中用 @abi table标明
```

### 九、在前端使用`eosjs`调用增删改查合约
#### 1- 添加数据

```
eos.transaction({
    actions: [{
        account: 'testtesttest',      //合约名，即发行帐号
        name: 'create',               //新建一条数据方法
        authorization: [{
            actor: 'testtesttest',    //使用者帐号
            permission: 'active'
        }],
        data: {
            id: new Int64(0x00000004),
            name: "Satoshi",
            address: "101 Moon"
        }
    }]
}).then(result => console.log(result))
```

#### 2- 更新数据

```
eos.transaction({
    actions: [{
        account: 'testtesttest',      //合约名，即发行帐号
        name: 'update',               //新建一条数据方法
        authorization: [{
            actor: 'testtesttest',    //使用者帐号
            permission: 'active'
        }],
        data: {
            id: new Int64(0x00000004),
            name: "Vitalik",
            address: "102 Moon"
        }
    }]
}).then(result => console.log(result))
```

#### 3- 查询数据

```
eos.transaction({
    actions: [{
        account: 'testtesttest',      //合约名，即发行帐号
        name: 'get',               //新建一条数据方法
        authorization: [{
            actor: 'testtesttest',    //使用者帐号
            permission: 'active'
        }],
        data: {
            id: new Int64(0x00000004)
        }
    }]
}).then(result => console.log(result))
```

#### 4- 删除数据
```
eos.transaction({
    actions: [{
        account: 'testtesttest',      //合约名，即发行帐号
        name: 'erase',               //新建一条数据方法
        authorization: [{
            actor: 'testtesttest',    //使用者帐号
            permission: 'active'
        }],
        data: {
            id: new Int64(0x00000004)
        }
    }]
}).then(result => console.log(result))
```

#### 5- 查看所有数据

```
eos.getTableRows(true, '合约帐号', '使用者帐号', '数据表', '索引字段', 0, -1, 10)
```
