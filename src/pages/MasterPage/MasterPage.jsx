import './MasterPage.scss'
import React from 'react'
import SideNav from '../../components/SideNav/SideNav'
import TodoPage from '../TodoPage/TodoPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})

const MasterPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="masterpage-container">
                <SideNav />
                <TodoPage />
            </div>
        </QueryClientProvider>
    )
}

export default MasterPage