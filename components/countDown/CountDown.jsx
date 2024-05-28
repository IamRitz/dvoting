import React, { useContext, useRef } from "react";
import { VotingContext } from "../../context/Voter";
import { Button, rem } from "@mantine/core";
import { GiFoxHead } from "react-icons/gi";
function CountDown() {
  const { findWinner, currentAccount } = useContext(VotingContext);
  return (
    <Button
      variant="light"
      rightSection={<GiFoxHead size={30} />}
      radius="xl"
      size="md"
      styles={{
        root: {
          paddingRight: rem(14),
          height: rem(48),
          fontFamily: "Papyrus",
          fontSize: "25px",
          marginRight: rem(10),
        },
        section: { marginLeft: rem(22) },
      }}
      onClick={() => {
        console.log(currentAccount);
        if (
          currentAccount.toLowerCase() !==
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase()
        )
          return alert("Only the organizer can conclude the election!");
        findWinner();
      }}
    >
      Conclude Election
    </Button>
  );
}

export default CountDown;
