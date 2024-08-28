import { statusEndpoints } from "../api/endpoints"
import { server } from "../api/server"

export const GetStatusesBy = Object.freeze({
    BY_ID: 'BY_ID',
    ALL: 'ALL',
    ALL_SORTED_BY_NAME: 'ALL_SORTED_BY_NAME',
})

export function getStatusesQuery(getStatusesBy, search = null) {
    let queryObj = {}

    switch (getStatusesBy) {
        case GetStatusesBy.BY_ID:
            queryObj = {
                queryKey: ['tag', 'getStatusById'],
                queryFn: async () => await server.get(statusEndpoints.getStatusById, search),
            }
            break
        default:
        case GetStatusesBy.ALL:
            queryObj = {
                queryKey: ['tag', 'getStatuses'],
                queryFn: async () => await server.get(statusEndpoints.getStatuses, search),
            }
            break
        case GetStatusesBy.ALL_SORTED_BY_NAME:
            queryObj = {
                queryKey: ['tag', 'getStatusesSortedByName'],
                queryFn: async () => await server.get(statusEndpoints.getStatusesSortedByName, search),
            }
            break
    }

    search && queryObj.queryKey?.push(search)

    return queryObj
}