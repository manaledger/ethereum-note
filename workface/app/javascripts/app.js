var accounts;
var account;
var balance;

function getId() {
  var wf = Workface.deployed();

  wf.getId.call({from:account}).then(function (id) {
    console.log("now id is: " + id);
  });
}

function setStatus(message) {
  console.log(message);
};

function getMeetings(idx) {
  var wf = Workface.deployed();

  wf.meetings.call(idx, {from: account}).then(function(value) {
    console.log(value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting meetings for index "+ idx +"; see log.");
  });
};

function addMeeting() {
  var wf = Workface.deployed();

  setStatus("prepare add meeting... (please wait)");

  wf.addMeeting('Shanghai','Toni, Pan', 'Talk about block chain.', {from:account}).then(function(value) {
    setStatus("Transaction complete! and new meeting id: "+ value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error add meeting; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    getMeetings(0);

    addMeeting();
    addMeeting();
    // addMeeting();
  });

  var wf = Workface.deployed();
  var ev = wf.AddMeeting();
  ev.watch(function (err, result) {
    if (!err) {
      console.log(result);
      getMeetings(result.args.id);
      getId();
      // var obj = result.args;
      // console.log("id: "+obj.id+", location: "+obj.location+", persons"+obj.persons+", title"+obj.title);
    }
  })
}
