// entry point
var winston = require('winston');
var clc = require("cli-color");

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

function init(){
    var mapping = {
    log: clc.blue,
    warn: clc.yellow,
    error: clc.red,
    info: clc.green
};
["log", "warn", "error","info"].forEach(function(method) {
    var oldMethod = console[method].bind(console);
    console[method] = function() {
        logger.apply(console,
            [mapping[method](method.toUpperCase())]
                .concat(arguments)
                );
        oldMethod.apply(
            console,
            [mapping[method](method.toUpperCase()+"  "+new Date().toISOString())]
                .concat(arguments)
        );
    };   
});
}
  
exports.init = init;
exports.logger = logger;


