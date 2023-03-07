import React, { useState, useEffect } from 'react'
import { OscarData } from '../data/oscars'
import Category from './Category'
import styled from 'styled-components'
import oscarStatue from '../assets/oscar-small.gif'
import { Button, ProgressBar } from 'react95'
import { useBallotStore } from '../stores/ballot'

const Container = styled.div`
  padding: 1em 1.3em;
  font-family: ms_serif;
`

const Header = styled.h1`
  font-size: 30px;
  text-align: center;
  text-decoration: underline;
`

const SubHeader = styled.p`
  text-align: center;
  margin-bottom: 2em;
`

const StyledCategory = styled(Category)`
  margin-top: 1em;
  margin-bottom: 3em;
`

const OscarImage = styled.img`
  height: 80px;
  margin: 0 30px;
`

const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const SaveRow = styled.div`
  display: flex;
`

export default function Website(props: { className?: string }) {
  const [timer, setTimer] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [saveProgress, setSaveProgress] = useState<number>(0)
  const ballot = useBallotStore(state => state.ballot)

  const Categories = OscarData.categories.map(category => (
    <div key={category.name}>
      <StyledCategory category={category} />
      <hr/>
    </div>
  ))

  function handleSave() {
    setSaving(true)
  }

  // Increment progress
  useEffect(() => {
    if (saving && !timer) {
      setTimer(setInterval(() => {
        setSaveProgress(previousPercent => {
          if (previousPercent === 100) return previousPercent
          const diff = Math.random() * 10
          const result = Math.min(previousPercent + diff, 100)
          return result
        })
      }, 200))
    }
    console.log('saving changed', saving)
  }, [saving, timer])

  // Reset the timer when reaches 100
  useEffect(() => {
    if (saveProgress === 100) {
      clearInterval(timer)
      setTimer(null)
      setSaveProgress(0)
      setSaving(false)
    }
  }, [saveProgress, timer])

  const savedCategories = Object.keys(ballot).length
  const totalCategories = OscarData.categories.length

  return (
    <Container>
      <HeaderRow>
        <OscarImage src={oscarStatue} />
        <div>
          <Header>
            Welcome to the 1995 Oscar Pool!
          </Header>
          <SubHeader>Please make your picks below</SubHeader>
        </div>
        <OscarImage src={oscarStatue} />
      </HeaderRow>
      <hr/>
      {Categories}
      <h3>Important notes:</h3>
      <ul>
        <li>- We will lock the ballot 1 hour before the start of the event.</li>
        <li>- Please make sure to send $10 to @amarchant on venmo before the start of the event.</li>
        <li>- If you load this page during the event you will be able to see a live leaderboard (unless I get too busy to build that lol).</li>
      </ul>
      <hr/>
      <SaveRow>
        <Button
          style={{ fontFamily: 'ms_sans_serif', marginBottom: 5 }}
          primary
          disabled={saving}
          onClick={handleSave}
        >
          Save
        </Button>
        {saving && 
          <ProgressBar
            variant='tile'
            value={Math.floor(saveProgress)}
            style={{ marginLeft: 10 }}
          />
        }
      </SaveRow>
      <p>
        {savedCategories} of {totalCategories} categories have been saved to the database.
      </p>
    </Container>
  )
}