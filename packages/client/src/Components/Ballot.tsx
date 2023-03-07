import React, { useEffect } from 'react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'
import styled from 'styled-components'
import IEWindow from './IEWindow'
import StartMenu from './StartMenu'
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
  const session = useAuthStore(state => state.session)
  const loadingSession = useAuthStore(state => state.loading)
  const navigate = useNavigate()

  useEffect(() => {
    if (!session && !loadingSession) {
      navigate('/login')
    }
  }, [session, navigate, loadingSession])

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
      <StartMenu />
    </Container>
  )
}