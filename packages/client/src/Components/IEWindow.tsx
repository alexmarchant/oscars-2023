import React from 'react'
import {
  Window,
  WindowContent,
  WindowHeader,
  Frame,
  ScrollView,
  Button,
  Toolbar,
  Separator,
} from 'react95'
import {
  Mshtml32528,
  Mshtml32547,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  Dpmodemx701,
  Printer,
  Copy,
  Cut,
} from '@react95/icons'
import styled from 'styled-components'
import windows95Image from '../assets/windows95.png'

const FramePadding = 3

const StyledWindow = styled(Window)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledWindowContent = styled(WindowContent)`
  min-height: 0;
  margin-top: ${FramePadding}px;
  margin-bottom: ${FramePadding}px;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0;
`

const StyledScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
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

const CloseIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: -1px;
  margin-top: -1px;
  transform: rotateZ(45deg);
  position: relative;
  &:before,
  &:after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.materialText};
  }
  &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
  }
  &:after {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`

interface Props {
  header: string
  className?: string
}

export default function IEWindow(props: React.PropsWithChildren<Props>) {
  return (
      <StyledWindow className={props.className}>
        <WindowHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Mshtml32528 variant="16x16_4" />
            &nbsp;
            Internet Explorer -
            &nbsp;
            {props.header}
          </div>
          <Button
            style={{ height: 'calc(100% - 4px)', margin: '2px 0' }}
            disabled={true}
          >
            <CloseIcon style={{ opacity: 0.4 }} />
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button variant="menu" size="sm">
            <u>F</u>ile
          </Button>
          <Button variant="menu" size="sm">
            <u>E</u>dit
          </Button>
          <Button variant="menu" size="sm">
            <u>V</u>iew
          </Button>
          <Button variant="menu" size="sm">
            F<u>a</u>vorites
          </Button>
          <Button variant="menu" size="sm">
            H<u>e</u>lp
          </Button>
        </Toolbar>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1, flexShrink: 1 }}>
            <Separator />
            <Toolbar>
              <Button>
                <FolderOpen variant="16x16_4" />
              </Button>
              <Button>
                <Dpmodemx701 variant="16x16_4" />
              </Button>
              <Button>
                <Printer variant="16x16_4" />
              </Button>
              <Button style={{ marginLeft: 5 }}>
                <ArrowLeft variant="32x32_4" />
              </Button>
              <Button>
                <ArrowRight variant="32x32_4" />
              </Button>
              <Button style={{ marginLeft: 5 }}>
                <Copy variant="16x16_4" />
              </Button>
              <Button>
                <Cut variant="16x16_4" />
              </Button>
            </Toolbar>
            <Separator />
            <Toolbar style={{ paddingBottom: 0 }}>
              Address:
              <Frame variant="field" style={{ width: '100%', marginLeft: 3 }}>
                <div style={{ padding: '3px 8px 1px' }}>
                  https://oscars.alexmarchant.com
                </div>
              </Frame>
            </Toolbar>
          </div>
          <Frame variant="field">
            <img
              src={windows95Image}
              style={{
                flexGrow: 0,
                flexShrink: 0,
                height: '100%',
                padding: 2,
                boxSizing: 'border-box',
              }}
            />
          </Frame>
        </div>
        <StyledWindowContent>
          <StyledScrollView>
            { props.children }
          </StyledScrollView>
        </StyledWindowContent>
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