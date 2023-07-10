import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Center,
  Spacer,
  background,
  Wrap
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import router, { useRouter } from "next/router";
import { redirect } from "next/navigation";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { IoIosStats, IoIosApps } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex className="test" h="3px" bg="teal.500"></Flex>
      <Flex
        bg="#1b263b"
        color="white"
        boxShadow="0 5px 9px -2px rgba(0,0,0,.8)"
        borderBottom={1}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          &nbsp; &nbsp;
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Spacer />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Spacer />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    fetch(`/api/player/all`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loaded) {
    const customStyles = {
      option: (base, state) => ({
        ...base,
        color: "white",
        backgroundColor: state.isSelected ? "#0d131f" : "#121a29",
        "&:hover": { backgroundColor: "teal" },
        padding: ".5rem 3rem .5rem .5rem",
        cursor: "pointer",
      }),
      control: (base, state) => ({
        ...base,
        color: "white",
        background: "#121a29",
        // match with the menu
        borderRadius: state.isFocused ? "10px 10px 0px 0px" : "10px",
        // Overwrittes the different states of border
        borderColor: "#121a29",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: "gray",
        },
      }),
      menu: (base) => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
      }),
      menuList: (base) => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
      }),
    };
    var options = [];
    players.map((player) => {
      options.push({ value: player.id, label: player.username });
    });
    
    return (
        <Stack direction="row">
          <Center>
            <Button
              as={"a"}
              w="10em"
              h="3.5em"
              paddingTop={2}
              bg="#1b263b"
              borderBottom="3px solid"
              borderColor={router.pathname == "/" ? "teal.500" : "#1b263b"}
              borderRadius={0}
              _hover={{
                background: "#111826",
                transition: "0.3s",
                borderBottom:
                  router.pathname == "/"
                    ? "3px solid teal.500"
                    : "3px solid #111826",
              }}
              href={"/"}
            >
              <FiHome /> &nbsp; Home
            </Button>
          </Center>
          <Center>
            <Button
              as={"a"}
              w="10em"
              h="3.5em"
              paddingTop={2}
              bg="#1b263b"
              borderBottom="3px solid"
              borderColor={
                router.pathname == "/matches" ? "teal.500" : "#1b263b"
              }
              borderRadius={0}
              _hover={{
                background: "#111826",
                transition: "0.3s",
                borderBottom:
                  router.pathname == "/matches"
                    ? "3px solid teal.500"
                    : "3px solid #111826",
              }}
              href={"/matches"}
            >
              <IoIosApps /> &nbsp; Matches
            </Button>
          </Center>
          <Center>
            <Button
              as={"a"}
              w="10em"
              h="3.5em"
              paddingTop={2}
              bg="#1b263b"
              borderBottom="3px solid"
              borderColor={router.pathname == "/stats" ? "teal.500" : "#1b263b"}
              borderRadius={0}
              _hover={{
                background: "#111826",
                transition: "0.3s",
                borderBottom:
                  router.pathname == "/stats"
                    ? "3px solid teal.500"
                    : "3px solid #111826",
              }}
              href={"/stats"}
            >
              <IoIosStats /> &nbsp; Stats
            </Button>
          </Center>
          <Center>
            <Button
              as={"a"}
              w="10em"
              h="3.5em"
              paddingTop={2}
              bg="#1b263b"
              borderBottom="3px solid"
              borderColor={
                router.pathname == "/leaderboard" ? "teal.500" : "#1b263b"
              }
              borderRadius={0}
              _hover={{
                background: "#111826",
                transition: "0.3s",
                borderBottom:
                  router.pathname == "/leaderboard"
                    ? "3px solid teal.500"
                    : "3px solid #111826",
              }}
              href={"/leaderboard"}
            >
              <GiPodium /> &nbsp; Leaderboard
            </Button>
          </Center>
          <Center>
            <Button
              as={"a"}
              w="10em"
              h="3.5em"
              paddingTop={2}
              bg="#1b263b"
              borderBottom="3px solid"
              borderColor={router.pathname == "/about" ? "teal.500" : "#1b263b"}
              borderRadius={0}
              _hover={{
                background: "#111826",
                transition: "0.3s",
                borderBottom:
                  router.pathname == "/about"
                    ? "3px solid teal.500"
                    : "3px solid #111826",
              }}
              href={"/about"}
            >
              <FaQuoteLeft /> &nbsp; About
            </Button>
          </Center>
          <Spacer />
          <Center>
            <Box w="20em" marginLeft={2} marginRight={2} paddingTop={1}>
              <Select
                options={options}
                placeholder="Search Player"
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    text: "#3599B8",
                    font: "#3599B8",
                    primary25: "#3599B8",
                    primary: "white",
                    neutral80: "white",
                    color: "black",
                  },
                })}
                onChange={(e) => (window.location.href = `/player/${e.value}`)}
              />
            </Box>
          </Center>
        </Stack>
    );
  }
};

