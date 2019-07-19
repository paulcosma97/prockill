const throwError = require('./throw-err');
const process = require('process');
const cp = require('child_process');

class OSController {
    async killByPID(pid) {
        throwError(`Not yet implemented for ${process.platform} platform!`);
    }

    async killByName(name) {
        throwError(`Not yet implemented for ${process.platform} platform!`);
    }

    async killByPort(name) {
        throwError(`Not yet implemented for ${process.platform} platform!`);
    }

    async execute(command) {
        return new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
            if (err) {
                return reject(err);
            }
            resolve(stdout);
        }));
    }
}

module.exports = OSController;