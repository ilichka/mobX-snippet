import {CounterStore} from "../counter";
import {TodoStore} from "../todo";

export class RootStore {
    counter: CounterStore
    todo: TodoStore

    constructor() {
        this.counter = new CounterStore(this)
        this.todo = new TodoStore(this)
    }

    init = () => {
        //init func
    }
}