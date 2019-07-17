const cp = require('child_process');
const throwError = require('../utils/throw-err');

module.exports = async args => {
    console.log(args);
    args.ports.forEach(killByPort);
}

const execute = command => new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
    if (err) {
        return reject(err);
    }
    resolve(stdout);
}))

const getPID = port => execute(`netstat -ano | findStr "${port}"`).then(out => +out.split('LISTENING')[1].trim());

const killPID = pid => execute(`taskkill /F /PID ${pid}`);

const killByPort = async port => {
    const pid = await getPID(port).catch(() => {
        console.error(`Could not find a process listening on port ${port}`);
        return null;
    });

    if (!pid) {
        return;
    }

    await killPID(pid);
    console.log(`PID ${pid} listening on port ${port} is now terminated`);
}