// pages/_app.js
import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Inter } from '@next/font/google';

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { Footer } from "../components/Footer";

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
    reg: "#16171c",
  },
};

const nextFont = Inter({
  weight: ['300'],
  subsets: ['latin'],
});

const nextFontBold = Inter({
  weight: ['400'],
  subsets: ['latin'],
});

const theme = extendTheme({
  colors: colors,
  styles: {
    global: {
      body: {
        bg: "#161b21",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: colors.white.reg,
      },
    },
    Heading: {
      baseStyle: {
        color: colors.white.reg,
      },
    },
    Button: {
      baseStyle: {
      },
    },
  },
  fonts: {
    // heading: nextFont.style.fontFamily,
    // body: nextFont.style.fontFamily,
  },
});

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <main>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </ChakraProvider>
    </main>
  );
}

export default MyApp;
