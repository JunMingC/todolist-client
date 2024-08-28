import './Toolbar.scss'
import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { viewMethodList } from '../../data/viewMethodList'
import { datePeriodList } from '../../data/dataPeriodList'

const Toolbar = (props) => {
    const {
        toolbarQuery,
        viewMethodId,
        setViewMethodId,
        filterId,
        setFilterId,
    } = props

    const { data: attributeList } = useQuery(toolbarQuery) // priority, status, tag

    const filterList = useMemo(() => {
        switch (viewMethodId) {
            case 1:
            default:
                return null
            case 2:
                return datePeriodList
            case 3:
            case 4:
            case 5:
                return attributeList

        }
    }, [attributeList, viewMethodId])

    const handleViewMethodChange = (event) => {
        const { value, } = event.target

        setViewMethodId(parseInt(value))
        setFilterId(0)
    }

    const handleFilterChange = (event) => {
        const { value, } = event.target

        setFilterId(parseInt(value))
    }

    return (
        <div className="toolbar-container">
            <div className='toolbar-content-container'>
                {
                    viewMethodList &&
                    <div className="toolbar-content">
                        <div className="toolbar-label">
                            View by
                        </div>
                        <div className="toolbar-input-container">
                            <select
                                className="toolbar-input"
                                id="toolbar-viewMethodId"
                                name="toolbar-viewMethodId"
                                value={viewMethodId || 0}
                                onChange={handleViewMethodChange}
                            >
                                {viewMethodList.map((option) => (
                                    <option key={option.id} value={option.id} style={{ color: option.color }}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }

                {
                    filterList &&
                    <div className="toolbar-content">
                        <div className="toolbar-label">
                            Filter by
                        </div>
                        <div className="toolbar-input-container">
                            <select
                                className="toolbar-input"
                                id="toolbar-filterId"
                                name="toolbar-filterId"
                                value={filterId || 0}
                                onChange={handleFilterChange}
                            >
                                <option value="">All</option>
                                {filterList.map((option) => (
                                    <option key={option.id} value={option.id} style={{ color: option.color }}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Toolbar