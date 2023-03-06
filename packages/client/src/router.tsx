import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'
import Layout from './Components/Layout'
import ErrorPage from './Components/ErrorPage'
import Login from './Components/Login'
import Signup from './Components/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
])