import {makeAutoObservable} from "mobx";

import {RootStore} from "../root";

export class CounterStore {
    rootStore: RootStore
    count: number = 0
    timer: number = 60;
    constructor(rootStore: RootStore) {
        makeAutoObservable(this)

        this.rootStore = rootStore
    }

    increment() {
        this.count += 1
    }

    decrement() {
        this.count -= 1
    }

    get total() {
        return `Count + timer = ${this.count + this.timer}`
    }
}