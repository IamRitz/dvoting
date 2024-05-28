import { VotingProvider } from "../context/Voter";
import "@mantine/core/styles.css";
import Link from "next/link";
import CountDown from "../components/countDown/CountDown";
import { createTheme, MantineProvider } from "@mantine/core";
import { Flex, AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import WalletButton from "../components/walletButton/WalletButton";
import HeroSection from "../components/HeroSection";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const MyApp = ({ Component, pageProps }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <VotingProvider>
        <AppShell
          header={{ height: 120 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Flex
              mih={50}
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />

              <img
                src="https://zebpay.com/in/wp-content/uploads/2023/02/Group-15807.png"
                style={{ width: "100px", margin: "10px 10px 10px 40px" }}
              />
              <CountDown />
              <WalletButton />
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p="lg">
            <Flex
              mih={50}
              gap="lg"
              justify="flex-start"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Link href="/">
                <Button
                  variant="gradient"
                  fullWidth
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Home
                </Button>
              </Link>

              <Link href="/voter">
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Create Voter
                </Button>
              </Link>

              <Link href="/candidate">
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Create Candidate
                </Button>
              </Link>

              <Link href="/voterList">
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Voter List
                </Button>
              </Link>
            </Flex>
          </AppShell.Navbar>

          <AppShell.Main style={{ height: "100vh" }}>
            <HeroSection>
              <Component {...pageProps} />
            </HeroSection>
          </AppShell.Main>
        </AppShell>
      </VotingProvider>
    </MantineProvider>
  );
};

export default MyApp;
