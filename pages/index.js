import React, { useState, useEffect, useContext } from "react";
import { VotingContext } from "../context/Voter";
import CardsCarousels from "../components/cardsCarousels/cardsCarousels";
import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Flex,
  Center,
  Group,
  rem,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

function index() {
  const {
    timerTime,
    allCandidateData,
    allVoterData,
    candidateArray,
    addVote,
    voterArray,
    isWalletConnected,
    currentAccount,
  } = useContext(VotingContext);
  const data = [
    {
      label: "Candidates",
      stats: candidateArray.length,
      progress: 65,
      color: "teal",
      icon: "up",
    },
  ];
  useEffect(() => {
    allVoterData();
    allCandidateData();
  }, [candidateArray, voterArray]);

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  const candidateData = candidateArray.map((candidate) => {
    return {
      candidateId: candidate[0],
      name: candidate[2],
      age: candidate[1].toNumber(),
      candidateAddress: candidate[5],
      moto: candidate[6],
      url: candidate[3],
    };
  });

  return (
    <Flex
      mih={50}
      gap="lg"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <SimpleGrid cols={{ base: 1, sm: 1 }}>{stats}</SimpleGrid>
      <CardsCarousels data={candidateData} />

      <Text
        style={{ fontSize: "40px", marginTop: "20px" }}
        fw={1000}
        variant="gradient"
        gradient={{ from: "lime", to: "cyan", deg: 90 }}
      >
        EᗰᑭOᗯEᖇIᑎG ᗪEᗰOᑕᖇᗩᑕY, OᑎE ᗷᒪOᑕK ᗩT ᗩ TIᗰE!
      </Text>
    </Flex>
  );
}

export default index;
