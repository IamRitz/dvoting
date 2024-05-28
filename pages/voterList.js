import React, { useEffect } from "react";
import { Flex, Button } from "@mantine/core";
import VoterCard from "../components/voterCard/voterCard";
import { useContext } from "react";
import { VotingContext } from "../context/Voter";
const voterList = () => {
  const { voterArray, allVoterData } = useContext(VotingContext);
  useEffect(() => {
    allVoterData();
  }, [voterArray]);

  return (
    <Flex
      mih={50}
      gap="lg"
      justify="center"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {voterArray.map((voter, i) => {
        return (
          <VoterCard
            key={i + 1}
            name={voter[0]}
            url={voter[1]}
            voted={voter[3]}
            votedTo={voter[4]}
            age={voter[6].toNumber()}
            remark={voter[5]}
          />
        );
      })}
    </Flex>
  );
};

export default voterList;
