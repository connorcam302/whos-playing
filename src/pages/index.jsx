import { Box, Button, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import { BrowserView, MobileView } from "react-device-detect";

export default function HomePage() {
  return (
    <>
      <BrowserView>
        <GetMatchHelper playerid='all'/>
      </BrowserView>
      <MobileView>
        <GetMatchHelper playerid='all' card="true"/>
      </MobileView>
    </>
  );
}

function toggleView() {
  console.log("toggling");
  if (displayCard === true) {
    displayCard = false;
  } else {
    displayCard = true;
  }
}
