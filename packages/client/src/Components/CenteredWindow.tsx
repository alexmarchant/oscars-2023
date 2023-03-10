import React from 'react'
import styled from 'styled-components'
import {
  Window,
  WindowHeader,
  WindowContent,
} from 'react95'
import { MobileBreak } from '../helpers'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${MobileBreak}) {
    padding: 20px;
  }
`

const StyledWindow = styled(Window)`
  width: 500px;
`

export interface Props {
  header: string
}

export default function CenteredWindow (props: React.PropsWithChildren<Props>) {
  return (
    <Container>
      <StyledWindow>
        <WindowHeader>
          <span>{props.header}</span>
        </WindowHeader>
        <WindowContent>
          { props.children }
        </WindowContent>
      </StyledWindow>
    </Container>
  )
}