import Statbox from "../components/Statbox";
import { Center, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function MatchPage() {
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
  var width = useWindowSize().width;

  if (width >= 1100) {
    return (
      <>
        <Helmet>
          <title>Who&apos;s Playing</title>
        </Helmet>
        <Center margin={5}>
          <Wrap>
            <Statbox type='player' days='50' limit='999' title='Player Stats' />
            <Statbox type='hero' days='50' limit='999' title='Hero Stats' />
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
            <Statbox type='player' days='50' limit='999' title='Player Stats' />
            <Statbox type='hero' days='50' limit='999' title='Hero Stats' />
          </Wrap>
        </Center>
      </>
    );
  }
}
