import React from 'react'
import styled from 'styled-components'
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
} from 'react95'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Toolbar>
          <Button variant='menu' size='sm'>
            File
          </Button>
          <Button variant='menu' size='sm'>
            Edit
          </Button>
          <Button variant='menu' size='sm' disabled>
            Save
          </Button>
        </Toolbar>
        <WindowContent>
          { props.children }
        </WindowContent>
      </StyledWindow>
    </Container>
  )
}