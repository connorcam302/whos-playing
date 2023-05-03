import { Box, Button, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar"
import PageButtons from "@/components/PageButtons";
import { useRouter } from "next/router";

export default function HomePage() {
  return (
      <Navbar>
        <BrowserView>
          <GetMatchHelper playerid='all' pageNumber="0"/>
        </BrowserView>
        <MobileView>
          <GetMatchHelper playerid='all' card="true"/>
        </MobileView>
      </Navbar>
  );
}
