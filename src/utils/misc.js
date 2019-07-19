const info = require('../../package.json');
const cp = require('child_process');

module.exports.handleArgs = async args => {
    if (args.silent) {
        console.log = () => null;
        console.error = () => null;
    }

    if (!args.skipVersionCheck) {
        await versionCheck();
    }

    if (args.help) {
        console.log(`ProcKill Manual v${info.version}\n${info.description}\n`);
        console.log('Usage: [npx] prockill [-options] [args...]\n');
        console.log('\t -p | --port <list-of-ports>\n\t\tkills processes by port');
        console.log('\t -n | --name <list-of-names>\n\t\tkills processes by name');
        console.log('\t -pid | --process-id <list-of-names>\n\t\tkills processes by PID');
        console.log('\t -k | --skip-version-check\n\t\tskips version check thus fastening the whole process. hah, process, get it?');
        console.log('\t -s | --silent\n\t\tshows no output');
        console.log('\t -h | --help\n\t\tshows this menu');
    }
}

const versionCheck = async () => {
    const output = await execute('npm view prockill version');
    if (output.length < 3) {
        return;
    }

    if (output.trim() !== info.version) {
        console.log(`🔥 There's a newer version available: ${info.version} -> ${output.trim()} 🔥\nConsider updating using 'npm install -g prockill'\n`);
    }
}

const execute = command => new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
    if (err) {
        return reject(err);
    }
    resolve(stdout);
}));