import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";

import classes from "./VotingEnd.module.css";
import { useContext, useEffect } from "react";
import { VotingContext } from "../../context/Voter";
import { Avatar } from "@mantine/core";

export default function VotingEnd() {
  const theme = useMantineTheme();
  const { winners, currentAccount, allCandidateData, findWinner } =
    useContext(VotingContext);
  useEffect(() => {
    allCandidateData();
    findWinner();
  }, [currentAccount]);
  const features = winners.map((feature) => (
    <Card
      key={feature[0]}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature[2]}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature[6]}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          The voting has concluded!
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Revolutionize democracy with our decentralized blockchain voting
        platform! Embrace transparency, security, and accessibility in online
        voting.
      </Title>
      {/* 
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text> */}

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
