#!/usr/bin/env node
const args = require('./utils/process-args');
const utils = require('./utils/misc');
const OSControllerImpl = process.platform === 'win32' ? require('./win32') : require('./unix-like');
const controller = new OSControllerImpl();

(async () => {
    await utils.handleArgs(args);

    args.ports.forEach(port => controller.killByPort(port)
        .then(() => console.log(`Process listening on port ${port} has been terminated.`))
        .catch(() => console.error(`Could not find a process listening on port ${port}. Maybe port is already open?`))
    );

    args.processIds.forEach(pid => controller.killByPID(pid)
        .then(() => console.log(`Process ${pid} has been terminated.`))
        .catch(() => console.error(`Could not terminate process with ${pid}. Maybe process is already closed?`))
    );

    args.names.forEach(name => controller.killByName(name).catch()
        .then(() => console.log(`Process ${name} has been terminated.`))
        .catch(() => console.error(`Could not terminate process ${name}. Maybe process is already closed?`))
    );
})();

