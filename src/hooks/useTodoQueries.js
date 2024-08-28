import { todoEndpoints } from "../api/endpoints"
import { server } from "../api/server"

export const GetTodosBy = Object.freeze({
    BY_ID: 'BY_ID',
    ALL: 'ALL',
    ALL_SORTED_BY_DUE_DATE: 'ALL_SORTED_BY_DUE_DATE',
    ALL_SORTED_BY_PRIORITY_ID: 'ALL_SORTED_BY_PRIORITY_ID',
    ALL_SORTED_BY_PRIORITY_NAME: 'ALL_SORTED_BY_PRIORITY_NAME',
    ALL_SORTED_BY_STATUS_ID: 'ALL_SORTED_BY_STATUS_ID',
    ALL_SORTED_BY_STATUS_NAME: 'ALL_SORTED_BY_STATUS_NAME',
    ALL_SORTED_BY_TAGS_COUNT: 'ALL_SORTED_BY_TAGS_COUNT',
})

export function getTodosQuery(getTodosBy, search = null) {
    let queryObj = {}

    switch (getTodosBy) {
        case GetTodosBy.BY_ID:
            queryObj = {
                queryKey: ['todo', 'getTodoById'],
                queryFn: async () => await server.get(todoEndpoints.getTodoById, search),
            }
            break
        default:
        case GetTodosBy.ALL:
            queryObj = {
                queryKey: ['todo', 'getTodos'],
                queryFn: async () => await server.get(todoEndpoints.getTodos, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_DUE_DATE:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByDueDate'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByDueDate, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_PRIORITY_ID:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByPriorityId'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByPriorityId, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_PRIORITY_NAME:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByPriorityName'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByPriorityName, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_STATUS_ID:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByStatusId'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByStatusId, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_STATUS_NAME:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByStatusName'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByStatusName, search),
            }
            break
        case GetTodosBy.ALL_SORTED_BY_TAGS_COUNT:
            queryObj = {
                queryKey: ['todo', 'getTodosSortedByTagsCount'],
                queryFn: async () => await server.get(todoEndpoints.getTodosSortedByTagsCount, search),
            }
            break
    }

    search && queryObj.queryKey?.push(search)

    return queryObj
}