import './TodoCard.scss'
import React, { memo, useEffect, useState } from 'react'
import { ReactComponent as PrioritySvg } from '../../svgs/priority.svg'
import { ReactComponent as StatusSvg } from '../../svgs/status.svg'

const TodoCard = (props) => {
    const { todo, handleSelectTodo, isSelected } = props
    const { name, description, dueDate, priority, status, tags } = todo

    const [animate, setAnimate] = useState(false)

    // Function to convert UTC date to UTC+8 and format it
    const convertToUTCPlus8 = (utcDate) => {
        if (!utcDate) return 'Not Set'

        const date = new Date(utcDate)

        // Convert the date to UTC+8
        date.setHours(date.getHours() + 8)

        // Format the date as needed (only date part, no time)
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }

        return date.toLocaleDateString('en-GB', options)
    }

    // Use effect to trigger animation on update
    useEffect(() => {
        if (!isSelected) return
        setAnimate(true)
        setTimeout(() => setAnimate(false), 300) // Duration should match CSS transition time
    }, [todo, isSelected])

    return (
        <div
            className={`todocard-container ${animate ? 'animate' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelectTodo(isSelected ? null : todo)}
        >
            <div className="todocard-name">{name}</div>
            <div className="todocard-description">{description}</div>
            <div className="todocard-tags-container">
                {
                    tags.length > 0 &&
                    tags.map(tag => {
                        return (
                            <div
                                className="todocard-tag"
                                key={tag.id}
                                title={tag.name}
                                style={{ backgroundColor: tag.color }}
                            />)
                    })
                }
            </div>
            {
                (dueDate || priority || status) &&
                <div className="todocard-content-container">
                    <div className="todocard-content" title={convertToUTCPlus8(dueDate)}>
                        {dueDate && convertToUTCPlus8(dueDate)}
                    </div>
                    <div className="todocard-content" title={priority?.name} >
                        {priority && <PrioritySvg fill={priority?.color} />}
                    </div>
                    <div className="todocard-content" title={status?.name}>
                        {status && <StatusSvg fill={status?.color} />}
                    </div>
                </div>
            }
        </div>
    )
}

export default memo(TodoCard)
