var socketOptions = {
    keepAlive: 1,
    connectTimeoutMS: 30000
};

module.exports = {
  db: {
        mongodb: "mongodb://localhost:27017/oversight",
        test: "mongodb://localhost:27017/test",
        options: {
            server: socketOptions,
            replset: socketOptions
        },
    },
    server: {
        static: "./www",
        port: 80
    }
};