import React, { useState } from 'react'
import { Category as ICategory, Nominee } from '../data/oscars'
import styled from 'styled-components'
import { Anchor, Radio } from 'react95'

interface Props {
  category: ICategory
  className?: string
}

const Content = styled.div`
  display: flex;
`

const ImageSection = styled.div`
  width: 50%;
  padding-left: 5px;
  box-sizing: border-box;
`

const NomineesSection = styled.div`
  width: 50%;
  padding-right: 5px;
  box-sizing: border-box;
`

const StyledAnchor = styled(Anchor)`
  cursor: pointer;
`

const StyledRadio = styled(Radio)`
  margin: 0;

  & input,
  & div[role="presentation"] {
    width: 16px;
    height: 16px;
  }

  & span {
    width: 4px;
    height: 4px;
  }
`

const NomineeItem = styled.div`
  display: flex;
  align-items: center;
  height: 2em;
`

const NomineeImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: contain;
`

export default function Category(props: Props) {
  const firstNominee = props.category.nominees[0]
  const defaultImageURL = firstNominee.image?.newURL

  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null)
  const [imageURL, setImageURL] = useState<string | undefined>(defaultImageURL)

  function handleNomineeClick(nominee: Nominee, event?: React.MouseEvent<HTMLAnchorElement>) {
    event?.preventDefault()
    setSelectedNominee(nominee)
    setImageURL(nominee.image?.newURL)
  }

  const Nominees = props.category.nominees.map(nominee => (
    <NomineeItem key={nominee.name}>
      <StyledRadio
        checked={nominee.name === selectedNominee?.name}
        onChange={() => handleNomineeClick(nominee)}
      />
      <StyledAnchor
        onClick={(e) => handleNomineeClick(nominee, e)}
        href="http://crazytown.com"
      >
        {nominee.name}
      </StyledAnchor>
    </NomineeItem>
  ))

  return (
    <div className={props.className}>
      <Content>
        <NomineesSection>
          <h2>{props.category.name}</h2>
          {Nominees}
        </NomineesSection>
        <ImageSection>
          {imageURL &&
            <NomineeImage src={imageURL} />
          }
        </ImageSection>
      </Content>
    </div>
  )
}