import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import CentererWindow from './CenteredWindow'
import { useAuthStore } from '../stores/auth'
import { useRedirectIfSession } from '../hooks/useRedirectIfSession'

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LinkSeparator = styled.span`
  padding: 0 1em;
`

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  useRedirectIfSession()

  async function handleSignup() {
    await useAuthStore.getState().signup({
      email,
      username,
      password,
      passwordConfirmation,
    })
  }

  return (
    <CentererWindow header="Signup">
      <GroupBox label="Email">
        <TextInput
          value={email}
          placeholder="bgates@msn.com"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
      </GroupBox>
      <br/>
      <GroupBox label="Username">
        <TextInput
          value={username}
          placeholder="dollar_bill"
          onChange={event => setUsername(event.target.value)}
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
      <GroupBox label="Password confirmation">
        <TextInput
          value={passwordConfirmation}
          placeholder="********"
          onChange={event => setPasswordConfirmation(event.target.value)}
          type="password"
          fullWidth
        />
      </GroupBox>
      <br/>
      <ButtonRow>
        <Button primary onClick={handleSignup}>
          Signup
        </Button>
        <div>
          <RouterAnchor to="/login">
            Login
          </RouterAnchor>
          <LinkSeparator>|</LinkSeparator>
          <RouterAnchor to="/forgot">
            Forgot password
          </RouterAnchor>
        </div>
      </ButtonRow>
    </CentererWindow>
  )
}
