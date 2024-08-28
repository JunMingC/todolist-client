import './TodoCreator.scss'
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateTodoMutation } from '../../hooks/useTodoMutations'
import { ReactComponent as CreateSvg } from '../../svgs/create.svg'

const TodoCreator = (props) => {
    const { handleSelectTodo } = props

    const queryClient = useQueryClient()

    const createTodoMutation = useCreateTodoMutation({
        config: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['todo'] })
            },
            onError: (error) => {
                console.error(`Failed to create todo: ${error.message}`)
            },
        },
    })

    const formRef = useRef(null)
    const inputRef = useRef()

    function onButtonClick() {
        const event = {
            target: inputRef.current
        }

        handleSelectTodo(null)
        handleCreate(event)
    }

    const handleCreate = useCallback((event) => {
        // Check if the form is valid
        const containerElement = formRef.current
        if (!containerElement.checkValidity()) {
            containerElement.reportValidity()
            return
        }

        const { value } = event.target

        const payLoad = {
            name: value,
            description: null,
            dueDate: null,
            priorityId: null,
            statusId: null,
            tagIds: [],
        }

        event.target.value = ""
        createTodoMutation.mutate(payLoad)
    }, [createTodoMutation])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                const activeElement = document.activeElement
                const key = activeElement?.dataset.key

                if (key === 'name') {
                    handleCreate(event)
                }
            }
        }

        const currentInputRef = inputRef.current

        if (currentInputRef) {
            currentInputRef.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            if (currentInputRef) {
                currentInputRef.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [handleCreate])

    return (
        <form className={`todocreator-container`} onSubmit={event => { event.preventDefault() }} noValidate autoComplete='off' ref={formRef}>
            <input
                className="todocreator-input"
                type="text"
                id="todocreator-name"
                name="todocreator-name"
                data-key="name"
                onClick={() => handleSelectTodo(null)}
                ref={inputRef}
                required
            />
            <div className="todocreator-btn" title={"Add Task"} onClick={onButtonClick}>
                <CreateSvg />
            </div>
        </form>
    )
}

export default memo(TodoCreator)
