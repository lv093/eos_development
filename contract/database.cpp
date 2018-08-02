/**
 * 古千峰@BTCMedia
 */

#include <string>
#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

class mltidxdemo : public eosio::contract {

    using contract::contract;

    private:
    // @abi table mltidxdb i64
    struct db_table {
        uint64_t id;          //id
        string name;          //名字
        string address;       //地址
        time date_created;    //创建时间

        uint64_t primary_key() const { return id; }
        EOSLIB_SERIALIZE(db_table, (id)(name)(address)(date_created))
    };

    typedef eosio::multi_index<N(mltidxdb), db_table> db_multi_index; //定义数据类型为 db_multi_index
    db_multi_index my_database; //实例化对象 my_database

    public:
    mltidxdemo(account_name self) : contract(self),
                                    my_database(_self, _self) {}

    // @abi action
    void create(const uint64_t unique_id, std::string name = "", std::string address = "") {
        //新增一个数据
        auto my_database_itr = my_database.find(unique_id);
        eosio_assert(my_database_itr == my_database.end(), " ID already exists, use 'set' to update info "); //判断数据id是否存在

        print(" ID doesn't exist ");
        print(" Creating new Row for ID ");

        my_database.emplace(_self, [&](auto& my_row) {
            my_row.id = unique_id;
            my_row.name = name;
            my_row.address = address;
            my_row.date_created = now();
        });

        print(" Database set ");
        return;
    }

    // @abi action
    void get(const uint64_t unique_id) {
        //获取数据
        auto my_database_itr = my_database.find(unique_id);
        if (my_database_itr == my_database.end()) {
            print(" ID doesn't exist ");
        }

        if (my_database_itr->id == unique_id) {
            print(" Here is your info ");
            print(" ID: ", my_database_itr->id);
            print(" Name: ", my_database_itr->name.c_str());
            print(" Address: ", my_database_itr->address.c_str());
            print(" Date Created: ", my_database_itr->date_created);
        }
    }

    // @abi action
    void update(const uint64_t unique_id, std::string name = "", std::string address = "") {
        //更新数据
        auto my_database_itr = my_database.find(unique_id);

        eosio_assert(my_database_itr != my_database.end(), "That ID doesn't exist");

        my_database.modify(my_database_itr, _self, [&](auto& db_to_update) { //_self 说明是自己付RAM
            db_to_update.name = name;
            db_to_update.address = address;
        });

        print(" ID: ", unique_id, " updated ");
    }

    // @abi action
    void erase(const uint64_t unique_id) {
        //删除数据
        auto my_database_itr = my_database.find(unique_id);
        if (my_database_itr == my_database.end()) {
            print(" ID doesn't exist ");
        }

        if (my_database_itr->id == unique_id) {
            print(" Deleting your info ");
            my_database.erase(my_database_itr);
        }
    }
};

EOSIO_ABI(mltidxdemo, (create)(get)(update)(erase))
