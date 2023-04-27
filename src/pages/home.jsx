import MatchCard from "@/components/MatchCard";
import HeaderText from "@/components/typography/HeaderText";
import { Box, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GetMatchHelper from "@/components/GetMatchHelper";
import PlayerOptions from "@/components/PlayerOptions";
import { Play } from "@next/font/google";

export default function HomePage() {

  return (
    <Box>
      <PlayerOptions></PlayerOptions>
      <GetMatchHelper playerid="all" />
    </Box>
  );
}
