import {makeAutoObservable} from "mobx";

export interface TodoItem {
    id: number;
    title: TodoTitle;
    completed: boolean
}

export interface TodoTitle {
    id: number;
    value: string
}

class Todo {
    todos: TodoItem[] = [
        {id: 1, title: {id: 1, value:'Title 1'}, completed: false},
        {id: 2, title: {id: 2, value:'Title 2'}, completed: false},
        {id: 3, title: {id: 3, value:'Title 3'}, completed: false},
    ]

    constructor() {
        makeAutoObservable(this)
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
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                this.todos.push(json)
            })
    }
}

export default new Todo()