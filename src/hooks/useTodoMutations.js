import { useMutation } from "@tanstack/react-query"
import { todoEndpoints } from "../api/endpoints"
import { server } from "../api/server"

export function useCreateTodoMutation(param) {
    const {
        config = {},
    } = param || {}

    return useMutation({
        mutationFn: async (body) => await server.post(todoEndpoints.createTodo, body),
        ...config
    })
}

export function useUpdateTodoMutation(param) {
    const {
        config = {},
    } = param || {}

    return useMutation({
        mutationFn: async (body) => await server.put(todoEndpoints.updateTodo, body),
        ...config
    })
}

export function useDeleteTodoByIdMutation(param) {
    const {
        config = {},
    } = param || {}

    return useMutation({
        mutationFn: async (id) => await server.delete(todoEndpoints.deleteTodoById, id),
        ...config
    })
}
