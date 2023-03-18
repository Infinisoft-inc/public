// index.js

const MyServer = require("./myServer");

const server = new MyServer({
  io: {
    /* custom Socket.io options */
  },
});

// Start the server
server.start(3000);

// Later, you can stop the server if needed
// server.stop();
