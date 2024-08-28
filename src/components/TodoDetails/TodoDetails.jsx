import './TodoDetails.scss'
import React, { useState, useEffect, memo, useRef } from 'react'
import { useDeleteTodoByIdMutation, useUpdateTodoMutation } from '../../hooks/useTodoMutations'
import { GetPrioritiesBy, getPrioritiesQuery } from '../../hooks/usePriorityQueries'
import { GetStatusesBy, getStatusesQuery } from '../../hooks/useStatusQueries'
import { GetTagsBy, getTagsQuery } from '../../hooks/useTagQueries'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as DeleteSvg } from '../../svgs/delete.svg'
import { ReactComponent as PlusSvg } from '../../svgs/plus.svg'

const TodoDetails = (props) => {
    const { selectedTodo: todo, handleClearTodo } = props || {}
    const { id, name, description, dueDate, priority, status, tags } = todo || {}

    const queryClient = useQueryClient()

    const { data: priorityList } = useQuery(getPrioritiesQuery(GetPrioritiesBy.ALL))
    const { data: statusList } = useQuery(getStatusesQuery(GetStatusesBy.ALL))
    const { data: tagList } = useQuery(getTagsQuery(GetTagsBy.ALL))

    const updateTodoMutation = useUpdateTodoMutation({
        config: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['todo'] })
            },
            onError: (error) => {
                console.error(`Failed to update todo: ${error.message}`)
            },
        },
    })

    const deleteTodoMutation = useDeleteTodoByIdMutation({
        config: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['todo'] })
            },
            onError: (error) => {
                console.error(`Failed to delete todo: ${error.message}`)
            },
        },
    })

    const [formData, setFormData] = useState(formatFormData(id, name, description, dueDate, priority, status, tags))
    const [showTagSelector, setShowTagSelector] = useState(false)

    const formRef = useRef(null)

    function formatFormData(id, name, description, dueDate, priority, status, tags) {
        function convertToUTCPlus8(utcDate) {
            if (!utcDate) return ""

            const date = new Date(utcDate)

            // Convert the date to UTC+8
            date.setHours(date.getHours() + 8)

            // Format the date as needed (only date part, no time)
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }

            return date.toLocaleDateString("fr-CA", options)
        }

        return {
            id: id || 0,
            name: name || '',
            description: description || '',
            dueDate: convertToUTCPlus8(dueDate) || '',
            priority: priority || null,
            status: status || null,
            tags: tags || [],
        }
    }

    const handleInputChange = (event) => {
        const { value, dataset } = event.target
        const { key } = dataset

        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    }

    const handleSelectChange = (event) => {
        const { value: id, dataset } = event.target
        const { key } = dataset

        const prevData = { ...formData }
        const dataList = key === "priority" ? priorityList : statusList
        const nextValue = id ? dataList.find(data => data.id === parseInt(id)) : null

        const nextData = {
            ...prevData,
            [key]: nextValue,
        }

        handleUpdate(nextData)
        setFormData(nextData)
    }

    const handleTagToggle = (tag) => {
        const prevData = { ...formData }
        const isTagSelected = prevData.tags.some((t) => t.id === tag.id)
        const nextTags = isTagSelected
            ? prevData.tags.filter((t) => t.id !== tag.id) // Remove tag
            : [...prevData.tags, tag] // Add tag

        const nextData = {
            ...prevData,
            tags: nextTags.sort((a, b) => a.id - b.id),
        }

        handleUpdate(nextData)
        setFormData(nextData)
    }

    const handleUpdate = (data = formData) => {
        if (!todo) return

        // Check if the form is valid
        const containerElement = formRef.current
        if (!containerElement.checkValidity()) {
            containerElement.reportValidity()
            return
        }

        const payLoad = {
            id: data.id,
            name: data.name,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
            priorityId: data.priority ? data.priority.id : null,
            statusId: data.status ? data.status.id : null,
            tagIds: data.tags.map((tag) => tag.id),
        }

        updateTodoMutation.mutate(payLoad)
    }

    const handleDelete = () => {
        if (!todo) return

        deleteTodoMutation.mutate(formData.id)
        handleClearTodo()
    }

    const handleOverlayClose = () => {
        setShowTagSelector(false)
    }

    useEffect(() => {
        setFormData(formatFormData(id, name, description, dueDate, priority, status, tags))
    }, [description, dueDate, id, name, priority, status, tags])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                const activeElement = document.activeElement
                const key = activeElement?.dataset.key

                if ((key === 'name' || key === 'description' || key === 'dueDate')) {
                    activeElement.blur()
                }
            }
        }

        const containerElement = formRef.current

        if (containerElement) {
            containerElement.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            if (containerElement) {
                containerElement.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [])

    return (
        <form className={`tododetails-container ${todo ? 'selected' : 'not-selected'}`} onSubmit={event => { event.preventDefault() }} noValidate autoComplete='off' ref={formRef}>
            {
                todo &&
                <>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label" htmlFor="tododetails-name">Name</label>
                        <input
                            className="tododetails-content-input"
                            type="text"
                            id="tododetails-name"
                            name="tododetails-name"
                            value={formData.name}
                            data-key="name"
                            onChange={handleInputChange}
                            onBlur={() => handleUpdate()}
                            required
                        />
                    </div>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label" htmlFor="tododetails-description">Description</label>
                        <textarea
                            className="tododetails-content-input"
                            id="tododetails-description"
                            name="tododetails-description"
                            value={formData.description}
                            data-key="description"
                            onChange={handleInputChange}
                            onBlur={() => handleUpdate()}
                        ></textarea>
                    </div>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label" htmlFor="tododetails-dueDate">Due Date</label>
                        <input
                            className="tododetails-content-input"
                            type="date"
                            id="tododetails-dueDate"
                            name="tododetails-dueDate"
                            value={formData.dueDate}
                            data-key="dueDate"
                            onChange={handleInputChange}
                            onBlur={() => handleUpdate()}
                            min="1800-01-01"
                            max="9999-12-31"
                        />
                    </div>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label" htmlFor="tododetails-priority">Priority</label>
                        <div className="tododetails-select-container">
                            <select
                                className="tododetails-content-input"
                                id="tododetails-priority"
                                name="tododetails-priority"
                                value={formData.priority?.id || ''}
                                data-key="priority"
                                onChange={handleSelectChange}
                            >
                                <option value="">Select Priority</option>
                                {priorityList?.map((option) => (
                                    <option key={option.id} value={option.id} style={{ color: option.color }}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label" htmlFor="tododetails-status">Status</label>
                        <div className="tododetails-select-container">
                            <select
                                className="tododetails-content-input"
                                id="tododetails-status"
                                name="tododetails-status"
                                value={formData.status?.id || ''}
                                data-key="status"
                                onChange={handleSelectChange}
                            >
                                <option value="">Select Status</option>
                                {statusList?.map((option) => (
                                    <option key={option.id} value={option.id} style={{ color: option.color }}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="tododetails-content-container">
                        <label className="tododetails-content-label">Tags</label>
                        <div className="tags-container">
                            {formData.tags.map((tag) => (
                                <div key={tag.id} className="tag" style={{ backgroundColor: tag.color }} title={tag.name}>
                                    <span>{tag.name}</span>
                                </div>
                            ))}
                            <div className="modify-tag-button" onClick={setShowTagSelector} title={"Modify Tags"}>
                                <PlusSvg />
                            </div>
                        </div>
                    </div>

                    <div className={`footer-container`}>
                        <div className="footer-btn delete-btn" onClick={() => handleDelete()} title={"Delete Task"}>
                            <DeleteSvg />
                        </div>
                    </div>

                    {showTagSelector && (
                        <div className="tagselector-container">
                            <div className="tagselector-content-container">
                                <div className="tagselector-header">Tags</div>
                                {tagList?.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="tagselector-tag"
                                        style={{ backgroundColor: tag.color }}
                                        title={tag.name}
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        <input
                                            className="tagselector-tag-checkbox"
                                            type="checkbox"
                                            checked={formData.tags.some((t) => t.id === tag.id)}
                                            readOnly
                                        />
                                        <span >{tag.name}</span>
                                    </div>
                                ))}
                                <div className="tagselector-footer" onClick={handleOverlayClose}>
                                    Close
                                </div>
                            </div>
                        </div>
                    )}
                </>
            }
        </form>
    )
}

export default memo(TodoDetails)
