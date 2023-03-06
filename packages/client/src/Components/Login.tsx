import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import AuthWindow from './CenteredWindow'
import { LoginSchema } from '@am-oscar-2023/validation'

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
  const [ password, setPassword ] = useState('')

  const [ emailError, setEmailError ] = useState<null | string>(null)
  const [ passwordError, setPasswordError ] = useState<null | string>(null)

  function handleLogin () {
    resetErrors()

    const { email: cleanedEmail, password: cleanedPassword } = cleanData({ email, password })

    setEmail(cleanedEmail)
    setPassword(cleanedPassword)

    const result = LoginSchema.safeParse({
      email: cleanedEmail,
      password: cleanedPassword,
    })

    if (result.success) {
      console.log('do login')
    } else {
      for (const issue of result.error.issues) {
        if (issue.path[0] === 'email') {
          setEmailError(issue.message)
        }
        if (issue.path[0] === 'password') {
          setPasswordError(issue.message)
        }
      }
    }
  }

  function resetErrors() {
    setEmailError(null)
    setPasswordError(null)
  }

  function cleanData(data: { email: string, password: string }): { email: string, password: string } {
    const { email, password } = data
    return {
      email: email.trim(),
      password: password.trim(),
    }
  }

  return (
    <AuthWindow header="Login">
      <GroupBox label="Email">
        <TextInput
          value={email}
          placeholder="bgates@msn.com"
          onChange={event => setEmail(event.target.value)}
          fullWidth
        />
        {emailError && <ErrorMessage>
          {emailError}
        </ErrorMessage>}
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
        {passwordError && <ErrorMessage>
          {passwordError}
        </ErrorMessage>}
      </GroupBox>
      <br/>
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
    </AuthWindow>
  )
}
