import React from 'react'
import { OscarData } from '../data/oscars'
import Category from './Category'
import styled from 'styled-components'
import oscarStatue from '../assets/oscar-small.gif'

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

export default function Form(props: { className?: string }) {
  const Categories = OscarData.categories.map(category => (
    <div key={category.name}>
      <StyledCategory category={category} />
      <hr/>
    </div>
  ))

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
    </Container>
  )
}