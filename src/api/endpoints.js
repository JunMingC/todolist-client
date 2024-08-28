const baseURL = process.env.REACT_APP_API

export const todoEndpoints = {
    getTodoById: baseURL + 'todo',
    getTodos: baseURL + 'todo/GetTodos',
    getTodosSortedByDueDate: baseURL + 'todo/GetTodosSortedByDueDate',
    getTodosSortedByPriorityName: baseURL + 'todo/GetTodosSortedByPriorityName',
    getTodosSortedByPriorityId: baseURL + 'todo/GetTodosSortedByPriorityId',
    getTodosSortedByStatusName: baseURL + 'todo/GetTodosSortedByStatusName',
    getTodosSortedByStatusId: baseURL + 'todo/GetTodosSortedByStatusId',
    getTodosSortedByTagsCount: baseURL + 'todo/GetTodosSortedByTagsCount',
    createTodo: baseURL + 'todo/',
    updateTodo: baseURL + 'todo/',
    deleteTodoById: baseURL + 'todo/',
}

export const priorityEndpoints = {
    getPriorityById: baseURL + 'priority',
    getPriorities: baseURL + 'priority/GetPriorities',
    getPrioritiesSortedByName: baseURL + 'priority/GetPrioritiesSortedByName',
    createPriority: baseURL + 'priority',
    updatePriority: baseURL + 'priority',
    deletePriorityById: baseURL + 'priority',
}

export const statusEndpoints = {
    getStatusById: baseURL + 'status',
    getStatuses: baseURL + 'status/GetStatuses',
    getStatusesSortedByName: baseURL + 'status/GetStatusesSortedByName',
    createStatus: baseURL + 'status',
    updateStatus: baseURL + 'status',
    deleteStatusById: baseURL + 'status',
}

export const tagEndpoints = {
    getTagById: baseURL + 'tag',
    getTags: baseURL + 'tag/GetTags',
    getTagsSortedByName: baseURL + 'tag/GetTagsSortedByName',
    createTag: baseURL + 'tag',
    updateTag: baseURL + 'tag',
    deleteTagById: baseURL + 'tag',
}