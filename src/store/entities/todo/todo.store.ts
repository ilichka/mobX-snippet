import {makeAutoObservable} from "mobx";

import {RootStore} from "../root";
import {TodoItem, TodoResponseItem} from "./todo.interface";


export class TodoStore {
    rootStore: RootStore
    todos: TodoItem[] = []

    constructor(rootStore: RootStore) {
        makeAutoObservable(this,{},{deep: true, autoBind: true})

        this.rootStore = rootStore
    }

    addTodo(todo: TodoItem) {
        this.todos.push(todo)
    }

    removeTodo(todo: TodoItem) {
        this.todos = this.todos.filter(todoItem => todoItem.id !== todo.id)
    }

    toggleCompleteTodo(todo: TodoItem) {
        this.todos = this.todos.map(todoItem => todoItem.id === todo.id ? {...todoItem, completed: !todoItem.completed} : todoItem)
    }

    fetchTodo() {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(json => {
                const newTodo = json.map((todo: TodoResponseItem)=>({...todo, title:{
                        id: todo.id,
                        value: todo.title
                    }}))
                this.todos = [...this.todos, ...newTodo]
            })
    }
}