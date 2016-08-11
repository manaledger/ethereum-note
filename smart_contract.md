### 智能合约编程指南

#### 简要介绍
智能合约(合同)是指将合同交易内容以代码编程方式约定下来，当条件满足时，合同(代码)会自动执行。借助于区块链去中心化，去信任机制，减少中间环节，节约交易成本，提升效率。

#### 举例说明
让我们举一个简单的例子，以超级碗比赛为例。假如你赌Patriots队赢，下注500美元，或者一个比特币，你的朋友赌Packers队赢，下同样的注。第一步，你和你的朋友将你们的比特币发送到一个由智能合约控制的中立账户。当比赛结束时，智能合约能够通过ESPN，路透社或者其它媒体确认Patriots战胜了Packers，智能合约将自动地将你的赌金和从朋友那赢得的钱，发送到你的账户。

因为智能合约是计算机程序，所以很容易增加更加复杂的赌博元素，例如赔率和分差。尽管现在有处理这种交易的服务，但是他们都收取费用。智能合约与这些服务的关键不同之处在于，智能合约是一个任何人都可以使用的去中心化的系统，不需要任何中介机构。

一个更加常见的例子是网上购物。“如果你从网上买了某物，你可能不想立即付款，想等到卖家发货后再付款。所以你可以很容易地创建一个合约，该合约查询联邦快递的物流数据，智能合约只有确认你购买的商品已经发往你的地址时，才发送货款给卖家。”。

#### 以太坊智能合同实现机制
以太坊专门开发了一个虚拟机(EVM)来运行智能合约，EVM支持一种类似javascript的编程语言([solidity](https://solidity.readthedocs.io/))。这使得以太坊智能合约开发非常灵活，可支持众多类型应用开发，如代币，金融，投票，众筹，保险，认证等。。。

#### Dapp
Dapp是指运行于以太坊的分布式应用程序，构建于智能合约之上，可以理解为Dapp=智能合约+网页

#### 开发指南
##### 工具
* [testrpc](https://github.com/ethereumjs/testrpc) 以太坊节点模拟工具，零配置
* [truffle](https://github.com/ConsenSys/truffle) 以太坊Dapp开发套件
* [atom](https://atom.io/) 代码编辑器，安装以太坊相关插件后，支持语法高亮，错误检查等，不喜者可考虑其他编辑器。


##### 工具安装

  ```javascript
  npm install -g truffle ethereumjs-testrpc
  ```

##### 工具使用
1. 启动testrpc

  ```javascript
  testrpc
  ```

2. 新建Dapp

  ```javascript
  mkdir workface
  cd workface
  truffle init
  ```

  truffle init命令会创建一个示例工程，可在此基础上进行后续开发，建议多研究一下该示例，熟悉基本命令的用法，尝试修改代进行验证等, 后面的命令均须在工程目录中运行。

3. 编译

  ```javascript
  truffle  compile
  ```
  编译工程目录中contracts中所有合约文件(.sol)，并在build/contracts目录中生成对应的.sol.js文件

4. 部署

  ```javascript
  truffle migrate
  ```  
  这里编译后的合约会被部署到testrpc上, migrations目录中以数字编号开头的文件，指定后部署的顺序

5. 打包，运行

  ```javascript
  truffle build
  truffle serve
  ```  
  truffle build会将所有文件打包到build目录中  
  truffle serve启动web服务，监听本地8080端口，如果合约或其他文件被修改，server会自动编译，打包， 重运行

6. 智能合约示例, 请查看workface目录

  ```javascript
  /* 定义名为owned的合约， 关键字contract类似面向对象中的 class */
  contract owned {

      /* 定义属性owner(所有者)，定义方式： 类型  访问权限  属性名 */
      /* public权限即对外公开，表示外部可以直接访问 */
      address public owner;

      /* 与合约同名的函数，类似面向对象中的构造函数，仅在合约部署时执行一次 */
      function owned() {

          /* 变量赋值， msg是全局变量，msg.sender(函数调用者)，这里指合约的创建者 */
          /* 设置所有者为合约的创建者 */
          owner = msg.sender;
      }

      /* modifier 定义函数限制(函数修饰) onlyOwner 主要作用是检查函数执行环境是否满足条件 */
      modifier onlyOwner {
          /* 调用修饰的函数时，msg.sender(函数调用者)必须是所有者，否则无法往执行 */
          if (msg.sender != owner) throw;
          /* '_'是代码占位符，会被修饰的函数代码替换 */
          _
      }

      /* 转移合约所有者，注意使用了函数修饰，必须是合约所有者才能执行 */
      function transferOwnership(address newOwner) onlyOwner {
          owner = newOwner;
      }
  }

  /* 定义新的合约，该合约继承自owned合约，意味着Workface可以使用Onwer合约定义的属性、函数、函数修饰 */
  contract Workface is owned {

      /* 定义meetings动态数组，数组中每个元素都是Meeting结构 */
      Meeting[] public meetings;

      /* 定义AddMeeting事件原型， 事件可以被监听，并在事件发生时执行特定的代码 */
      event AddMeeting (uint id, string location, string persons, string title);

      /* 结构体定义， 定义'会议'结构体 */
     struct Meeting {
          uint256  date;       //会议时间          
          string   location;   //会议地点   
          string   persons;    //与会人员    
          string   title;      //会议主题  
      }

      /* 构造函数  */
      function Workface (){
        addMeeting('Beijing', 'xxl', 'Block chain app develop!');
      }

      /* 返回meetings数组长度， returns (uint) 表示返回uint类型 */
      function getId () constant returns (uint) {
        return meetings.length;
      }

      /* 添加会议记录，传入参数为：地点、人物、主题，注意onlyOwner修饰  */
      function addMeeting (string location, string persons, string title) onlyOwner {
         uint mid = meetings.length++;
         /* 将数组下标为mid的元素设置为结构体，注意结构体的生成方法 */
         meetings[mid] = Meeting({date:now, location:location, persons:persons, title:title});
         /* 触发AddMeeting事件，附带事件相关信息，这里必须符合事件定义原型 */
         AddMeeting(mid, location, persons, title);
      }

      /* 无名函数，合约中只允许一个，当调用方法不匹配其他所有函数时，该函数被调用，一般表示出错了，但也有特殊用法 */
      function () {
        throw;
      }
  }
  ```  
