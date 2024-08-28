import './TodoPage.scss'
import React, { useMemo, useState } from 'react'
import Toolbar from '../../components/Toolbar/Toolbar'
import MainContent from '../../components/MainContent/MainContent'
import { GetTodosBy, getTodosQuery } from '../../hooks/useTodoQueries'
import { GetPrioritiesBy, getPrioritiesQuery } from '../../hooks/usePriorityQueries'
import { GetStatusesBy, getStatusesQuery } from '../../hooks/useStatusQueries'
import { GetTagsBy, getTagsQuery } from '../../hooks/useTagQueries'

const TodoPage = () => {
    const [viewMethodId, setViewMethodId] = useState(null)
    const [filterId, setFilterId] = useState(null)

    const toolbarQuery = useMemo(() => {
        switch (viewMethodId) {
            case 3:
                return getPrioritiesQuery(GetPrioritiesBy.ALL)
            case 4:
                return getStatusesQuery(GetStatusesBy.ALL)
            case 5:
                return getTagsQuery(GetTagsBy.ALL)
            default:
                return { enabled: false }
        }
    }, [viewMethodId])


    const mainContentQuery = useMemo(() => {
        switch (viewMethodId) {
            default:
            case 1: {
                return getTodosQuery(GetTodosBy.ALL)
            }
            case 2: {
                const searchParam = filterId ? { period: filterId - 1 } : null
                return getTodosQuery(GetTodosBy.ALL_SORTED_BY_DUE_DATE, searchParam)
            }
            case 3: {
                const searchParam = filterId ? { priorityId: filterId } : null
                return getTodosQuery(GetTodosBy.ALL_SORTED_BY_PRIORITY_ID, searchParam)
            }
            case 4: {
                const searchParam = filterId ? { statusId: filterId } : null
                return getTodosQuery(GetTodosBy.ALL_SORTED_BY_STATUS_ID, searchParam)
            }
            case 5: {
                const searchParam = filterId ? { tagId: filterId } : null
                return getTodosQuery(GetTodosBy.ALL_SORTED_BY_TAGS_COUNT, searchParam)
            }
        }
    }, [filterId, viewMethodId])

    return (
        <div className="todopage-container">
            <Toolbar
                toolbarQuery={toolbarQuery}
                viewMethodId={viewMethodId}
                setViewMethodId={setViewMethodId}
                filterId={filterId}
                setFilterId={setFilterId}
            />
            <MainContent
                mainContentQuery={mainContentQuery}
            />
        </div>
    )
}

export default TodoPage