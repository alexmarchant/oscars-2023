import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { styleReset } from 'react95'
import original from 'react95/dist/themes/original'
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2'
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2'
import ms_serif from '../assets/pixelated-times-new-roman.woff2'
import { Outlet } from 'react-router-dom'
import '@react95/icons/icons.css'

const GlobalStyles = createGlobalStyle`
  ${styleReset}

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }

  @font-face {
    font-family: 'ms_serif';
    src: url('${ms_serif}') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  h1 {
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: .3em;
  }

  h2 {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: .2em;
  }

  h3 {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: .1em;
  }

  body {
    font-family: 'ms_sans_serif';
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${original.desktopBackground};
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function Layout(props: React.PropsWithChildren) {
  return (
    <Container>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Outlet />
        {props.children}
      </ThemeProvider>
    </Container>
  )
}