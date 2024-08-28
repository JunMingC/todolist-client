import '../styles/main.scss'
import '../styles/theme.scss'

import React from 'react'
import MasterPage from '../pages/MasterPage/MasterPage'
import { useScreenSizeClass } from '../hooks/useScreenSizeClass'

function App() {
    useScreenSizeClass()

    return <MasterPage />
}

export default App
