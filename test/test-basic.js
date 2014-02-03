/**
 * replace me with a better set of tests
 * or at least something that isn't so horribly uggly
 */

var bunyan = require('bunyan');
var baxon = require('../');
var axon = require('axon');

var server = axon.socket('sub');
server.format('json');
server.bind("tcp://127.0.0.1:9010")

var log = bunyan.createLogger({
    name: "testStream",
    streams:[
      {level:"info", type:"raw", stream: baxon({address:"tcp://127.0.0.1:9010"})}
    ]
  });

describe("Bunyan Axon", function(done){

  it("should send log messages", function(done){

      server.on('message', function(logMessage){
        logMessage.should.have.property('name', 'testStream');
        logMessage.should.have.property('data', {foo:"bar"});
        logMessage.should.have.property('msg', 'YOLO');
        logMessage.should.have.property('level', 30);
        logMessage.should.have.property('time');
        logMessage.should.have.property('v');
        logMessage.should.have.property('pid');
        logMessage.should.have.property('hostname');
        done();
      })

      log.info({data: {foo:"bar"}},"YOLO")



  })


})
