### 以太坊技术栈简要说明

#### 以太坊
以太坊([ethereum.org](https://www.ethereum.org/))是一个点对点(peer to peer, p2p，BT技术)通信为基础的去中心化系统，每个节点即是服务器也是客户端，这个节点可以是一台PC机，也可以是一台服务器，只要它们运行遵守以太坊协议的程序即可。

#### Geth/Eth
[Geth](https://github.com/ethereum/go-ethereum)或[Eth](https://github.com/ethereum/cpp-ethereum)即上面所说的实现了以太坊协议的程序。Geth是用Golang编写的，Eth是C++编写，当然还有其他语言编写的程序，只要实现了以太坊协议，就可以与其他节点通信。可以访问如下网页查看[完整实现列表](http://ethdocs.org/en/latest/ethereum-clients/choosing-a-client.html)。

#### Mist
[Mist](https://github.com/ethereum/mist)是基于以太坊的浏览器，用户通过Mist访问以太坊应用程序(Dapp,分布式应用程序)，现在最主要的Dapp即下面的钱包应用。Mist是用[electron](http://electron.atom.io/)开发的，底层技术使用nodejs+webkit来构建，号称只要会写网页，就会写electron程序，还是跨平台的，可以支持Mac/Linux/Windows。

#### Meteor-dapp-wallet
以太坊官方的[钱包程序](https://github.com/ethereum/meteor-dapp-wallet)，可以管理帐户，查看资产，部署合约等， 对外表现就是一个普通的网页。

#### 各组件部署方式
1. Geth/Eth，分布式每个节点均要运行，每个节点产生的交易信息，如转帐、合约部署都要通过节点的挖矿行为向网络扩散，每个节点要设置一个监听端口(30303),用以同步p2p网络上的数据。还可以设置一个RPC监听端口(8545),用于接收来控制信息，这些控制信息可能来自网页。

2. Wallet Dapp，中心化部署，默认是部署在[官方服务器上](https://wallet.ethereum.org/)。这个网页要向本地节点请求信息，即[http://localhost:8545](http://localhost:8545),这个网址正好是Geth默认的RPC通信接口。这种方式也迎合了分布式系统的特点，因为每个节点上的信息都是一致的，访问任何一个节点都是可以的，访问本节点当然可以，并且更快，更安全。

3. Mist看起来就是一个浏览器，去访问各个Dapp的网页。

#### 数据流
看过各组件的部署方式后，我们可以看到整个系统的运作方式：
1. Geth/Eth各节点之间通过p2p方式同步信息
2. Mist去访问存放在中心服务器上的网页
3. 中心服务器上的网页去访问本地节点，从而达到控制或与网络进行交互的上的
