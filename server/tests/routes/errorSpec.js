var assert     = require("assert");
var utils      = require('../utils');
var ErrorModel = require("../../app/models/error");
var routes     = require("../../app/routes/error");
var request    = require('supertest');
var express    = require('express');
var bodyParser = require('body-parser');


before(function (done){
  appp = express();
  appp.use(bodyParser.urlencoded({ extended: true }));
  appp.use(bodyParser.json());
  appp.post('/error', routes.post);
  done();
});

describe('POST /error/', function(){
  describe('#ErrorModel.save()', function(){
    it("should save properly", function(done){
      request(appp)
        .post('/error')
        .type('form')
        .send({trace: 'some trace'})
        .end(function(err, res){
          ErrorModel.findOne({trace:'some trace'}, function(err, data) {
            assert(data.trace === 'some trace');
            if (err) throw err;
            done();
          });
          if (err) throw err;
        });
    });
  });
});