# Bunyan-Axon

Axon transport for raw bunyan streams

Still WIP but works on my machine certified. Open to pull requests and suggestions

Uses axon pub/sub sockets as transport for bunyan log messages.
Axon is currently hardcoded to use "json" as it's codec.

For examples of use with a recieving server see `test/tast-basic.js`.



### Todo

1.   More/better tests
2.   Configurable codecs
3.   benchmarks
4.   Some jazzy examples

There are some warts with this approach such as a race condition between first log events coming through and server binding
because we're using pub/sub sockets and events are not queued. maybe we should emit an event or somesuch when connected, or switch to push/pull sockets but somehow make sure every connected 'thing' gets each message.

Deep down there is also something fundamentally wrong with doing sending logging data across a network from inside an application, it's much more sane for this to be used by something thats wraps the application. (But don't let that stop you from doing what you want)

## Install

```
npm install bunyan-axon
```

## Use

```js
var bunyan = require('bunyan');
var baxon = require('../');

var log = bunyan.createLogger({
  name: "testStream",
  streams:[
    {level:"info", type:"raw", stream: baxon({address:"tcp://127.0.0.1:9010"})}
  ]
})
```

## API

```js
var writeableStreamForBunyan = baxon(opts);
```

### opts.address
Either a string in format accepted by axon e.g `tcp://127.0.0.1:8124` or an object in the following format
```js
{
  port: 8124,
  host: '127.0.0.1'
}
```

### opts.bind
default `false`, if set to `true` this module will bind rather than connect to the supplied address

## License

MIT
