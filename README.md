# Prediction Market Frontend

UI interface for the prediction market contract

## Pre-requisite

This project depends on following projects:

- [Prediction market contracts](https://github.com/tzConnectBerlin/prediction-market-contracts)
- [que-pasa](https://github.com/tzConnectBerlin/que-pasa)
- [IPFS Pinning Service](https://github.com/tzConnectBerlin/ipfs-pinning-service)

## Available Scripts

In the project directory, you can run:

- `yarn start` to start the project in dev mode
- `yarn test` to run the tests in watch mode
- `yarn test-ci` to run all tests and generate a code coverage report
- `yarn build` to build the app
- `yarn commit` to start the commit wizard
- `yarn storybook` to start the storybook
- `yarn lint` to run the linter on entire project
- `yarn format` to run prettier
- `yarn analyze` to build and create a the source/dependency graph

## Environment variables

`.env.example` file is the example `.env` file and can be used to initialize base `.env` file required by the project.

The app uses below environment variables:

- REACT_APP_APP_NAME: App name to be disabled and used to initialize wallet provider. (default: Prediction Market)
- REACT_APP_MARKET_CONTRACT: Market contract address.
- REACT_APP_FA12_CONTRACT: FA1.2 contract address.
- REACT_APP_FA12_SYMBOL: FA1.2 token symbol
- REACT_APP_IPFS_POST_API: API used for [IPFS Pinning](https://github.com/tzConnectBerlin/ipfs-pinning-service)
- REACT_APP_IPFS_GET_API: IPFS Gateway URL used to fetch IPFS data.
- REACT_APP_NETWORK_TYPE: Tezos network to use. (default: GRANADANET)
- REACT_APP_RPC_URL: Tezos node rpc url (default: https://granadanet.smartpy.io)
- REACT_APP_RPC_PORT: Tezos node rpc port (default: 443)
- REACT_APP_GRAPHQL_API: [Indexer](https://github.com/tzConnectBerlin/que-pasa) service Postgraphile URL.
- REACT_APP_SENTRY_DSN: Sentry DSN if you want to enable logging via sentry
- REACT_APP_ENABLE_MARKET_CREATION: Enable/Disable Market creation
- REACT_APP_WERT_PARTNER_ID: [Wert](http://wert.io/) client id to enable "Buy Tezos" option.

## Assumptions

- Currently, we are not fetching contract metadata for FA1.2 contract and the project assumes that the decimals used by the FA1.2 contract is **6**

## License

MIT License

Copyright (c) 2020 TZ Connect GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
