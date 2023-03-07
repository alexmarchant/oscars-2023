import React from 'react'
import { useAuthStore } from '../stores/auth'
import { redirect } from 'react-router-dom'
import { UserSession } from '../trpc/client'
import { User1 } from '@react95/icons'
import styled from 'styled-components'
import { AppBar, Toolbar, Button } from 'react95'
import IEWindow from './IEWindow'
import Website from './Website'

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

const IEWindowContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`

const StyledIEWindow = styled(IEWindow)`
  max-width: 1000px;
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
  // const { session } = useLoaderData() as LoaderData

  return (
    <Container>
      <Content>
        <IEWindowContainer>
          <StyledIEWindow header="Oscar Pool">
            <Website />
          </StyledIEWindow>
        </IEWindowContainer>
      </Content>
      <StyledAppBar position="relative">
        <Toolbar>
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