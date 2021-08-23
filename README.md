# Prediction Market Frontend

UI interface for the prediction market contract

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
- REACT_APP_NETWORK_TYPE: Tezos network to use. (default: FLORENCENET)
- REACT_APP_RPC_URL: Tezos node rpc url (default: https://florencenet.smartpy.com)
- REACT_APP_RPC_PORT: Tezos node rpc port (default: 443)
- REACT_APP_GRAPHQL_API: [Indexer](https://github.com/tzConnectBerlin/storage-sql) service Postgraphile URL.
- REACT_APP_SENTRY_DSN: Sentry DSN if you want to enable logging via sentry

## Assumptions

- Currently, we are not fetching contract metadata for FA1.2 contract and the project assumes that the decimals used by the FA1.2 contract is **6**
