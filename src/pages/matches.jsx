import { Box, Button, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar";
import PageButtons from "@/components/PageButtons";
import { useRouter } from "next/router";
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

  return (
    <>
      <Helmet>
        <title>Matches</title>
      </Helmet>
      <Navbar>
        <BrowserView>
          <GetMatchHelper key={page} playerid='all' pageNumber={page} />
          <PageButtons increase={increasePage} decrease={decreasePage} />
        </BrowserView>
        <MobileView>
          <GetMatchHelper playerid='all' card='true' />
        </MobileView>
      </Navbar>
    </>
  );
}
