const cp = require('child_process');

module.exports = async args => {
    args.ports.forEach(port => killByPort(port)
        .then(() => console.log(`Process listening on port ${port} has been terminated.`))
        .catch(() => console.error(`Could not find a process listening on port ${port}. Maybe port is already open?`))
    );

    args.processIds.forEach(pid => killPID(pid)
        .then(() => console.log(`Process ${pid} has been terminated.`))
        .catch(() => console.error(`Could not terminate process with ${pid}. Maybe process is already closed?`))
    );

    args.names.forEach(name => killPIDByName(name).catch()
        .then(() => console.log(`Process ${name} has been terminated.`))
        .catch(() => console.error(`Could not terminate process ${name}. Maybe process is already closed?`))
    );
}

const execute = command => new Promise((resolve, reject) => cp.exec(command, (err, stdout) => {
    if (err) {
        return reject(err);
    }
    resolve(stdout);
}));

const getPIDByPort = port => execute(`netstat -ano | findStr "${port}"`).then(out => +out.split('LISTENING')[1].split('\n')[0].trim());

const killedPIDs = [];
const killPID = async pid => {
    if (killedPIDs.includes(pid)) {
        return;
    }

    await execute(`taskkill /F /PID ${pid}`);
    killedPIDs.push(pid);
};

const killPIDByName = async name => {

    let ranOnce = false;
    while (true) {
        const output = await execute(`tasklist /v /fo csv | findstr /i "${name}"`).catch(() => '');
        const lines = output.split('\n');

        if (output === '') {
            if (!ranOnce) {
                throw "Could not execute command";
            }

            return;
        }

        const [_, processName, __, pid] = lines[0].split('"');
        if (processName !== name) {
            continue;
        }

        await killPID(pid);
        ranOnce = true;
    }
}

const killByPort = async port => {
    const pid = await getPIDByPort(port);
    await killPID(pid);
}
