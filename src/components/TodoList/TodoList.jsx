import './TodoList.scss'
import React, { memo } from 'react'
import TodoCard from '../TodoCard/TodoCard'
import TodoCreator from '../TodoCreator/TodoCreator'

const TodoList = (props) => {
    const {
        todoList = [],
        selectedTodo = null,
        handleSelectTodo = function () { },
    } = props || {}

    return (
        <div className={`todolist-container ${selectedTodo ? 'selected' : 'not-selected'}`} >
            <div className="todolist-content-container">
                {
                    todoList.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            handleSelectTodo={handleSelectTodo}
                            isSelected={selectedTodo?.id === todo.id}
                        />
                    ))
                }
            </div>
            <div className="todolist-footer-container">
                <TodoCreator
                    handleSelectTodo={handleSelectTodo}
                />
            </div>
        </div>
    )
}

export default memo(TodoList)