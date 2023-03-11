import React, { useEffect } from 'react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'
import styled from 'styled-components'
import IEWindow from './IEWindow'
import StartMenu from './StartMenu'
import Website from './Website'
import { useBallotStore } from '../stores/ballot'
import { useAuthStore } from '../stores/auth'
import { Explorer100 } from '@react95/icons'
import { MobileBreak } from './helpers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  min-height: 0;
`

const IEWindowContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  @media (max-width: ${MobileBreak}) {
    padding: 0;
  }
`

const StyledIEWindow = styled(IEWindow)`
  max-width: 1000px;
`

const DesktopIcon = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: 16px;
`

export async function desktopLoader() {
  // Make sure they are logged in, or else redirect
  let session = useAuthStore.getState().session 
  if (!session) {
    session = await useAuthStore.getState().getSession() 
    if (!session){
      return redirect('/signup')
    }
  }
  // Load the ballot
  await useBallotStore.getState().getBallot()
  return null
}

export default function Desktop () {
  useLoaderData()
  const loadingBallot = useBallotStore(state => state.loading)
  const session = useAuthStore(state => state.session)
  const loadingSession = useAuthStore(state => state.loading)
  const navigate = useNavigate()

  // Handle logout
  useEffect(() => {
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

  return (
    <Container>
      <Content>
        <DesktopIcon>
          <Explorer100 style={{ marginBottom: 5, width: 45, height: 45 }}/>
          <span>
            My Computer
          </span>
        </DesktopIcon>
        <IEWindowContainer>
          <StyledIEWindow header="Oscar Pool">
            {!loadingBallot && 
              <Website />
            }
          </StyledIEWindow>
        </IEWindowContainer>

      </Content>
      <StartMenu />
    </Container>
  )
}