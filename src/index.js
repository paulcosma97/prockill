#!/usr/bin/env node
const args = require('./utils/process-args');
const utils = require('./utils/misc');
const OSControllerImpl = process.platform === 'win32' ? require('./win32') : require('./unix-like');
const controller = new OSControllerImpl();

(async () => {
    await utils.handleArgs(args);

    args.ports.forEach(port => controller.killByPort(port)
        .then(pids => console.log(`Process listening on port ${port} (PID: ${pids[0].trim()}) has been terminated.`))
        .catch(() => console.error(`Could not find any process listening on port ${port}. Maybe port is already free?`))
    );

    args.processIds.forEach(pid => controller.killByPID(pid)
        .then(() => console.log(`Process ${pid} has been terminated.`))
        .catch(() => console.error(`Could not terminate process ${pid}. Maybe process is already free?`))
    );

    args.names.forEach(name => controller.killByName(name).catch()
        .then(pids => console.log(`Process ${name} (PIDs: ${pids.map(it => it.trim()).join(', ')}) has been terminated.`))
        .catch(() => console.error(`Could not terminate process '${name}'. Maybe process is already free?`))
    );
})();

