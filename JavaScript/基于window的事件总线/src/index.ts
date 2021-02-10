import Logger from './logger';

type Events = {
    [propName: string]: any
}
class WindowEventBus {
    private _events: Events
    _logger: {}
    constructor() {
        this._events = {};
        this._logger = Logger;
    }

    addEvents(name: string, cb: (...args: any[]) => {}, triggerImmediately?: boolean) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
        this._events[name].push(cb);

        if (triggerImmediately) {
            cb()
        }
    }

    emitEvents(name: string, ...args: any[]) {
        if (!this._events[name]) {
            // throw new Error('not found target events, make true you have been registered this events or you have been deleted this events')
            Logger.warn('not found target events, \n make true you have been registered this events \n or you have been deleted this events')
            return
        }

        this._events[name].forEach((fn: (...args: any[]) => {}) => {
            fn(...args)
        });
    }

    removeEvents(name: string, cb?: (...args: any[]) => {}) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        if (typeof cb === 'function') {
            return this._events[name] = this._events[name].filter((fn: () => {}) => fn !== cb);
        }

        Reflect.deleteProperty(this._events, name);
    }
}

export default WindowEventBus