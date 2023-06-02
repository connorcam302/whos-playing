import GetMatchHelper from "../components/GetMatchHelper";
import PageButtons from "../components/PageButtons";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function MatchPage() {
  const router = useRouter();
  // console.log(router)

  const [page, setPage] = useState(0);

  const increasePage = () => {
    setPage(page + 1);
  };
  const decreasePage = () => {
    if (!page == 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    // console.log(page)
  }, [page]);
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
          <title>Matches</title>
        </Helmet>
        <Box h='3em' />
        <GetMatchHelper key={page} playerid='all' pageNumber={page} />
        <PageButtons increase={increasePage} decrease={decreasePage} />
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Matches</title>
        </Helmet>
        <GetMatchHelper key={page} playerid='all' pageNumber={page} card='true' />
        <PageButtons increase={increasePage} decrease={decreasePage} />
      </>
    );
  }
}
