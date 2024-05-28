import { Card, Avatar, Text, Group, Button, Flex, rem } from "@mantine/core";
import React, { useState, useContext } from "react";
import { VotingContext } from "../../context/Voter";
import { GiFoxHead } from "react-icons/gi";
function WalletButton() {
  const { connectWallet, currentAccount } = useContext(VotingContext);
  const displayText = currentAccount
    ? currentAccount.slice(0, 10) + "..."
    : "Connect Wallet";
  return ButtonCopy(displayText, connectWallet);
}

export default WalletButton;

function ButtonCopy(text, connectWallet) {
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
      onClick={connectWallet}
    >
      {text}
    </Button>
  );
}
