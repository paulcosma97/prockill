#!/usr/bin/env node
const info = require('../package.json');
const args = require('./utils/process-args');

if (args.help) {
    console.log(`ProcKill Manual v${info.version}\n${info.description}\n`);
    console.log('Usage: [npx] prockill [-options] [args...]\n');
    console.log('\t -p | --port <list-of-ports>\n\t\tkills processes by port');
    console.log('\t -n | --name <list-of-names>\n\t\tkills processes by name');
    console.log('\t -pid | --process-id <list-of-names>\n\t\tkills processes by PID');
    console.log('\t -s | --silent\n\t\tshows no output');
    console.log('\t -h | --help\n\t\tshows this menu');
}

if (args.silent) {
    console.log = () => null;
    console.error = () => null;
}

if (process.platform === 'win32') {
    require('./win32')(args);
} else {
    require('./unix-like')(args);
}
