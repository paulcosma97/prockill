const process = require('process');
const nopt = require('nopt');
const throwError = require('./throw-err');

const knownOptions = {
    p: [Number, Array]
};

const shortHands = {
    port: ['-p']
};

const args = nopt(knownOptions, shortHands, process.argv).argv.cooked;

if (!args.find(opt => opt === '-p')) {
    throwError('You must specify at least one port');
}

module.exports = (() => {
    const out = {
        ports: []
    };

    for (let i = 1; i < args.length; i++) {
        const value = args[i];

        if (isNaN(+value)) {
            throwError('Port options must have number values');
        }

        out.ports.push(+value);
    }

    return out;
})();