const MobileNav = () => {
  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    fetch(`/api/player/all`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const linkColor = "gray.200";
  const linkHoverColor = "white";
  const popoverContentBgColor = "gray.800";

  if (loaded) {
    const customStyles = {
      option: (base, state) => ({
        ...base,
        color: "white",
        backgroundColor: state.isSelected ? "#0d131f" : "#121a29",
        "&:hover": { backgroundColor: "teal" },
        padding: ".5rem 3rem .5rem .5rem",
        cursor: "pointer",
      }),
      control: (base, state) => ({
        ...base,
        color: "white",
        background: "#121a29",
        // match with the menu
        borderRadius: state.isFocused ? "10px 10px 0px 0px" : "10px",
        // Overwrittes the different states of border
        borderColor: "#121a29",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: "gray",
        },
      }),
      menu: (base) => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
      }),
      menuList: (base) => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        height: "10em",
      }),
    };
    var options = [];
    players.map((player) => {
      options.push({ value: player.id, label: player.username });
    });
    return (
      <Stack spacing={0}>
        <Center bg="#1b263b" paddingTop={3} paddingBottom={3}>
          <Box w="80%" marginLeft={2} marginRight={2}>
            <Select
              options={options}
              placeholder="Search Player"
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  text: "#3599B8",
                  font: "#3599B8",
                  primary25: "#3599B8",
                  primary: "white",
                  neutral80: "white",
                  color: "black",
                },
              })}
              onChange={(e) => (window.location.href = `/player/${e.value}`)}
            />
          </Box>
        </Center>
        <Center>
          <Button
            as={"a"}
            color="white"
            w="100%"
            h="3em"
            bg="#1b263b"
            backgroundColor={router.pathname == "/" ? "teal.500" : "#1b263b"}
            _hover={{ backgroundColor: "teal.500" }}
            borderRadius={0}
            href={"/"}
          >
            <FiHome /> &nbsp; Home
          </Button>
        </Center>
        <Center>
          <Button
            as={"a"}
            color="white"
            w="100%"
            h="3em"
            bg="#1b263b"
            backgroundColor={
              router.pathname == "/matches" ? "teal.500" : "#1b263b"
            }
            _hover={{ backgroundColor: "teal.500" }}
            borderRadius={0}
            href={"/matches"}
          >
            <IoIosApps /> &nbsp; Matches
          </Button>
        </Center>
        <Center>
          <Button
            as={"a"}
            color="white"
            w="100%"
            h="3em"
            bg="#1b263b"
            backgroundColor={
              router.pathname == "/stats" ? "teal.500" : "#1b263b"
            }
            _hover={{ backgroundColor: "teal.500" }}
            borderRadius={0}
            href={"/stats"}
          >
            <IoIosStats /> &nbsp; Stats
          </Button>
        </Center>
        <Center>
          <Button
            as={"a"}
            color="white"
            w="100%"
            h="3em"
            bg="#1b263b"
            backgroundColor={
              router.pathname == "/stats" ? "teal.500" : "#1b263b"
            }
            _hover={{ backgroundColor: "teal.500" }}
            borderRadius={0}
            href={"/loaderboard"}
          >
            <GiPodium /> &nbsp; Leaderboard
          </Button>
        </Center>
        <Center>
          <Button
            as={"a"}
            color="white"
            w="100%"
            h="3em"
            bg="#1b263b"
            backgroundColor={
              router.pathname == "/about" ? "teal.500" : "#1b263b"
            }
            _hover={{ backgroundColor: "teal.500" }}
            borderRadius={0}
            href={"/about"}
          >
            <FaQuoteLeft /> &nbsp; About
          </Button>
        </Center>
      </Stack>
    );
  }
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color="gray.200">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor="gray.700"
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
