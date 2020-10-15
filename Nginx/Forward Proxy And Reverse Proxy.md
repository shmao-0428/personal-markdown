# 正向代理和反向代理

## 正向代理(forward proxy)

### 什么是正向代理

- 定义

是一个位于客户端和目标服务器之间的服务器(代理服务器), 为了从目标服务器取得内容, 客户端向代理服务器发送一个请求并指定目标, 然后代理服务器向目标服务器转交请求并将获得的内容返回给客户端.

这种代理其实在生活中很常见, 比如科学上网技术, 其中用到到的就是代理技术.

- 过程

有时候, 用户想要直接访问某国外网站, 该网站无法在国内直接访问, 但是我们可以访问到一个代理服务器, 这个代理服务器可以访问到这个国外网站,这样呢, 用户对该国外网站的就需要通过代理服务器来转发请求, 并且该代理服务器也会将请求的响应再返回给用户. 这个上网的过程用到的就是正向代理.

**用户在浏览器中输入: www.google.com -> 客户端配置代理服务器 www.abc.com ->指向目标服务器www.google.com**

假设有一个PC, 一个代理服务器, 一个WEB服务器

```
PC -> 代理服务器 -> WEB服务器
```

PC无法直接访问WEB服务器, 但代理服务器可以访问.

代理服务器帮助PC请求页面并缓存到本地, 并将页面返回给PC.

（PC只需要浏览器设置代理服务器IP和端口号即可, PC知道代理服务器和WEB服务器的存在）;

- 举例

这个过程其实和租房子很像。

租房子的时候，一般情况下，我们很难联系到房东，因为有些房东为了图方便，只把自己的房屋信息和钥匙交给中介了。而房客想要租房子，只能通过中介才能联系到房东。而对于房东来说，他可能根本不知道真正要租他的房子的人是谁，他只知道是中介在联系他。

这里面一共有三个角色，租客（用户）、中介（代理服务器）和房东（国外网站，目标服务器）。引入中介（代理服务器）的原因是用户无法联系上房东（用户无法访问国外网站）。

所以，正向代理，其实是"代理服务器"代理了"客户端"，去和"目标服务器"进行交互。

通过正向代理服务器访问目标服务器，目标服务器是不知道真正的客户端是谁的，甚至不知道访问自己的是一个代理（有时候中介也直接冒充租客）。

- 正向代理的用途

> 突破访问限制

通过代理服务器，可以突破自身IP访问限制，访问国外网站，教育网等。

即，租客可以通过中介，来解决无法联系上房东的问题。

> 提高访问速度

通常代理服务器都设置一个较大的硬盘缓冲区，会将部分请求的响应保存到缓冲区中，当其他用户再访问相同的信息时， 则直接由缓冲区中取出信息，传给用户，以提高访问速度。

即，中介手里留存了很多房源信息和钥匙，可以直接带租客去看房。

> 隐藏客户端真实IP

上网者也可以通过这种方法隐藏自己的IP，免受攻击。

即，房东并不知道租客的真实身份。PS：但是中介知道了，可能骚扰更多….

### 实战

1. 在浏览器输入 www.google.com , 浏览器跳转到www.google.com 。
2. 具体配置

```nginx
server{
    resolver 8.8.8.8;
    listen 80;

    location / {
        proxy_pass http://$http_host$request_uri;
    }
}
```

3. 在需要访问外网的客户端上执行以下一种操作即可

```nginx
1. 方法1（推荐）
export http_proxy=http://你的正向代理服务器地址：代理端口   

2. 方法2
vim ~/.bashrc
export http_proxy=http://你的正向代理服务器地址：代理端口   
```



## 反向代理(reverse proxy)

### 什么是反向代理

- 定义

是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。

客户端对代理服务器是无感知的，客户端不需要做任何配置，用户只请求反向代理服务器，反向代理服务器选择目标服务器，获取数据后再返回给客户端。**反向代理服务器和目标服务器对外而言就是一个服务器，只是暴露的是代理服务器地址，而隐藏了真实服务器的IP地址。**

- 过程

我们在租房子的过程中，除了有些房源需要通过中介以外，还有一些是可以直接通过房东来租的。用户直接找到房东租房的这种情况就是我们不使用代理直接访问国内的网站的情况。

还有一种情况，就是我们以为我们接触的是房东，其实有时候也有可能并非房主本人，有可能是他的亲戚、朋友，甚至是二房东。但是我们并不知道和我们沟通的并不是真正的房东。这种帮助真正的房主租房的二房东其实就是反向代理服务器。这个过程就是反向代理。

对于常用的场景，就是我们在Web开发中用到的负载均衡服务器（二房东），客户端（租客）发送请求到负载均衡服务器（二房东）上，负载均衡服务器（二房东）再把请求转发给一台真正的服务器（房东）来执行，再把执行结果返回给客户端（租客）。

