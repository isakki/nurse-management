import { RouterProvider } from 'react-router-dom'
import { isAdmin, isAuthenticated } from './utils/validations/authValidation'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from './contexts/ThemeContext'
import './assets/styles/themes.css'

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={AppRoutes()} />
    </ThemeProvider>
  )
}

export default App