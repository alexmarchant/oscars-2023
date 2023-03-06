import React from 'react'
import { useRouteError } from 'react-router-dom'
import Layout from './Layout'
import CenteredWindow from './CenteredWindow'

export default function ErrorPage() {
  const error = useRouteError() as any
  console.error(error)

  return (
    <Layout>
      <CenteredWindow header="Error!">
        <h1>Oops!</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </CenteredWindow>
    </Layout>
  )
}