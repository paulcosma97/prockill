const OSController = require('../utils/os.controller');

class UnixLikeController extends OSController {
    async killByPort(port) {
        const pid = await this.execute(`netstat -vanp tcp | grep ${port} | awk '{print $9}'`);
        await this.killByPID(pid);
    }

    async killByName(name) {
        const lines = await this.execute(`ps aux | grep -i ${name} | awk '{ print $2 }'`);
        const pids = lines.trim().split('\n');

        for(const pid of pids) {
            await this.killByPID(pid)
        }
    }

    async killByPID(pid) {
        await this.execute(`kill ${pid} >/dev/null`);
    }

}

module.exports = UnixLikeController;