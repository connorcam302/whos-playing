// pages/_app.js
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  blue: {
    reg: "#212333",
    light: "#33364f",
    lighter: "#3e4261",
  },
  grey: {
    reg: "#8d99ae",
  },
  white: {
    reg: "#edf2f4",
  },
  red: {
    reg: "#8d99ae",
  },
  background: {
    reg: "#16171c"
  }
};

const theme = extendTheme({ colors: colors, 
  styles:{
    global: {
      body: {
        bg: "#16171c"
      }
    }
  },
  components: {
    Text: {
      baseStyle: {
        color: colors.white.reg
      }
    },
    Heading: {
      baseStyle: {
        color: colors.white.reg
      }
    }
  } });

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}

export default MyApp;
