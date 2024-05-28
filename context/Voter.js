import React, { useState, useEffect } from "react";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import Web3Modal from "web3modal";

import { votingAddress, votingAddressABI } from "./constants";

const VotingContext = React.createContext();

const getWeb3 = async () => {
  const web3Modal = new Web3Modal();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  return web3;
};

const getContract = async (web3) => {
  const contract = TruffleContract({
    abi: votingAddressABI,
  });
  contract.setProvider(web3.currentProvider);
  const instance = await contract.deployed();
  return instance;
};

export const VotingProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateArray, setCandidateArray] = useState([]);
  const [votingEnd, setVotingEnd] = useState(false);
  const [error, setError] = useState("");
  const [winners, setWinners] = useState([]);
  const [voterArray, setVoterArray] = useState([]);
  const [voterAddress, setVoterAddress] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);

        const contractInstance = await getContract(web3);
        setContract(contractInstance);
      } catch (error) {
        setError("Failed to load web3, accounts, or contract.");
        console.error(error);
      }
    };

    init();
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        return setError("Please install MetaMask!");
      }
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(acc[0]);
    } catch (error) {
      setError("Failed to connect wallet!");
    }
  }

  function checkVoterExists(votAddress) {
    const voterExists = voterAddress.filter((voter) => voter === votAddress);
    return voterExists.length > 0;
  }

  function checkCandidateExists(candidateAddress) {
    const candidateExists = candidateArray.filter(
      (candidate) => candidate._address === candidateAddress
    );
    return candidateExists.length > 0;
  }

  async function addVoter(inputForm, fileUrl, router) {
    try {
      const { name, address, age, remark } = inputForm;
      if (checkVoterExists(address)) {
        return alert("Voter already exists!");
      }
      if (!name || !address || !age || !remark) {
        return alert("Please fill all the fields!");
      }

      const voter = await contract.addVoter(name, fileUrl, address, remark, age, {
        from: currentAccount,
      });

      await voter.wait();
      router.push("/voterList");
      allVoterData();
    } catch (err) {
      console.log(err);
    }
  }

  async function allVoterData(force = false) {
    const voterDataAddresses = await contract.readAllVoters();
    setVoterAddress(voterDataAddresses);

    const promises = voterDataAddresses.map(async (voter) => {
      return await contract.readVoterData(voter);
    });
    const voterDataArray = await Promise.all(promises);
    console.log("entered voter array");
    if (voterDataArray.length > voterArray.length || force) {
      console.log("inside");
      setVoterArray(voterDataArray);
    }
  }

  async function addVote(candidateId, candidateAddress) {
    const voterData = await contract.readVoterData(currentAccount);
    console.log(voterData);
    if (voterData[0] === "") {
      alert("Your voting profile does not exist, ask the organizer to add you!");
      return;
    }
    if (voterData.voted) {
      return alert("You have already voted!");
    }
    const vote = await contract.addVote(candidateId, candidateAddress, {
      from: currentAccount,
    });
    console.log(vote);
    alert("voted");
    allVoterData(true);
    allCandidateData(true);
  }

  async function addCandidate(inputForm, fileUrl, router) {
    try {
      const { name, address, age, moto } = inputForm;
      if (checkCandidateExists(address)) {
        return alert("Candidate already exists!");
      }
      if (!name || !address || !age || !moto) {
        return alert("Please fill all the fields!");
      }

      const candidate = await contract.addCandidate(age, name, fileUrl, address, moto, {
        from: currentAccount,
      });
      await candidate.wait();
      router.push("/");
      allCandidateData();
    } catch (err) {
      console.log(err);
    }
  }

  async function allCandidateData(force = false) {
    const candidateAddress = await contract.readAllAddress();

    const promises = candidateAddress.map(async (candidate) => {
      return await contract.readCandidateData(candidate);
    });
    const candidateDataArray = await Promise.all(promises);

    if (candidateDataArray.length > candidateArray.length || force) {
      setCandidateArray(candidateDataArray);
    }
  }

  async function findWinner() {
    await allCandidateData();
    let highCount = 0;
    let localWinners = [];
    for (let i = 0; i < candidateArray.length; i++) {
      const curCandidateVote = candidateArray[i].votecount.toNumber();
      if (curCandidateVote > highCount) {
        highCount = curCandidateVote;
      }
    }
    console.log(`highcount is ${highCount}`);
    for (let i = 0; i < candidateArray.length; i++) {
      const curCandidateVote = candidateArray[i].votecount.toNumber();
      if (curCandidateVote === highCount && highCount > 0) {
        highCount = curCandidateVote;
        localWinners.push(candidateArray[i]);
      }
    }
    setWinners(localWinners);
    setVotingEnd(true);
  }

  return (
    <VotingContext.Provider
      value={{
        error,
        winners,
        currentAccount,
        candidateArray,
        voterArray,
        voterAddress,
        votingEnd,
        connectWallet,
        findWinner,
        addVoter,
        allVoterData,
        addVote,
        addCandidate,
        allCandidateData,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

