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
import { User1, Computer3, Sndrec3210 } from '@react95/icons'
import { useAuthStore } from '../stores/auth'
import format from 'date-fns/format'

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

export default function StartMenu() {
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
    <StyledAppBar position="relative">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ fontWeight: 'bold' }}
          onClick={handleStartClick}
        >
          <User1 variant="22x22_4" />
          &nbsp;
          Start
        </Button>
        <Frame variant="status" style={{ height: '100%', display: 'flex', alignItems: 'center', fontSize: 14, padding: '0 15px 0 4px' }}>
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