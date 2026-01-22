import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'

import Home from '../pages/user/Home'
import About from '../pages/user/About'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Profile from '../pages/auth/Profile'
import Contact from '../pages/user/Contact'
// import Services from '../pages/user/Services'
import Nurses from '../pages/admin/Nurses'

import PageNotFound from '../components/ui/PageNotFound'
import { isAdmin, isAuthenticated } from '../utils/validations/authValidation'
import PublicHeader from '../layouts/headers/PublicHeader'
import ProtectedHeader from '../layouts/headers/ProtectedHeader'
import AdminHeader from '../layouts/headers/AdminHeader'

// Layout components to include appropriate headers
const PublicLayout = () => (
  <>
    <PublicHeader />
    <Outlet />
  </>
);

const ProtectedLayout = () => (
  <>
    <ProtectedHeader />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <AdminHeader />
    <Outlet />
  </>
);

const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public Routes
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        // { path: 'services', element: <Services /> },
        {
          path: 'login',
          element: isAuthenticated ? <Navigate to='/profile' /> : <Login />,
        },
        {
          path: 'register',
          element: isAuthenticated ? <Navigate to='/profile' /> : <Register />,
        },
      ],
    },

    // Protected Routes
    {
      path: '/',
      element: isAuthenticated ? <ProtectedLayout /> : <Navigate to='/login' />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
        }
      ],
    },

    // Admin Routes
    {
      path: '/admin',
      element: isAdmin ? <AdminLayout /> : <Navigate to='/' />,
      children: [
        { path: '', element: <Nurses /> },        
        { path: 'nurses', element: <Nurses /> },
      ],
    },

    // Not Found Routes
    {
      path: '*',
      element: <PageNotFound />,
    },
  ])

  return router
}

export default AppRoutes