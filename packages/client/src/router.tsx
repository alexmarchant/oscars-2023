import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import Desktop, { desktopLoader } from './components/Desktop'
import Admin, { adminLoader } from './components/Admin'

export const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Admin />,
    loader: adminLoader,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Desktop />,
        loader: desktopLoader,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot',
        element: <ForgotPassword />,
      },
    ],
  },
])