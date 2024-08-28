import { tagEndpoints } from "../api/endpoints"
import { server } from "../api/server"

export const GetTagsBy = Object.freeze({
    BY_ID: 'BY_ID',
    ALL: 'ALL',
    ALL_SORTED_BY_NAME: 'ALL_SORTED_BY_NAME',
})

export function getTagsQuery(getTagsBy, search = null) {
    let queryObj = {}

    switch (getTagsBy) {
        case GetTagsBy.BY_ID:
            queryObj = {
                queryKey: ['tag', 'getTagById'],
                queryFn: async () => await server.get(tagEndpoints.getTagById, search),
            }
            break
        default:
        case GetTagsBy.ALL:
            queryObj = {
                queryKey: ['tag', 'getTags'],
                queryFn: async () => await server.get(tagEndpoints.getTags, search),
            }
            break
        case GetTagsBy.ALL_SORTED_BY_NAME:
            queryObj = {
                queryKey: ['tag', 'getTagsSortedByName'],
                queryFn: async () => await server.get(tagEndpoints.getTagsSortedByName, search),
            }
            break
    }

    search && queryObj.queryKey?.push(search)

    return queryObj
}