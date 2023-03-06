import React from 'react'
import OscarData from '../data/oscars.json'

interface Props {
  category: typeof OscarData['categories'][number]
  className?: string
}

export default function Category(props: Props) {
  const Nominees = props.category.nominees.map(nominee => (
    <li key={nominee.name}>{nominee.name}</li>
  ))

  return (
    <div className={props.className}>
      <h1>{props.category.name}</h1>
      <ul>
        {Nominees}
      </ul>
    </div>
  )
}