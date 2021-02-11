import { forEachValue } from './util'
import Module from './module'
import { Data } from './type'

export default class ModuleCollection {
    root: Data
    constructor(options) {
        this.register([], options)
    }

    register(path, rootModule) {
        // let newModule = {
        //     _raw: rootModule,
        //     _children: {},
        //     state: rootModule.state,
        // }

        let newModule = new Module(rootModule)

        if (path.length === 0) {
            this.root = newModule
        } else {
            let parent = path.slice(0, -1).reduce((prev, cur) => {
                return prev._children[cur]
            }, this.root)
            parent._children[path[path.length - 1]] = newModule
        }

        if (rootModule.modules) {
            forEachValue(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }

    }

    getNamespace(path) {
        let module = this.root
        return path.reduce((namespace, key) => {
            module = module.getChild(key);
            return namespace + (module.namespaced ? key + '/' : '')
        }, '');
    }
}