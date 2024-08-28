import './MainContent.scss'
import React, { useCallback, useEffect, useState } from 'react'
import TodoDetails from '../TodoDetails/TodoDetails'
import TodoList from '../TodoList/TodoList'
import { useQuery } from '@tanstack/react-query'

const MainContent = (props) => {
    const { mainContentQuery } = props

    const { isPending, error, data } = useQuery(mainContentQuery)

    const [selectedTodo, setSelectedTodo] = useState(null)

    const handleSelectTodo = useCallback((todo = null) => {
        setSelectedTodo(todo)
    }, [])

    const handleClearTodo = useCallback(() => {
        setSelectedTodo(null)
    }, [])

    // Clear selected on query change (view by or filter by changes)
    useEffect(() => {
        setSelectedTodo(null)
    }, [mainContentQuery])

    // Handle loading state
    if (isPending) return null

    // Handle error state
    if (error) return <p>An error has occurred: {error.message}</p>

    return (
        <div className={`maincontent-container`}>
            <TodoList todoList={data} selectedTodo={selectedTodo} handleSelectTodo={handleSelectTodo} />
            <TodoDetails selectedTodo={selectedTodo} handleClearTodo={handleClearTodo} />
        </div>
    )
}

export default MainContent