const process = require('process');

module.exports = (...messages) => {
    console.error(...messages);
    process.exit(-1);
}