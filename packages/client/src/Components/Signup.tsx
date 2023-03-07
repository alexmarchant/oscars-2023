import React, { useState } from 'react'
import {
  GroupBox,
  TextInput,
  Button,
} from 'react95'
import RouterAnchor from './RouterAnchor'
import styled from 'styled-components'
import CentererWindow from './CenteredWindow'
import ErrorMessage from './ErrorMessage'
import { useAuthStore } from '../stores/auth'
import { useRedirectIfSession } from '../hooks/useRedirectIfSession'
import { SignupSchema } from '@am-oscar-2023/shared'

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const signupError = useAuthStore(state => state.error)
  const signup = useAuthStore(state => state.signup)

  useRedirectIfSession()

  async function handleSignup() {
    setValidationErrors({})
    const result = SignupSchema.safeParse({
      email,
      username,
      password,
      passwordConfirmation,
    })
    if (!result.success) {
      const errorMap: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        errorMap[key] = issue.message
      }
      setValidationErrors(errorMap)
      return
    }
    if (password !== passwordConfirmation) {
      setValidationErrors({ passwordConfirmation: 'Passwords do not match' })
      return
    }
    await signup({
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
        {validationErrors.email && <>
          <ErrorMessage>
            {validationErrors.email}
          </ErrorMessage>
        </>}
      </GroupBox>
      <br/>
      <GroupBox label="Username">
        <TextInput
          value={username}
          placeholder="dollar_bill"
          onChange={event => setUsername(event.target.value)}
          fullWidth
        />
        {validationErrors.username && <>
          <ErrorMessage>
            {validationErrors.username}
          </ErrorMessage>
        </>}
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
        {validationErrors.password && <>
          <ErrorMessage>
            {validationErrors.password}
          </ErrorMessage>
        </>}
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
        {validationErrors.passwordConfirmation && <>
          <ErrorMessage>
            {validationErrors.passwordConfirmation}
          </ErrorMessage>
        </>}
      </GroupBox>
      <br/>
      {signupError && <>
        <ErrorMessage>
          {signupError}
        </ErrorMessage>
        <br/>
      </>}
      <ButtonRow>
        <Button primary onClick={handleSignup}>
          Signup
        </Button>
        <div>
          <RouterAnchor to="/login">
            Login
          </RouterAnchor>
          {/* <LinkSeparator>|</LinkSeparator>
          <RouterAnchor to="/forgot">
            Forgot password
          </RouterAnchor> */}
        </div>
      </ButtonRow>
    </CentererWindow>
  )
}
