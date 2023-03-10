import React from 'react'
import { Category as ICategory, Nominee } from '../data/oscars'
import styled from 'styled-components'
import { Anchor, Radio } from 'react95'
import { useBallotStore } from '../stores/ballot'
import { shallow } from 'zustand/shallow'
import { MobileBreak } from '../helpers'
import { CategoryPoints } from '@am-oscar-2023/shared'

const Content = styled.div`
  display: flex;

  @media (max-width: ${MobileBreak}) {
    flex-direction: column;
  }
`

const NomineesSection = styled.div`
  width: 50%;
  padding-right: 5px;
  box-sizing: border-box;

  @media (max-width: ${MobileBreak}) {
    width: 100%;
    padding: 0;
    margin-bottom: 1em;
  }
`

const ImageSection = styled.div`
  width: 50%;
  padding-left: 5px;
  box-sizing: border-box;

  @media (max-width: ${MobileBreak}) {
    width: 100%;
    padding: 0;
  }
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
  line-height: 1.5em;
  margin-bottom: 0.5em;
`

const NomineeImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 350px;
  max-width: 400px;
  object-fit: contain;

  @media (max-width: ${MobileBreak}) {
    max-height: 200px;
    max-width: 100%;
  }
`

interface Props {
  category: ICategory
  locked: boolean
  className?: string
  winner?: string
}

export default function Category(props: Props) {
  const firstNominee = props.category.nominees[0]
  const defaultImageURL = firstNominee.image?.newURL

  const { pick, setPick } = useBallotStore(
    state => ({
      pick: state.ballot[props.category.name] as string | undefined,
      setPick: state.setPick,
    }),
    shallow
  )

  const selectedNominee = props.category.nominees.find(nom => nom.name === pick)
  const imageURL = selectedNominee?.image?.newURL ? selectedNominee.image.newURL : defaultImageURL

  function handleNomineeClick(nominee: Nominee, event?: React.MouseEvent<HTMLAnchorElement>) {
    event?.preventDefault()
    setPick(props.category.name, nominee.name)
  }

  const Nominees = props.category.nominees.map(nominee => (
    <NomineeItem key={nominee.name}>
      {props.locked && <span>
        {nominee.name === selectedNominee?.name && <span style={{ color: 'red' }}>
          [Your Pick]&nbsp;
        </span>}
        {nominee.name === props.winner && <span style={{ color: 'green' }}>
          [Winner]&nbsp;
        </span>}
        {nominee.name}
        {nominee.movie && ` [${nominee.movie}]`}
      </span>}
      {!props.locked && <>
        <StyledRadio
          checked={nominee.name === selectedNominee?.name}
          onChange={() => handleNomineeClick(nominee)}
        />
        <StyledAnchor
          onClick={(e) => handleNomineeClick(nominee, e)}
          href="http://nimrod313.myspace.com"
        >
          {nominee.name}
          {nominee.movie && ` [${nominee.movie}]`}
        </StyledAnchor>
      </>}
    </NomineeItem>
  ))

  return (
    <div className={props.className}>
      <Content>
        <NomineesSection>
          <h2>{props.category.name} [{CategoryPoints[props.category.name]} Points]</h2>
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