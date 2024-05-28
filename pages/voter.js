import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { VotingContext } from "../context/Voter";
import {
  TextInput,
  NumberInput,
  Flex,
  Image,
  Card,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function allowedVoters() {
  const { addVoter } = useContext(VotingContext);
  const router = useRouter();
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
          height={300}
          alt="Norway"
        />
      </Card.Section>
      <div style={{ height: "20px" }} />
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Text
          size="xl"
          fw={1000}
          variant="gradient"
          gradient={{ from: "lime", to: "cyan", deg: 90 }}
        >
          Create a Voter!
        </Text>

        <TextInput
          variant="filled"
          size="xl"
          radius="md"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          withAsterisk
          placeholder="Enter Name"
        />
        <TextInput
          variant="filled"
          size="xl"
          radius="md"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          withAsterisk
          placeholder="Enter Address"
        />
        <NumberInput
          variant="filled"
          size="xl"
          radius="md"
          label="Age"
          value={age}
          onChange={setAge}
          min={18}
          max={80}
          placeholder="Enter Age between 18 and 80"
        />
        <TextInput
          variant="filled"
          size="xl"
          radius="md"
          label="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          withAsterisk
          placeholder="Enter Remark"
        />
      </Flex>
      <div style={{ height: "40px" }} />
      <Button
        variant="filled"
        color="teal"
        size="md"
        radius="md"
        onClick={() => {
          if (!name || !address || !age || !remark) {
            return alert("Please fill all the fields!");
          } else {
            const imageUrl = `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${getRandomNumber()}.png`;
            console.log(imageUrl);
            addVoter({ name, address, age, remark }, imageUrl, router);
          }
          setName("");
          setAddress("");
          setAge("");
          setRemark("");
        }}
      >
        Authorize and create voter!
      </Button>
    </Card>
  );
}
export default allowedVoters;
