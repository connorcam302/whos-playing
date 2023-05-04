import { Box, Button, Center, Select, Text, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar";
import PageButtons from "@/components/PageButtons";
import { useRouter } from "next/router";
import Statbox from "@/components/Statbox";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
    <Helmet>
      <title>Who's Playing</title>
    </Helmet>
      <Navbar>
        <BrowserView>
          <Center margin={5}>
            <Wrap>
              <Statbox type='player' days='14' limit='10' title='Player Stats' />
              <Statbox type='hero' days='14' limit='10' title='Hero Stats' />
            </Wrap>
          </Center>
          <GetMatchHelper playerid='all' pageNumber='0' />
        </BrowserView>
        <MobileView>
          <GetMatchHelper playerid='all' card='true' />
        </MobileView>
      </Navbar>
    </>
  );
}
