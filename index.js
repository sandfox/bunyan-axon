var axon = require('axon');
var url = require('url');

module.exports = createStream;

/**
 * 
 * opts
 * - host
 * - port
 * - bind/connect for axon (sometimes you)
 * - axonSocket
 */
function createStream(opts) {

    opts = opts || {
      address: {
        port: 6000, //Totally arbitary
        host: '0.0.0.0',
      },
      bind: false
    };

    return Object.create(opts, {
    write:{
      value:write,
      enumerable:true,
      configurable:true,
      writable:true
    },
    sock:{
      value:opts.axonSocket || createSocket(opts.address, opts.bind),
      enumerable:false,
      configurable:false,
      writable:false
    }
  });
}

function createSocket(address, isBinding){

  var port;
  var address
  var sock = axon.socket('pub');
  sock.format('json');

  if (typeof address == 'string') {
    address = url.parse(address);
    host = address.hostname;
    port = parseInt(address.port, 10);
  } else {
    host = address.host;
    port = address.port;
  }

  if (isBinding === true) {
    console.log("binding");
    sock.bind(port, host)
  } else {
    sock.connect(port, host)
  }

  return sock;
}

function write(message){
  this.sock.send(message);
}
