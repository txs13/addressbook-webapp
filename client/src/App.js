import React from 'react'
import {createTheme, CssBaseline} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import AppLayout from './Components/AppLayout'

const theme = createTheme()

const App = () => {

    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppLayout />
        </ThemeProvider>
    )
}

export default App