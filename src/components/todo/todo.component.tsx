import React from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "../../store";
import './todo.styles.css'
import {TodoItem} from "../../store/entities/todo";

export const TodoComponent = observer(() => {
    const {todo} = useStore()

    const handleAddTodo = () => {
        todo.addTodo({
            id: new Date().getTime(),
            title: {
                id: new Date().getTime(),
                value: prompt() || 'empty todo'
            },
            completed: false
        })
    }

    const handleRemoveTodo = (todoItem: TodoItem) => {
        todo.removeTodo(todoItem)
    }

    const handleFetchTodos = () => {
        todo.fetchTodo()
    }

    const handleToggleComplete = (todoItem: TodoItem) => {
        todo.toggleCompleteTodo(todoItem)
    }

    return (
        <div className='todo-container'>
            {todo.todos.map(todoItem => <div className={`todo-item ${todoItem.completed && 'completed'}`} onClick={() => handleToggleComplete(todoItem)}>
                <div className='todo' key={todoItem.id}>{todoItem.title.value} - {todoItem.completed ? 'completed' : 'not completed'}</div>
                <div className='cross' onClick={()=>handleRemoveTodo(todoItem)}>X</div>
            </div>)}
            <div className='button-container'>
                <div className='button' onClick={handleAddTodo}>Add Todo</div>
                <div className='button' onClick={handleFetchTodos}>Fetch todos</div>
            </div>
        </div>
    );
});