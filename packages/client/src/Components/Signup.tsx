import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
  Separator,
  Anchor
} from 'react95'
import styled from 'styled-components'
import AuthWindow from './CenteredWindow'

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
  const [ password, setPassword ] = useState('')

  return (
    <AuthWindow header="Login">
      <GroupBox label="Email address">
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
      <ButtonRow>
        <Button primary>
          Login
        </Button>
        <div>
          <Anchor href="/signup">
            Signup
          </Anchor>
          <LinkSeparator>|</LinkSeparator>
          <Anchor href="/forgot-password">
            Forgot password
          </Anchor>
        </div>
      </ButtonRow>
    </AuthWindow>
  )
}
