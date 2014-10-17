var assert     = require("assert");
var utils      = require('../utils');
var ErrorModel = require("../../app/models/error");
var routes     = require("../../app/routes/errors");
var request    = require('supertest');
var express    = require('express');

before(function (done){
  app = express();
  app.get('/errors', routes.get);
  done();
});

describe('GET /errors/', function(){
  describe('#ErrorModel.find()', function(){
    it("should yield 3 results", function(){

      var err1 = (new ErrorModel({trace:"t1"})).save();
      var err2 = (new ErrorModel({trace:"t2"})).save();
      var err3 = (new ErrorModel({trace:"t3"})).save();

      request(app)
        .get('/errors')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          assert(res.body.length === 3);
          if (err) throw err;
        });
    });
  });
});