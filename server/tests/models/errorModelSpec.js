var assert = require("assert");
var utils = require('../utils');
var ErrorModel = require("../../app/models/error");

describe('ErrorModel', function(){
  var error = new ErrorModel({
      trace: "hello",
      randomProperty: "hello"
  });

  describe('#properties', function(){
    it("a trace property should be definable", function(){
        assert(error.trace === "hello");
    });

    it("a random property should not be definable", function(){
        assert(error.randomProperty === undefined);
    });
  });

  describe('#save()', function(){
    it("should save properly", function(done){
        error.save(done);
    });
  });
});