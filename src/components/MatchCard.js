import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";

export default function MatchCard(props) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Image src={props.match.hero.img}/>
          <Heading size="md">{props.match.player.name}</Heading>
          <Text>{props.match.date_string}</Text>
          <Text>{props.match.match_id}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text>
          <Link
            href={"https://www.opendota.com/matches/" + props.match.match_id}
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              OpenDota
            </a>
          </Link>
        </Text>
        <Text>
          <Link
            href={"https://www.dotabuff.com/matches/" + props.match.match_id}
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              Dotabuff
            </a>
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
}
