# 升级EOS版本
### 古千峰

因为EOS版本在不断升级完善中，所以及时更新版本很重要。下面介绍升级方式。

第一步：查看最新版本
打开 [https://github.com/EOS-Mainnet/eos](https://github.com/EOS-Mainnet/eos) 点击`Branch`查看最新版本，比如写此教程时的版本为`mainnet-1.0.7`

第二步：下载最新版本
进入EOS安装目录，并下载
```
cd ~\eos
git pull orgin mainnet-1.0.7
```

第三步：编译安装
```
cd build
make install
```

第四步：重新启动EOS
```
ps -ef | grep nodeos
kill 9 前面命令查询到的进程ID
nodeos
```
