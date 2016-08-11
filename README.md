### 一步一步搭建以太坊私链环境

##### 以太坊技术栈简要描述
请参考[introduce.md](introduce.md)

####  智能合约编程指南
请参考[smart_contract.md](smart_contract.md)

##### 1. 系统需求(配置越高越好)
1. 至少1台电脑，运行Mac/Linux/Windows
2. 硬盘100G以上
3. 内存4G以上

本教程以Mac平台为例，其他平台请参考相关文档

##### 2. 工具准备 (请自行下载相关软件最新版)
* 必须的基本工具
  1. 以太坊命令行工具[geth](https://github.com/ethereum/go-ethereum)
  2. 以太坊浏览器[mist](https://github.com/ethereum/mist)


* 可选的其他工具
  1. [go语言编译工具](https://golang.org/)
  2. [node](https://nodejs.org)
  3. 用于‘发现结点’的'启动结点'工具 [bootnode](https://github.com/ethereum/go-ethereum)

##### 3. 开始搭建
1. 准备创世区块文件genesis.json， 并写入以下内容。
```json
{
  "alloc"      : {},
  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x20000",
  "extraData"  : "Private Blockchain for mana.com",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x123456789ABCDEF2",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}
```

2. 初始化私有链
```javascript
geth --datadir data init genesis.json
```
	 '--datadir data' 指定数据存放目录  
   'init genesis.json' 指定从genesis.json文件中读取创世区块内容

3. 启动节点
```javascript
geth --datadir `pwd`/data --identity 'eth-jiaxi' --networkid 9512  --port 9999 --rpcport 9998  console
```
--datadir \`pwd\`/data 指定数据目录，`pwd`是为了获得data目录的全路径     
--identity  指定本节点的标识名   
--networkid  私有网络需要指定大于2的正整数   
--bootnodes  p2p网络启动节点，通过启动节点可以发现其他节点  
--port   监听端口  
--rpcport  http-rpc 监听端口  
console  打开交互控制台  
如果一切正常，经过以上步骤，即可创建一个私有网络了。

4. 使用Mist链接到私有网络
```javascript
/Applications/Mist.app/Contents/MacOS/Mist --datadir `pwd`/data --ipcpath `pwd`/data/geth.ipc --node geth --network test --dev
```
选项说明：--datadir data 要与第4步的data目录相同，  
     --networkid  与第4步相同   
     --ipcpath  指定ipc通信路径  
     --node geth 指定geth作为Mist后端   
     --network test  使用测试网络  
     --dev 开发模式，多些调试信息
     /Applications/Mist.app/Contents/MacOS/Mist  苹果电脑上Mist应用安装路径

5. 加入其他节点(其他节点也须先安装基本工具geth和mist)
```javascript
geth --datadir `pwd`/data init genesis.json
geth --datadir `pwd`/data --identity 'eth-jiaxi' --networkid 9512  --port 9999 --rpcport 9998  console
```
命令说明：  
所有节点的genesis.json文件必须相同  
如果节点在同一台机器上, 需要更改监听端口选项，即port和rpcport

6. 如何发现其他节点
  - 方法一: 创建'启动节点'(可选)

  ```javascript
  bootnode --genkey boot.key
  bootnode --nodekey boot.key
  I0719 14:28:37.392617 p2p/discover/udp.go:217] Listening, enode://5962fd17d267cfb14f0f1cc15428cbb18a05a79792119cd9b39e33c678c1d17ada69975783fc40bf69c8d8b8a06a6f39a2097e2ae3ed6c3fb9f8ed650d581999@[::]:30301
  ```
  --genkey 生成节点boot.key文件,  
  --nodekey 使用boot.key启动节点，输入结果中从enode://开始到句尾的字符串为enode URL,后面会用到, [::]表示127.0.0.1

  - 方法二: 启动时指定--bootnodes选项，如

  ```javascript
  geth --datadir `pwd`/data --identity 'eth-jiaxi' --networkid 9512  --port 9999 --rpcport  9998  --bootnodes enode://xxxxx console
  ```
  这里的xxxxx可以是bootnode命令创建的节点，也可以是已知的私有节点

  - 方法三：在geth交互式控制台中使用admin.addPeer命令添加其他节点,如

  ```javascript
  admin.addPeer(enode://5962fd17d267cfb14f0f1cc15428cbb18a05a79792119cd9b39e33c678c1d17ada69975783fc40bf69c8d8b8a06a6f39a2097e2ae3ed6c3fb9f8ed650d581999@[::]:30301)
  ```   

  - 方法四: 添加静态节点(节点长期存在)

  ```javascript
  [
     "enode://7f4110cd71777d734556a2d8ea460fe6d977c68b8293b8c4b2d4d04477e565870ff4a7bf400a96ba417a7dd0a617e3f020b49f13e09641b7ab305f60e8578502@115.29.198.21:4445"
  ]
  ```

7. FAQ
  - windows上Mist和geth为什么无法配合？
    windows上ipc(进程间通信机制)与Linux上不同，在windows上geth.ipc不存放在datadir目录中，而是专门定义了一个特殊文件(\\.\pipe\geth.ipc), 所以在Windows上运行Mist.exe时要修改ipcpath参数，如下：  

    ```javascript
    Mist --datadir data --ipcpath \\.\pipe\geth.ipc --node geth --network test --dev
    ```
