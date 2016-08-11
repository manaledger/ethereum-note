contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}

contract Workface is owned {

    Meeting[] public meetings;

    event AddMeeting (uint id, string location, string persons, string title);

   struct Meeting {
        uint256  date;          //时间
        string   location;      //地点
        string   persons;       //与会人员
        string   title;         //主题
    }

    function Workface (){
      addMeeting('Beijing', 'xxl', 'Block chain app develop!');
    }

    function getId () constant returns (uint) {
      return meetings.length;
    }

    function addMeeting (string location, string persons, string title) onlyOwner {
       uint mid = meetings.length++;
       meetings[mid] = Meeting({date:now, location:location, persons:persons, title:title});
       AddMeeting(mid, location, persons, title);
    }

    function () {
      throw;
    }
}
