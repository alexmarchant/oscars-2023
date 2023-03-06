import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import AuthWindow from './CenteredWindow'
import { LoginSchema } from '../../../shared/src'

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LinkSeparator = styled.span`
  padding: 0 1em;
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.7em;
`

export default function Login() {
  const [ email, setEmail ] = useState('')

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
