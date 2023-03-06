import React from 'react'
import OscarData from '../data/oscars.json'
import Category from './Category'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1em 1.3em;
`

const StyledCategory = styled(Category)`
  margin-bottom: 1em;
`

export default function Form(props: { className?: string }) {
  const Categories = OscarData.categories.map(category => (
    <StyledCategory key={category.name} category={category} />
  ))

  return (
    <Container>
      {Categories}
    </Container>
  )
}