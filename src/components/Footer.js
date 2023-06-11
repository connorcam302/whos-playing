import {
  Wrap,
  Container,
  IconButton,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: "12", md: "16" }}>
    <Stack spacing={{ base: "4", md: "5" }}>
      <Wrap justify="center">
        <IconButton
          backgroundColor={"rgba(0,0,0,0)"}
          color={"white"}
          as="a"
          href="https://www.linkedin.com/in/connor-campbell-600265175/"
          aria-label="LinkedIn"
          icon={
            <Box margin="1em">
              <FaLinkedin fontSize="1.25rem" size={"48"} />
            </Box>
          }
          _hover={{ backgroundColor: "rgba(0,0,0,0)", color: "teal.400" }}
          h="3em"
        />
        <IconButton
          backgroundColor={"rgba(0,0,0,0)"}
          color={"white"}
          as="a"
          href="https://github.com/connorcam302"
          aria-label="GitHub"
          icon={
            <Box margin="1em">
              <FaGithub fontSize="1.25rem" size={"48"} />
            </Box>
          }
          _hover={{ backgroundColor: "rgba(0,0,0,0)", color: "teal.400" }}
          h="3em"
        />
        <IconButton
          backgroundColor={"rgba(0,0,0,0)"}
          color={"white"}
          as="a"
          href="https://twitter.com/TheColfox"
          aria-label="Twitter"
          icon={
            <Box margin="1em">
              <FaTwitter fontSize="1.5rem" size={"48"} />
            </Box>
          }
          _hover={{ backgroundColor: "rgba(0,0,0,0)", color: "teal.400" }}
          h="3em"
        />
      </Wrap>
      <Text fontSize="sm" color="white" textAlign={"center"}>
        whos-playing | Connor Campbell
      </Text>
    </Stack>
  </Container>
);
