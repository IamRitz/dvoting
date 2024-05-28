import { Card, Avatar, Text, Group, Button, Flex } from "@mantine/core";
import classes from "./CandidateCard.module.css";
import { useContext } from "react";
import { VotingContext } from "../../context/Voter";
function CandidateCard({
  name,
  url,
  age,
  candidateId,
  candidateAddress,
  moto = "My moto is to destroy this world",
}) {
  const { addVote } = useContext(VotingContext);
  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
        }}
      />
      <Avatar
        src={url}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Flex
        mih={50}
        gap="xs"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Text
          size="xl"
          fw={1000}
          variant="gradient"
          gradient={{ from: "grape", to: "cyan", deg: 90 }}
        >
          {name}
        </Text>
        <Text
          size="xl"
          fw={1000}
          variant="gradient"
          gradient={{ from: "grape", to: "cyan", deg: 90 }}
        >
          Age : {age}
        </Text>
        <Text
          size="xl"
          fw={1000}
          variant="gradient"
          gradient={{ from: "grape", to: "cyan", deg: 90 }}
        >
          {moto}
        </Text>
      </Flex>

      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        variant="default"
        onClick={() => addVote(candidateId, candidateAddress)}
      >
        Vote this Candidate
      </Button>
    </Card>
  );
}

export default CandidateCard;
