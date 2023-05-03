/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Heading,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from "react-icons/fi";
import { IoIosStats, IoIosApps } from "react-icons/io";
import { AiFillStar } from "react-icons/ai"

import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  dest: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, dest: "/" },
  { name: "Matches", icon: IoIosApps, dest: "/matches"  },
  { name: "Stats", icon: IoIosStats, dest: "/stats"  },
  { name: "Top Matches", icon: AiFillStar, dest: "#"  },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg='background.reg'>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement='left' onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg='blue.reg'
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Who's Playing
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} color="white" _hover={{bg: "#2a9d8f"}} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} dest={link.dest}>
            {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  dest: string
}
const NavItem = ({ icon, children, dest, ...rest }: NavItemProps) => {
  return (
    <Link href={dest} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: "#2a9d8f",
          color: "white",
          transition: "0.3s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            color='white'
            fontSize='16'
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text>{children}</Text>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg="blue.reg"
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton bg="blue.reg" onClick={onOpen} aria-label='open menu' color="white" _hover={{bg: "#2a9d8f"}} icon={<FiMenu />} />

      <Heading fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold' color="white.reg">
        Who's Playing
      </Heading>
    </Flex>
  );
};
