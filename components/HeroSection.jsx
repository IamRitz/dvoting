import { WalletNotConnected } from "./walletNotConnected/WalletNotConnected";
import React, { useContext } from "react";
import { VotingContext } from "../context/Voter";
import VotingEnd from "./votingEnd/VotingEnd";
function HeroSection({ children }) {
  const { currentAccount, votingEnd } = useContext(VotingContext);

  if (votingEnd) return <VotingEnd />;
  if (!currentAccount) {
    return <WalletNotConnected />;
  }
  return children;
}

export default HeroSection;
