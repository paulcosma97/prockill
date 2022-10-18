const cp = require('child_process');

module.exports.handleArgs = async args => {
    if (args.silent) {
        console.log = () => null;
        console.error = () => null;
    }

    if (args.help) {
        console.log('ProcKill Manual');
        console.log('Usage: [npx] pk [-options] [args...]\n');
        console.log('\t -p | --port <list-of-ports>\n\t\tkills processes by port');
        console.log('\t -n | --name <list-of-names>\n\t\tkills processes by name');
        console.log('\t -pid | --process-id <list-of-names>\n\t\tkills processes by PID');
        console.log('\t -s | --silent\n\t\tshows no output');
        console.log('\t -h | --help\n\t\tshows this menu');
    }
}

const execute = command => new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
    if (err) {
        return reject(err);
    }
    resolve(stdout);
}));