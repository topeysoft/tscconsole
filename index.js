// entry point
var clc = require("cli-color");
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
        oldMethod.apply(
            console,
            [mapping[method](method.toUpperCase()+"  "+new Date().toISOString())]
                .concat(arguments)
        );
    };   
});
}
 
exports.init = init;


