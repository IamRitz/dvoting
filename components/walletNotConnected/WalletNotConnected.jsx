import {
  Image,
  Container,
  Title,
  Text,
  Flex,
  Button,
  SimpleGrid,
} from "@mantine/core";
import image from "./image.svg";
import classes from "./WalletNotConnected.module.css";
import { useContext } from "react";
import { VotingContext } from "../../context/Voter";
export function WalletNotConnected() {
  const { connectWallet } = useContext(VotingContext);
  return (
    <Container
      className={classes.root}
      style={{
        // margin: "auto",
        // width: "70%",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Seems like you haven't connected your account to the MetaMask
            Wallet! Please connect your account to continue and cask your vote!
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={connectWallet}
          >
            Connect to Wallet!
          </Button>
        </div>
        <Image src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
