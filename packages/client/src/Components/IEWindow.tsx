import React from 'react'
import {
  Window,
  WindowHeader,
  Frame,
} from 'react95'
import { Mshtml32528, Mshtml32547 } from '@react95/icons'
import styled from 'styled-components'

const FramePadding = 3

const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  margin-top: ${FramePadding}px;
  margin-bottom: ${FramePadding}px;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
`

const ContentFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.material};
`

const Footer = styled.div`
  width: 100%;
  display: flex;
`

const FooterFrame = styled(Frame)`
  display: flex;
  align-items: center;

  & + & {
    margin-left: ${FramePadding}px;
  }
`

interface Props {
  className?: string
}

export default function IEWindow(props: React.PropsWithChildren<Props>) {
  return (
      <StyledWindow className={props.className}>
        <WindowHeader>
          <Mshtml32528 variant="16x16_4" />
          &nbsp;
          Microsoft Internet Explorer
        </WindowHeader>
        <Content>
          <ContentFrame variant="field">
            { props.children }
          </ContentFrame>
        </Content>
        <Footer>
          <FooterFrame variant="well" style={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
            &nbsp;
          </FooterFrame>
          <FooterFrame variant="well" style={{ flexGrow: 0, flexShrink: 0, width: 200 }}>
            &nbsp;
          </FooterFrame>
          <FooterFrame variant="well" style={{ flexGrow: 0, flexShrink: 0, width: 100 }}>
            <Mshtml32547 variant="16x16_4" width="20" height="20" style={{ marginLeft: 7 }}/>
          </FooterFrame>
        </Footer>
      </StyledWindow>
  )
}