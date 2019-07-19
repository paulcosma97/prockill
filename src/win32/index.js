const execute = require('../utils/misc').execute;

const OSController = require('../utils/os.controller');

class Win32Controller extends OSController {
    killedPIDs = [];

    async killByPID(pid) {
        if (this.killedPIDs.includes(pid)) {
            return;
        }
    
        await execute(`taskkill /F /PID ${pid}`);
        this.killedPIDs.push(pid);
    }

    async killByName(name) {
        let ranOnce = false;
        while (true) {
            const output = await this.execute(`tasklist /v /fo csv | findstr /i "${name}"`).catch(() => '');
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
    
            await this.killByPID(pid);
            ranOnce = true;
        }
    }

    async killByPort(port) {
        const pid = await this.execute(`netstat -ano | findStr "${port}"`).then(out => +out.split('LISTENING')[1].split('\n')[0].trim());
        await this.killByPID(pid);
    }
}

module.exports = Win32Controller;

async args => {
    
}
