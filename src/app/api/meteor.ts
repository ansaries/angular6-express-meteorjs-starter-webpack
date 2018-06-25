// const createClass = require('asteroid').createClass;
// const Asteroid = createClass();

// export const mServer = new Asteroid({
//     endpoint: 'wss://foctest.meteorapp.com/websocket',
// });

const DDPClient = require('ddp');
// var DDPClient = require("ddp");


export const MeteorServer = new DDPClient({
    // All properties optional, defaults shown
    // host : "localhost",
    // port : 3000,
    // ssl  : false,
    autoReconnect : true,
    autoReconnectTimer : 500,
    maintainCollections : true,
    ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
    // uses the SockJs protocol to create the connection
    // this still uses websockets, but allows to get the benefits
    // from projects like meteorhacks:cluster
    // (for load balancing and service discovery)
    // do not use `path` option when you are using useSockJs
    // useSockJs: true,
    // Use a full url instead of a set of `host`, `port` and `ssl`
    // do not set `useSockJs` option if `url` is used
    url: 'wss://foctest.meteorapp.com/websocket'
  });



// module.exports = MeteorServer;
