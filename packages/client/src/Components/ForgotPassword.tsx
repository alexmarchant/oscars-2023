import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import AuthWindow from './CenteredWindow'
import { useRedirectIfSession } from '../hooks/useRedirectIfSession'

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LinkSeparator = styled.span`
  padding: 0 1em;
`

export default function Login() {
  const [ email, setEmail ] = useState('')

  useRedirectIfSession()

  function resetPassword() {
    console.error('TODO')
  }

  return (
    <AuthWindow header="Forgot password">
      <GroupBox label="Email">
        <TextInput
          value={email}
          placeholder="bgates@msn.com"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
      </GroupBox>
      <br/>
      <ButtonRow>
        <Button primary onClick={resetPassword}>
          Reset password
        </Button>
        <div>
          <RouterAnchor to="/signup">
            Signup
          </RouterAnchor>
          <LinkSeparator>|</LinkSeparator>
          <RouterAnchor to="/login">
            Login
          </RouterAnchor>
        </div>
      </ButtonRow>
    </AuthWindow>
  )
}
