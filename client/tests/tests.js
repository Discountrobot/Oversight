
QUnit.test("Oversight should be defined",
  function(assert) {
    assert.expect(1);

    assert.equal('object', (typeof Oversight));
});

QUnit.test("buildParams should yield correct urlencoded form data",
  function(assert) {
    assert.expect(2);

    var single   = {trace: "mhmm"};
    var multiple = {trace: "mhmm", b: "c"};
    var p1       = Oversight._buildParams(single);
    var p2       = Oversight._buildParams(multiple);

    assert.equal("trace=mhmm", p1);
    assert.equal("trace=mhmm&b=c", p2);
});

QUnit.test("isErroneous should only return true for 400 & 500 statusCodes",
  function(assert) {
    assert.expect(4);
    
    var fivehundred = 500;
    var fourhundred = 400;
    var tohundred   = 200;
    var string      = "bob";

    assert.equal(true, Oversight.isErroneous(fivehundred));
    assert.equal(true, Oversight.isErroneous(fourhundred));
    assert.equal(false, Oversight.isErroneous(tohundred));
    assert.equal(false, Oversight.isErroneous(string));

});

QUnit.test("Oversight should not try to inform without a url present",
  function(assert) {
    assert.expect(3);
    // ensure that the url isn't set.
    assert.equal(undefined, Oversight.url);
    // add a trace message
    Oversight.inform({trace: "hello"});
    // ensure that the trace is kept in the queue
    assert.equal(1, Oversight.queue.length);
    // set the url
    Oversight.setUrl('http://example.com/api');
    // ensure all traces have been sent
    assert.equal(0, Oversight.queue.length);
});


