import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import Ballot from './components/Ballot'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Ballot />,
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