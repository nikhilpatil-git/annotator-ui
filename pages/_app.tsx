import {
  Flex,
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
} from "@chakra-ui/core";

import Head from "next/head";
import { Box, SimpleGrid } from "@chakra-ui/core";
import { Layout } from "../components/Layout";

import { Global, css } from "@emotion/core";

import "../styles.css";

import { theme } from "@chakra-ui/core";
import { FunctionComponent } from "react";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    primary: {
      lightGreen: "#20c589",
      green: "#1EB980",
      darkGreen: "#045D56",
    },
    secondry: {
      orange: "#FF6859",
      yellow: "#FFCF44",
      purple: "#583fcf",
      purpleLight: "#5f47d1",
      blue: "#72DEFF",
      gray: "#8c8c8c",
      grayLight: "#a7a5a6",
    },
  },
};

import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider value="dark">
        <CSSReset />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default MyApp;
