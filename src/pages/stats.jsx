import { Box, Button, Center, Select, Text, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar";
import PageButtons from "@/components/PageButtons";
import { useRouter } from "next/router";
import Statbox from "@/components/Statbox";

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
    <Navbar>
      <BrowserView>
        <Center>
          <Wrap>
            <Statbox type='player' days='50' limit='50' title='Player Stats' />
            <Statbox type='hero' days='50' limit='140' title='Hero Stats' />
          </Wrap>
        </Center>
      </BrowserView>
      <MobileView>
        <Wrap>
          <Statbox type='player' days='50' limit='50' title='Player Stats' />
          <Statbox type='hero' days='50' limit='140' title='Hero Stats' />
        </Wrap>
      </MobileView>
    </Navbar>
  );
}
