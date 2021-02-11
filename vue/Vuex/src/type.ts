import { type } from "os"

type Vm = {
    state: Data
}

type Data = {
    [propNames: string]: any
}

export { Vm, Data }