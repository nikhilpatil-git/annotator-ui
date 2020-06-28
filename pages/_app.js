import {
  Flex,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
} from "@chakra-ui/core";

import {
  Global,
  css
} from "@emotion/core";

import '../styles.css'

export default ({
  Component,
  pageProps
}) => ( <
  ThemeProvider >
  <
  ColorModeProvider value = "dark" >
  <
  CSSReset / >
  <
  Global styles = {
    css `
            #__next {
              height: 100%;
            }
          `
  }
  /> <
  Flex w = "100%"
  h = "100%" >
  <
  Component {
    ...pageProps
  }
  /> < /
  Flex > <
  /ColorModeProvider> < /
  ThemeProvider >
);