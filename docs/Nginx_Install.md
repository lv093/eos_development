### 1.mac系统安装Nginx

    brew安装Nginx
    $ brew install nginx
    
    查看Nginx版本
    $ nginx -v
    
    启动Nginx
    $ nginx     后台启动Nginx
    (使用brew services start nginx，Nginx配置修改后不会生效)
    $ ps -ef|grep nginx
    
    查看Nginx是否启动成功
    浏览器访问http://localhost:8080
    
    关闭Nginx
    $ nginx -s stop
    （brew services stop nginx，配置文件修改后不会生效）
    
    重新加载nginx
    $ nginx -s reload
    
注：端口号是在配置文件 nginx.conf 里面配置的，默认端口是 8080 ，配置文件的位置 /usr/local/etc/nginx

    
### 2.CentOS 安装

下载

    wget -c https://nginx.org/download/nginx-1.11.6.tar.gz
    

