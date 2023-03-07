import React from 'react'
import { Anchor } from 'react95'
import { Link } from 'react-router-dom'

export interface Props {
  to: string
}

const AnchorAny = Anchor as any

export default function RouterAnchor(props: React.PropsWithChildren<Props>) {
  return (
    <AnchorAny to={props.to} as={Link} underline="true">
      {props.children}
    </AnchorAny>
  )
}