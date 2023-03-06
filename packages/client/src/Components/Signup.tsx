import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
  Anchor,
} from 'react95'
import styled from 'styled-components'
import CentererWindow from './CenteredWindow'

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
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('')

  return (
    <CentererWindow header="Signup">
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
        <Button primary>
          Signup
        </Button>
        <div>
          <Anchor href="/login">
            Login
          </Anchor>
          <LinkSeparator>|</LinkSeparator>
          <Anchor href="/forgot-password">
            Forgot password
          </Anchor>
        </div>
      </ButtonRow>
    </CentererWindow>
  )
}
