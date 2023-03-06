import React from 'react'
import { useAuthStore } from '../stores/auth'
import { redirect, useLoaderData } from 'react-router-dom'
import { UserSession } from '../trpc/client'
import { AppBar, Toolbar, Button } from 'react95'
import { User1 } from '@react95/icons'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
`

const StyledAppBar = styled(AppBar)`
  flex-grow: 0;
  flex-shrink: 0;
`


interface LoaderData {
  session: UserSession
}

export async function loader(): Promise<LoaderData | Response> {
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
  const { session } = useLoaderData() as LoaderData

  return (
    <Container>
      <Content>
        <h1>Ballot</h1>
        <p>Hi {session.username}</p>
      </Content>
      <StyledAppBar position="relative">
        <Toolbar noPadding={true}>
          <Button
            style={{ fontWeight: 'bold' }}
          >
            <User1 variant="22x22_4" />
            &nbsp;
            Start
          </Button>
        </Toolbar>
      </StyledAppBar>
    </Container>
  )
}