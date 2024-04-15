const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.mongoDB, { db: 'mongodb://localhost/vidly' });

    process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        winston.error(ex.message, ex);
    });


    process.on('unhandledRejection', (ex) => {
        console.log('WE GOT AN UNHANDLED PROMISE REJECTION');
        winston.error(ex.message, ex);
    });
    
    
}