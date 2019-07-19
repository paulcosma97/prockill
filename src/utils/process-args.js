const process = require('process');
const nopt = require('nopt');
const throwError = require('./throw-err');

const knownOptions = {
    'p': [Number, Array],
    'pid': [Number, Array],
    'n': [String, Array],
    's': [null],
    'h': [null]
};

const shortHands = {
    'port': ['-p'],
    'process-id': ['-pid'],
    'name': ['-n'],
    'silent': ['-s'],
    'help': ['-h'],
};

const args = nopt(knownOptions, shortHands, process.argv).argv.cooked;

const initialOptions = {
    ports: [],
    processIds: [],
    names: [],
    s: false,
    h: false
}

const mapOption = opt => {
    const option = opt.split('-')[1];
    let explicitOption = null;

    switch (option) {
        case 'p':
            explicitOption = 'ports'
            break;
        case 'pid':
            explicitOption = 'processIds'
            break;
        case 'n':
            explicitOption = 'names'
            break;
        case 's':
            explicitOption = 'silent'
            break;
        case 'h':
            explicitOption = 'help'
            break;
    }

    return {
        option,
        explicitOption,
        types: knownOptions[option]
    }
};

module.exports = (() => {
    const out = { ...initialOptions };

    let lastArg = null;
    for (const value of args) {
        if (value.startsWith('-')) {
            lastArg = mapOption(value);
            
            if (lastArg.types.includes(null)) {
                out[lastArg.explicitOption] = true;
            }

            continue;
        }

        if (lastArg.types.includes(Array)) {
            out[lastArg.explicitOption].push(value);
            continue;
        }

        out[lastArg.explicitOption] = value;
    }

    return out;
})();