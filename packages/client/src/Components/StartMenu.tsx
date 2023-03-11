import React, { useState, useEffect} from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuListItem,
  Frame,
} from 'react95'
import styled from 'styled-components'
import { User1, Computer3, Sndrec3210, Mshtml32528 } from '@react95/icons'
import { useAuthStore } from '../stores/auth'
import format from 'date-fns/format'
import { MobileBreak } from '../helpers'

const StyledAppBar = styled(AppBar)`
  flex-grow: 0;
  flex-shrink: 0;
`

const StartMenuItem = styled(MenuListItem)`
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
`

const AppButton = styled(Button)`
  font-weight: 'bold';
  margin-left: 5px;
  flex-shrink: 1;
  flex-grow: 0;
  width: 200px;
  justify-content: flex-start;

  @media (max-width: ${MobileBreak}) {
    width: auto;
  }
`

interface Props {
  activeWindow: string
  setActiveWindow: (activeWindow: string) => void
  style?: React.CSSProperties
}

export default function StartMenu(props: Props) {
  const [appBarMenuOpen, setAppBarMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const [timeInterval, setTimeInterval] = useState<any>(null)
  const logout = useAuthStore(state => state.logout)

  function handleWindowClick() {
    setAppBarMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick)
    return () => { window.removeEventListener('click', handleWindowClick) }
  }, [])

  useEffect(() => {
    if (timeInterval) return

    setTimeInterval(setInterval(() => {
      setTime(new Date())
    }, 1000))

    return () => clearInterval(timeInterval)
  }, [timeInterval])

  function handleStartClick(e: React.MouseEvent) {
    e.stopPropagation()
    setAppBarMenuOpen(true)
  }

  function handleLogoutClick(e: React.MouseEvent) {
    e.stopPropagation()
    logout()
    setAppBarMenuOpen(false)
  }

  const formattedTime = format(time, 'h:mm aa')

  return (
    <StyledAppBar position="relative" style={props.style}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexShrink: 1, flexGrow: 0 }}>
          <Button
            style={{ fontWeight: 'bold', flexShrink: 0, flexGrow: 0 }}
            onClick={handleStartClick}
          >
            <User1 variant="22x22_4" />
            &nbsp;
            Start
          </Button>
          <AppButton
            active={props.activeWindow === 'Oscar Pool'}
            onClick={() => props.setActiveWindow('Oscar Pool')}
          >
            <Mshtml32528 className="hidden-mobile" variant="16x16_4" />
            &nbsp;
            <span className="hidden-mobile">
              Oscar&nbsp;
            </span>
            Pool
          </AppButton>
          <AppButton
            active={props.activeWindow === 'Leaderboard'}
            onClick={() => props.setActiveWindow('Leaderboard')}
          >
            <Mshtml32528 className="hidden-mobile" variant="16x16_4" />
            &nbsp;
            Leaderboard
          </AppButton>
        </div>
        <Frame variant="status" style={{ height: '100%', display: 'flex', alignItems: 'center', fontSize: 14, padding: '0 12px 0 6px', flexShrink: 0, flexGrow: 0 }}>
          <Sndrec3210 variant="16x16_4" style={{ marginRight: 10 }} />
          {formattedTime}
        </Frame>
      </Toolbar>
      {appBarMenuOpen && (
        <MenuList
          style={{
            position: 'absolute',
            left: '-1px',
            bottom: 'calc(100% + 2px)',
            width: 250,
          }}
        >
          <StartMenuItem
            onClick={handleLogoutClick}
          >
            <Computer3 variant="32x32_4" style={{ marginRight: 15 }} />
            Logout
          </StartMenuItem>
        </MenuList>
      )}
    </StyledAppBar>
  )
}