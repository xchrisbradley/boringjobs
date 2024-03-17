# Boring Jobs: A Decentralized OnChain JobBoard

## Stack

- **Protocol**: Solidity, Foundry, UseCannon
- **Frontend**: Viem, Wagmi, React, Next.js 14 + App Router, Tailwind CSS
- **Authentication**: Auth0, World ID

## Live Demonstration

Explore our platform through the following URL: [Boring Jobs Demo](https://onchain-jobboard.vercel.app/)

This interactive demo provides insights into the following functionalities:

- Secure authentication leveraging World ID.
- Generation of Non-Fungible Token (NFT) Profiles for both Employers and Job Seekers, facilitating unique identity representation.
- Initiation of Job Listings with innovative reward mechanisms: 50% allocated to the successful job applicant, and the remaining 50% distributed amongst all candidates post-hire.
- Application submission for job vacancies.
- Completion of recruitment processes with job fulfillment capabilities.
- Reward withdrawal system for participants.

## Initial Setup Instructions

To integrate and test the Boring Jobs in your local environment, follow the steps below:

1. Clone the repository and install necessary dependencies:

   ```bash
   git clone https://github.com/xchrisbradley/onchain-jobboard.git
   cd onchain-jobboard
   pnpm install
   ```

2. Establish your local environment configuration by creating a `.env.local` file at the project's root. Alternatively, replicate the provided `.env.example` file. Your `.env.local` should include:
   ```bash
   RPC_ENDPOINT=''
   PRIVATE_KEY=''
   CHAIN_ID=84532
   ETHERSCAN_API_KEY=''
   AUTH0_SECRET='Generate this with `openssl rand -base64 32`'
   AUTH0_ISSUER_BASE_URL=''
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_CLIENT_ID=''
   AUTH0_CLIENT_SECRET=''
   AUTH0_AUDIENCE=''
   AUTH0_SCOPE=openid profile email offline_access
   PIMLICO_API_KEY='https://www.pimlico.io/'
   ```
3. Setup Auth0 WorldID Connection: https://marketplace.auth0.com/integrations/worldcoin

## Protocol Development Workflow

Execute the following commands within your development environment to engage with the protocol:

- `pnpm protocol:test`: Execute tests to validate protocol integrity.
- `pnpm protocol:build`: Compile the protocol to prepare for deployment.
- `pnpm protocol:run`: Launch a local instance of the protocol for testing and development purposes.
- `pnpm protocol:deploy`: Deploy the protocol onto the blockchain network.
- `pnpm protocol:verify`: Verify the protocol implementation against blockchain network standards.
- `protocol:inspect`: Inspect the protocol's deployment data and write it to a `./src/abis` directory.

## Frontend Development Workflow

Execute the following commands within your development environment to engage with the frontend:

- `pnpm frontend:build`: Compile the frontend to prepare for deployment.
- `pnpm frontend:run`: Launch a local instance of the frontend for testing and development purposes. **This command will also require the protocol to be running locally and inspected.**
