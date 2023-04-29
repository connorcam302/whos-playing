import MatchCard from "@/components/MatchCard";
import HeaderText from "@/components/typography/HeaderText";
import { Box, Button, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import PlayerOptions from "@/components/PlayerOptions";
import { Play } from "@next/font/google";
import { HamburgerIcon } from "@chakra-ui/icons";

var displayCard = false;

export default function HomePage() {
  return (
    <Box>
      <PlayerOptions />
      <Button onClick={toggleView()}>
        <HamburgerIcon />
      </Button>
      <GetMatchHelper playerid="all" displayCard="true"/>
    </Box>
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
