import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'react95'
import { useLeaderboardStore } from '../stores/leaderboard'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1em 1.3em;
  font-family: ms_serif;
`

const Header = styled.h1`
  font-size: 30px;
  text-align: center;
  text-decoration: underline;
`

const StyledTable = styled(Table)`
  font-family: 'ms_sans_serif';
`

export default function LeaderboardSite () {
  const leaderboard = useLeaderboardStore(state => state.leaderboard)
  const getLeaderboard = useLeaderboardStore(state => state.getLeaderboard)

  useEffect(() => {
    const timer = setInterval(() => {
      getLeaderboard()
    }, 5000)
    getLeaderboard()
    return () => { clearInterval(timer) }
  }, [getLeaderboard])

  const sortedUserScores = Object.keys(leaderboard)
    .map(username => {
      const score = leaderboard[username]
      return {
        username,
        score,
      }
    }).sort((a, b) => {
      if (a.score < b.score) return 1
      if (a.score > b.score) return -1
      return 0
    })

  const LeaderboardTableRows = sortedUserScores.map(userData => (
    <TableRow key={userData.username}>
      <TableDataCell>{userData.username}</TableDataCell>
      <TableDataCell>{userData.score}</TableDataCell>
    </TableRow>
  ))

  return (
    <Container>
      <Header>Leaderboard</Header>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Score</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {LeaderboardTableRows}
        </TableBody>
      </StyledTable>
    </Container>
  )
}