// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  blue: {
    reg: '#2b2d42',
    light: '#33364f',
    lighter: '#3e4261',
  },
  grey:{
    reg: '#8d99ae'
  },
  white:{
    reg: '#edf2f4'
  },
  red:{
    reg: '#8d99ae'
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp