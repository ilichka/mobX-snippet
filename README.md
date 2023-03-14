# MobX snippet

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Install required dependencies: 

### `npm install mobx-react` &larr; for class components
### `npm install mobx-react-lite` &larr; for functional components
### `npm install mobx`

What is mobX?
MobX is a battle-tested library that makes state management simple and scalable by transparently applying functional reactive programming.

The philosophy behind MobX is simple:
1. **Straightforward**. Write minimalistic, boilerplate-free code that
captures your intent. Trying to update a record field? Simply use
a normal JavaScript assignment — the reactivity system will detect
all your changes and propagate them out to where they are being used. 
No special tools are required when updating data in an asynchronous process.
2. **Effortless optimal rendering**. All changes to and uses of your data are tracked
at runtime, building a dependency tree that captures all relations between state and output.
This guarantees that computations that depend on your state, like React components, run only 
when strictly needed. There is no need to manually optimize components with error-prone and 
sub-optimal techniques like memoization and selectors.
3. **Architectural freedom**. MobX is unopinionated and allows you to manage your application
state outside of any UI framework. This makes your code decoupled, portable, and above all, 
easily testable.

Changes in the observable state are propagated precisely to all computations and side effects 
that depend on the changes being made.

![mobx-view](mobx-interpretation.png)

This conceptual picture can be applied to any application using MobX.

Create `store` folder. Here we will store all logic according to mobX. Create 
counter.ts and export an instance ot Counter class: 

```typescript
class Counter {

}

export default new Counter()
```

Constructor required in this class, so lets add it: 

```typescript
class Counter {
    constructor() {
        makeAutoObservable(this)
    }
}
```

- `makeObservable` makes this class observable with special config.
- `makeAutoObservable` accepts context of current class and automatically configures
our class.

In our class we create variables, that would be our state: 

```typescript
class Counter {
    count: number = 0
    constructor() {
        makeAutoObservable(this)
    }
}
```

Every created method here would be an `action`, which will mutate this state. In compare
with redux state in mobx is mutable. So, if we just change one of variables in state, mobx
will notice it and will rerender our component: 

```typescript
   class Counter {
    count: number = 0
    constructor() {
        makeAutoObservable(this)
    }

    increment() {
        this.count += 1
    }

    decrement() {
        this.count -= 1
    }
}
```
 
Now lets move to our counter `component`. To make our component observable we have to wrap it
in `observer` function. Now if state changes, our component would rerender.

Lets investigate how to work with objects and async code in mobx.

Create todo class.

```typescript
import {makeAutoObservable} from "mobx";

export interface TodoItem {
    id: number;
    title: string;
    completed: boolean
}

class Todo {
    todos: TodoItem[] = [
        {id: 1, title: 'Title 1', completed: false},
        {id: 2, title: 'Title 2', completed: false},
        {id: 3, title: 'Title 3', completed: false},
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
}

export default new Todo()
```

When we render this list of our todo its better to make in additional components, because 
mobx needs to observe only this list, not the whole component. Also use correct
keys in list, to make mobx work correctly.

Ok, now lets change the interface of todo to more complicated: 

```typescript
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
}

export default new Todo()
```

In this case we need to modify our `makeAutoObservable` method:
- Add second parameter to manually configure your properties and methods in class.
Properties are observable, methods are actions and here method also could be
a computed property. But in `makeAutoObservable` it makes no sense to use it, cause this function makes it automatically. If you
want to detail your store just use `makeObservable` instead.
- Add third parameter to pass options. Here we need to make deep observing,
so make option `deep = true`.

## Computed values in mobx

Create timer variable in counter. To create a computed property we just need to mark our method as
get method. The sense of it is to return a result of sum calculations. For example
we add to the string sum of timer and counter. And the advantage of this is that this
function gonna call only if one of this parameters would change, aka `useCallback` in react.

## Async actions

The realisation of async actions in mobx is more simple than in redux. Example:

```typescript
fetchTodo() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                this.todos.push(json)
            })
    }
```