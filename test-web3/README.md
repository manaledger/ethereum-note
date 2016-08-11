#### web3.js 使用实例
web3.js 是专门访问以太坊网络节点的js库，其屏蔽了底层通信的细节，开发者直接使用上层API即可完成相关工作。

1. 安装必须工具
使用bower管理前端js库， 'bower install' 指令安装bower.json中定义的js依赖库
```javascript
$ npm install -g bower
$ bower install
```

2. 打开chrome浏览器访问，如http://127.0.0.1:3000/index.html

3. 调试方式：chrome开发者工具

4. web3.js 需要访问本地的Geth RPC端点，默认为8545，启动时请注意添加 --rpc 和 --rpccorsdomain, 如下：
```javascript
geth --datadir data --networkid 9512 --rpc --rpccorsdomain "http://127.0.0.1:3000" console
```
其中的rpccorsdomain应该与第2步的主机部分相同.
