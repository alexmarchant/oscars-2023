import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import { isTRPCClientError } from '../trpc/client'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import CenteredWindow from './CenteredWindow'
import ErrorMessage from './ErrorMessage'
import { useAuthStore } from '../stores/auth'

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LinkSeparator = styled.span`
  padding: 0 1em;
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin () {
    try {
      await useAuthStore.getState().login({ email, password })
    } catch (e) {
      if (isTRPCClientError(e) && e.data?.code === 'BAD_REQUEST') {
        setError('Sorry, your password was incorrect. Please double-check your password.')
      } else {
        console.error(e)
        setError('Sorry, something went wrong. Try again or contact us.')
      }
    }
  }

  return (
    <CenteredWindow header="Login">
      <GroupBox label="Email">
        <TextInput
          value={email}
          placeholder="bgates@msn.com"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
      </GroupBox>
      <br/>
      <GroupBox label="Password">
        <TextInput
          value={password}
          placeholder="********"
          onChange={event => setPassword(event.target.value)}
          type="password"
          fullWidth
        />
      </GroupBox>
      <br/>
      {error && <>
        <ErrorMessage>
          {error}
        </ErrorMessage>
        <br/>
      </>}
      <ButtonRow>
        <Button primary onClick={handleLogin}>
          Login
        </Button>
        <div>
          <RouterAnchor to="/signup">
            Signup
          </RouterAnchor>
          <LinkSeparator>|</LinkSeparator>
          <RouterAnchor to="/forgot">
            Forgot password
          </RouterAnchor>
        </div>
      </ButtonRow>
    </CenteredWindow>
  )
}
