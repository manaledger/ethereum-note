contract('Workface', function(accounts) {
  it("first location should Beijing", function() {
    var wf = Workface.deployed();

    return wf.meetings.call(0, {from:accounts[0]}).then(function(meeting) {
      assert.equal(meeting[1], "Beijing", "first location mismatch");
    });
  });

});
