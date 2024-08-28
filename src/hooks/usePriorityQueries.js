import { priorityEndpoints } from "../api/endpoints"
import { server } from "../api/server"

export const GetPrioritiesBy = Object.freeze({
    BY_ID: 'BY_ID',
    ALL: 'ALL',
    ALL_SORTED_BY_NAME: 'ALL_SORTED_BY_NAME',
})

export function getPrioritiesQuery(getPrioritiesBy, search = null) {
    let queryObj = {}

    switch (getPrioritiesBy) {
        case GetPrioritiesBy.BY_ID:
            queryObj = {
                queryKey: ['tag', 'getPriorityById'],
                queryFn: async () => await server.get(priorityEndpoints.getPriorityById, search),
            }
            break
        default:
        case GetPrioritiesBy.ALL:
            queryObj = {
                queryKey: ['tag', 'getPriorities'],
                queryFn: async () => await server.get(priorityEndpoints.getPriorities, search),
            }
            break
        case GetPrioritiesBy.ALL_SORTED_BY_NAME:
            queryObj = {
                queryKey: ['tag', 'getPrioritiesSortedByName'],
                queryFn: async () => await server.get(priorityEndpoints.getPrioritiesSortedByName, search),
            }
            break
    }

    search && queryObj.queryKey?.push(search)

    return queryObj
}