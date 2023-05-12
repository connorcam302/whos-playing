import { Box, Button, Center, Select, Stack, Text, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar";
import PageButtons from "@/components/PageButtons";
import { useRouter } from "next/router";
import Statbox from "@/components/Statbox";
import { Helmet } from "react-helmet";
import { useSyncExternalStore } from "react";

export default function HomePage() {
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }
  var width = useWindowSize().width

  if (width >= 1100) {
    return (
      <>
        <Helmet>
          <title>Who&apos;s Playing</title>
        </Helmet>
          <Center margin={5}>
            <Wrap>
            <GetMatchHelper playerid='all' pageNumber='0' />
              <Stack w={430}>
                <Statbox type='player' days='14' limit="10" title='Player Stats' />
                <Statbox type='hero' days='14' limit="10" title='Hero Stats'/>
              </Stack>
            </Wrap>
          </Center>
         
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Who&apos;s Playing</title>
        </Helmet>
          <Center margin={5}>
            <Wrap>
              <Statbox type='player' days='14' limit="10"  title='Player Stats' />
              <Statbox type='hero' days='14' limit="10"  title='Hero Stats'/>
            </Wrap>
          </Center>
          <GetMatchHelper playerid='all' pageNumber='0' card='true' />
      </>
    );
  }
}
