var scribe= require('scribe-js')();
var console = process.console;

function init(app){
    if(!app) return;
    app.use(scribe.express.logger());
    app.use('/logs', scribe.webPanel());
};

exports.init = init;