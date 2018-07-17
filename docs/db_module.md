## EOS数据库操作

#### 作者：古千峰

数据库类为`eosio::multi-index`，[官方帮助文档](https://developers.eos.io/eosio-cpp/reference#multi-index)

### 一、定义数据表与程序框架
```
class addressbook : public eosio::contract
{
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
    void myaction() { //方法名，通过cleos push action myaction 调用
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
    void myaction() {
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
    void myaction() {
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
    void myaction() {
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