**用户在浏览器中输入 www.abc.com:9000 -> 反向代理服务器www.abc.com:9000 -> 分发到目标服务器 -> 192.168.4.31:8080 | 192.168.4.32:8080 | 192.168.4.33:8080**

假设有一个PC, 一个代理服务器, 一个WEB服务器

```
PC -> 代理服务器 -> WEB服务器
```

PC访问WEB服务器, 并不知道访问的是代理服务器, PC以为代理服务器就是WEB服务器.

代理服务器将WEB服务器页面缓存到本地, 将PC访问时直接反馈给PC.

（PC只不需要任何蛇者,PC访问代理服务器等于访问WEB服务器,PC并不知道真实WEB服务器的存在）;

**所以，反向代理，其实是"代理服务器"代理了"目标服务器"，去和"客户端"进行交互。**

通过反向代理服务器访问目标服务器时，客户端是不知道真正的目标服务器是谁的，甚至不知道自己访问的是一个代理。

- 反向代理的用途

> 隐藏服务器真实IP

使用反向代理，可以对客户端隐藏服务器的IP地址。

即，租客并不房东知道的真实身份。

> 负载均衡

反向代理服务器可以做[负载均衡](http://mp.weixin.qq.com/s?__biz=Mzg3MjA4MTExMw==&mid=2247484661&idx=2&sn=03f3a7ec83599a31a1d638869b785597&chksm=cef5f743f9827e553b3923708ab4a00e990d0750759e81f3adf7261647a9191f6a5a0b878d12&scene=21#wechat_redirect)，根据所有真实服务器的负载情况，将客户端请求分发到不同的真实服务器上。

即，二房东发现房主本人很忙，于是找到房主的妻子帮忙处理租房事宜。

> 提高访问速度

反向代理服务器可以对于静态内容及短时间内有大量访问请求的动态内容提供缓存服务，提高访问速度。

即，二房东同样有房屋信息和钥匙。

> 提供安全保障

反向代理服务器可以作为应用层防火墙，为网站提供对基于Web的攻击行为（例如DoS/DDoS）的防护，更容易排查恶意软件等。还可以为后端服务器统一提供加密和SSL加速（如SSL终端代理），提供HTTP访问认证等。

即，二房东可以有效的保护房东的安全。

### 实战一

1. 在浏览器输入 www.abc.com , 从 nginx 服务器跳转到 linux 系统 tomcat 主页面。

2. 具体配置：

```nginx
server {
        listen       80;   
        server_name  192.168.4.32;   #监听地址
   
        location  / {       
           root html;  #/html目录
           proxy_pass http://127.0.0.1:8080;  #请求转向
           index  index.html index.htm;      #设置默认页       
        } 
    }
```

### 实战二

1. 根据在浏览器输入的路径不同，跳转到不同端口的服务中。
2. 配置

```nginx
 server {
        listen       9000;   
        server_name  192.168.4.32;   #监听地址       
        
        location  ~ /example1/ {  
           proxy_pass http://127.0.0.1:5000;         
        } 

        location  ~ /example2/ {  
           proxy_pass http://127.0.0.1:8080;         
        } 
    }
```

**location** 指令说明：

- **~ :** 表示uri包含正则表达式，且区分大小写。
- **~\* :** 表示uri包含正则表达式，且不区分大小写。
- **= :** 表示uri不含正则表达式，要求严格匹配。

### 实战三

**跨域**

跨域是前端工程师都会面临的场景，跨域的解决方案有很多。不过要知道在生产中，要么使用 CORS 、要么使用 Nginx 反向代理来解决跨域。在 Nginx 的配置文件中进行如下配置即可：

```nginx
server {    
    listen   80;    
    server_name   localhost; # 用户访问 localhost，反向代理到 http://webcanteen.com    
    location / {        
        proxy_pass http://webcanteen.com
    }
}
```

## 正向代理和反向代理的区别

虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。我们也可以理解为**正向代理就是冒充客户端，反向代理就是冒充服务端。**

1、**正向代理其实是客户端的代理**，帮助客户端访问其无法访问的服务器资源。**反向代理则是服务器的代理**，帮助服务器做负载均衡，安全防护等。

2、**正向代理一般是客户端架设的**，比如在自己的机器上安装一个代理软件。而**反向代理一般是服务器架设的**，比如在自己的机器集群中部署一个反向代理服务器。

3、**正向代理中，服务器不知道真正的客户端到底是谁**，以为访问自己的就是真实的客户端。而在**反向代理中，客户端不知道真正的服务器是谁**，以为自己访问的就是真实的服务器。

4、正向代理和反向代理的作用和目的不同。**正向代理主要是用来解决访问限制问题。而反向代理则是提供负载均衡、安全防护等作用。二者均能提高访问速度。**



## Nginx配置文件

### 1.1 文件结构

  Nginx 配置文件由三部分组成。

```nginx
...              #全局块

events {         #events块
   ...
}

http      #http块
{
    ...   #http全局块
    server        #server块
    { 
        ...       #server全局块
        location [PATTERN]   #location块
        {
            ...
        }
        location [PATTERN] 
        {
            ...
        }
    }
    server
    {
      ...
    }
    ...     #http全局块
}
```

- **第一部分 全局块**
    主要设置一些影响 nginx 服务器整体运行的配置指令。
    比如： worker_processes 1; ， worker_processes 值越大，可以支持的并发处理量就越多。
- **第二部分 events块**
    events 块涉及的指令主要影响Nginx服务器与用户的网络连接。
    比如： worker_connections 1024; ，支持的最大连接数。
- **第三部分 http块**
    http 块又包括 http 全局块和 server 块，是服务器配置中最频繁的部分，包括配置代理、缓存、日志定义等绝大多数功能。
  - **server块**：配置虚拟主机的相关参数。
  - **location块**：配置请求路由，以及各种页面的处理情况。

### 1.2 配置文件

```nginx
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}   
```

### 1.3 配置实例

#### 反向代理

- **实战一**

**实现效果：**
  在浏览器输入 *www.abc.com* , 从 nginx 服务器跳转到 linux 系统 tomcat 主页面。
 **具体配置：**

```nginx
    server {
        listen       80;   
        server_name  192.168.4.32;   #监听地址
   
        location  / {       
           root html;  #/html目录
           proxy_pass http://127.0.0.1:8080;  #请求转向
           index  index.html index.htm;      #设置默认页       
        } 
    }
```

- **实战二**

**实现效果：**
  根据在浏览器输入的路径不同，跳转到不同端口的服务中。
 **具体配置：**

```nginx
    server {
        listen       9000;   
        server_name  192.168.4.32;   #监听地址       
        
        location  ~ /example1/ {  
           proxy_pass http://127.0.0.1:5000;         
        } 

        location  ~ /example2/ {  
           proxy_pass http://127.0.0.1:8080;         
        } 
    }
```

**location** 指令说明：

- **~ :** 表示uri包含正则表达式，且区分大小写。
- **~\* :** 表示uri包含正则表达式，且不区分大小写。
- **= :** 表示uri不含正则表达式，要求严格匹配。

### 1.4 负载均衡

####  实战一

**实现效果：**
  在浏览器地址栏输入 *http://192.168.4.32/example/a.html* ，平均到 5000 和 8080 端口中，实现负载均衡效果。
 **具体配置：**

```nginx
    upstream myserver {   
      server 192.167.4.32:5000;
      server 192.168.4.32:8080;
    }
    

    server {
        listen       80;   #监听端口
        server_name  192.168.4.32;   #监听地址
   
        location  / {       
           root html;  #html目录
           index index.html index.htm;  #设置默认页
           proxy_pass  http://myserver;  #请求转向 myserver 定义的服务器列表      
        } 
    }
```

**nginx 分配服务器策略**

- **轮询**（默认）
    按请求的时间顺序依次逐一分配，如果服务器down掉，能自动剔除。

- **权重**
    weight 越高，被分配的客户端越多，默认为 1。比如：

  ```nginx
        upstream myserver {   
          server 192.167.4.32:5000 weight=10;
          server 192.168.4.32:8080 weight=5;
        }
  ```

- **ip**
    按请求 ip 的 hash 值分配，每个访客固定访问一个后端服务器。比如：

  ```nginx
        upstream myserver { 
          ip_hash;  
          server 192.167.4.32:5000;
          server 192.168.4.32:8080;
        }
  ```

- **fair**
    按后端服务器的响应时间来分配，响应时间短的优先分配到请求。比如：

  ```nginx
        upstream myserver { 
          fair;  
          server 192.167.4.32:5000;
          server 192.168.4.32:8080;
        }
  ```

# 参考资料

1. [终于有人把正向代理和反向代理解释的明明白白了](https://www.toutiao.com/a6663747899710505483/)
2. [Nginx高级篇: 从原理到实战, 彻底搞懂Nginx](https://juejin.im/post/6844904046789132301#heading-14)
3. [从原理到实战，彻底搞懂Nginx](https://juejin.im/post/6844904041542221832)
4. [图解代理，3分钟学会使用Nginx实现反向代理（附实用配置文件](https://www.toutiao.com/a6649250784657539591/)
5. [前端工程师不可不知的Nginx知识](https://juejin.im/post/6864085814571335694)
6. [官网](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#example)

