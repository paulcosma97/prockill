const OSController = require('../utils/os.controller');

class UnixLikeController extends OSController {
    killedPids = []

    async killByPort(port) {
        const pid = await this.execute(`netstat -vanp tcp | grep ${port} | awk '{print $9}'`);
        await this.killByPID(pid);

        return this.killedPids;
    }

    async killByName(name) {
        const lines = await this.execute(`ps aux | grep -i ${name} | awk '{ print $2 }'`);
        const pids = lines.trim().split('\n');

        for(const pid of pids) {
            await this.killByPID(pid)
        }

        return this.killedPids;
    }

    async killByPID(pid) {
        this.killedPids.push(pid);
        await this.execute(`kill ${pid} >/dev/null`);
        return this.killedPids;
    }

}

module.exports = UnixLikeController;