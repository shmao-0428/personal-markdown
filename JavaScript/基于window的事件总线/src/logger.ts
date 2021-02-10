type Log = {
    [propName: string]: any
}

class Logger {
    errors: Log
    infos: Log
    logs: Log
    warns: Log
    constructor() {
        this.errors = {};
        this.infos = {};
        this.logs = {};
        this.warns = {};
    }

    _format(time: Date) {
        return `${time.getFullYear()}/${time.getMonth()}/${time.getDay()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`
    }

    private getTimes() {
        let time = new Date();
        let _time = +new Date()
        let format = this._format(time)
        return { _time, format };
    }

    error(e: string) {
        let { _time, format } = this.getTimes();
        this.errors[_time + ''] = [format, e]
        console.error(e);
    }

    info(e: string) {
        let { _time, format } = this.getTimes();
        this.infos[_time + ''] = [format, e]
        console.info(e);
    }

    log(e: string) {
        let { _time, format } = this.getTimes();
        this.logs[_time + ''] = [format, e]
        console.log(e);
    }

    warn(e: string) {
        let { _time, format } = this.getTimes();
        this.warns[_time + ''] = [format, e]
        console.warn(e);
    }
}

export default new Logger