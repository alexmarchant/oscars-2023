import React, { useState } from 'react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'
import styled from 'styled-components'
import IEWindow from './IEWindow'
import StartMenu from './StartMenu'
import BallotSite from './BallotSite'
import LeaderboardSite from './LeaderboardSite'
import { useBallotStore } from '../stores/ballot'
import { useAuthStore } from '../stores/auth'
import { Explorer100 } from '@react95/icons'
import { MobileBreak } from '../helpers'

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
  position: relative;
`

const IEWindowContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`

const PoolWindowContainer = styled(IEWindowContainer)`
  padding: 50px 80px 80px 50px;

  @media (max-width: ${MobileBreak}) {
    padding: 0;
  }
`

const LeaderboardWindowContainer = styled(IEWindowContainer)`
  padding: 80px 50px 50px 80px;

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
  const session = useAuthStore(state => state.session)
  const loadingSession = useAuthStore(state => state.loading)
  const navigate = useNavigate()
  const [activeWindow, setActiveWindow] = useState('Oscar Pool')

  // Handle logout
  if (!session && !loadingSession) {
    navigate('/login')
  }

  return (
    <Container>
      <Content>
        <DesktopIcon>
          <Explorer100 style={{ marginBottom: 5, width: 45, height: 45 }}/>
          <span>
            My Computer
          </span>
        </DesktopIcon>
        <PoolWindowContainer
          style={{ zIndex: activeWindow === 'Oscar Pool' ? 1000 : 1 }}
        >
          <StyledIEWindow
            header="Oscar Pool"
            url="https://oscars.alexmarchant.com/ballot"
            onClick={() => setActiveWindow('Oscar Pool')}
          >
            <BallotSite />
          </StyledIEWindow>
        </PoolWindowContainer>
        <LeaderboardWindowContainer
          style={{ zIndex: activeWindow === 'Leaderboard' ? 1000 : 1 }}
        >
          <StyledIEWindow
            header="Leaderboard"
            url="https://oscars.alexmarchant.com/leaderboard"
            onClick={() => setActiveWindow('Leaderboard')}
          >
            <LeaderboardSite />
          </StyledIEWindow>
        </LeaderboardWindowContainer>
      </Content>
      <StartMenu
        activeWindow={activeWindow}
        setActiveWindow={(activeWindow: string) => setActiveWindow(activeWindow)}
        style={{ zIndex: 1001 }}
      />
    </Container>
  )
}