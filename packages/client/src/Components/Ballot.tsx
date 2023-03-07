import React, { useState, useEffect } from 'react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'
import { User1 } from '@react95/icons'
import styled from 'styled-components'
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuListItem,
} from 'react95'
import { Computer3 } from '@react95/icons'
import IEWindow from './IEWindow'
import Website from './Website'
import { useBallotStore } from '../stores/ballot'
import { useAuthStore } from '../stores/auth'

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

const StartMenuItem = styled(MenuListItem)`
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`

export async function ballotLoader() {
  // Make sure they are logged in, or else redirect
  let session = await useAuthStore.getState().session 
  if (!session) {
    session = await useAuthStore.getState().getSession() 
    if (!session){
      return redirect('/login')
    }
  }
  // Load the ballot
  await useBallotStore.getState().getBallot()
  return null
}

export default function Ballot () {
  useLoaderData()
  const loadingBallot = useBallotStore(state => state.loading)
  const [appBarMenuOpen, setAppBarMenuOpen] = useState(false)
  const session = useAuthStore(state => state.session)
  const logout = useAuthStore(state => state.logout)
  const loadingSession = useAuthStore(state => state.loading)
  const navigate = useNavigate()

  function handleWindowClick() {
    setAppBarMenuOpen(false)
  }

  useEffect(() => {
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    return () => { window.removeEventListener('click', handleWindowClick) }
  }, [])

  function handleStartClick(e: React.MouseEvent) {
    e.stopPropagation()
    setAppBarMenuOpen(true)
  }

  function handleLogoutClick(e: React.MouseEvent) {
    e.stopPropagation()
    logout()
    setAppBarMenuOpen(false)
  }

  return (
    <Container>
      <Content>
        <IEWindowContainer>
          <StyledIEWindow header="Oscar Pool">
            {!loadingBallot && 
              <Website />
            }
          </StyledIEWindow>
        </IEWindowContainer>
      </Content>
      <StyledAppBar position="relative">
        <Toolbar>
          <Button
            style={{ fontWeight: 'bold' }}
            onClick={handleStartClick}
          >
            <User1 variant="22x22_4" />
            &nbsp;
            Start
          </Button>
        </Toolbar>
        {appBarMenuOpen && (
          <MenuList
            style={{
              position: 'absolute',
              left: '-1px',
              bottom: 'calc(100% + 2px)',
              width: 250,
            }}
          >
            <StartMenuItem
              onClick={handleLogoutClick}
            >
              <Computer3 variant="32x32_4" style={{ marginRight: 15 }} />
              Logout
            </StartMenuItem>
          </MenuList>
        )}
      </StyledAppBar>
    </Container>
  )
}