import MatchCard from "@/components/MatchCard";
import HeaderText from "@/components/typography/HeaderText";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react"
import GetMatchHelper from "@/components/GetMatchHelper";

export default function HomePage() {

  return (
    // <MatchCard target="_blank" matchid="6949819337"></MatchCard>
    <GetMatchHelper/>
  );
}