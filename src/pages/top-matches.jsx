import { Box, Button, Center, Heading, Select, Text, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Navbar from "@/components/Navbar";
import Statbox from "@/components/Statbox";
import { Helmet } from "react-helmet";

export default function MatchPage() {
  return (
    <>
      <Helmet>
        <title>Top Matches</title>
      </Helmet>
      <Navbar>
        <BrowserView>
            <Center padding={5} paddingTop={300}>
              <Heading>Under Maintenance</Heading>
            </Center>
            <Center>
              <Text>Will show featured matches from a period.</Text>
            </Center>
        </BrowserView>
        <MobileView>
          <Center>
            <Heading>Under Maintenance</Heading>
            <Text>Will show featured matches from a period.</Text>
          </Center>
        </MobileView>
      </Navbar>
    </>
  );
}
