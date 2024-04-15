const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging.js')();
require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});





