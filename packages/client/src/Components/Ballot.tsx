import React from 'react'
import { useAuthStore } from '../stores/auth'
import { UserSession } from '../trpc/client'
import { redirect, useLoaderData } from 'react-router-dom'

export async function loader() {
  // If it already exists use it
  let session = useAuthStore.getState().session
  if (session) return { session }

  // Try to query
  await useAuthStore.getState().getSession()
  session = useAuthStore.getState().session
  if (session) return { session }

  // Redirect if failed
  return redirect('/login')
}

export default function Ballot () {
  const { session } = useLoaderData() as { session: UserSession }

  return (
    <div>
      <h1>Ballot</h1>
      <p>Hi {session.username}</p>
    </div>
  )
}