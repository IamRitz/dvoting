# DVoting Project

## Overview

DVoting is a decentralized voting application built with Solidity smart
contracts, Truffle, and React with Next.js. The app allows voters to securely
vote for candidates in a transparent and immutable manner.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/)

## Try it Yourself

1. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

## Smart Contract Compilation and Deployment

1. Compile the contracts:
    ```sh
    truffle compile
    ```
2. Deploy to Ganache:
    ```sh
    truffle migrate --network development
    ```
3. Update `constants.js` with the deployed contract address:
    ```javascript
    import voting from "../build/contracts/Lock.json";

    export const votingAddress = "your_deployed_contract_address";
    export const votingAddressABI = voting.abi;
    ```

## Running the Frontend

1. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the smart contract tests:
```sh
truffle test

