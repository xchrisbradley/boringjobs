# OnChain JobBoard: A Decentralized Employment Solution

## Live Demonstration
Explore our platform through the following URL: [OnChain JobBoard Demo](https://onchain-jobboard.vercel.app/)

This interactive demo provides insights into the following functionalities: 

- Secure authentication leveraging World ID.
- Generation of Non-Fungible Token (NFT) Profiles for both Employers and Job Seekers, facilitating unique identity representation.
- Initiation of Job Listings with innovative reward mechanisms: 50% allocated to the successful job applicant, and the remaining 50% distributed amongst all candidates post-hire.
- Application submission for job vacancies.
- Completion of recruitment processes with job fulfillment capabilities.
- Reward withdrawal system for participants.

## Initial Setup Instructions
To integrate and test the OnChain JobBoard in your local environment, follow the steps below:

1. Clone the repository and install necessary dependencies:
    ```bash
    git clone https://github.com/xchrisbradley/onchain-jobboard.git
    cd onchain-jobboard
    pnpm install
    ```

2. Establish your local environment configuration by creating a `.env.local` file at the project's root. Alternatively, replicate the provided `.env.example` file. Your `.env.local` should include:
    ```bash
    RPC_ENDPOINT='YOUR_RPC_ENDPOINT'
    PRIVATE_KEY='YOUR_PRIVATE_KEY'
    CHAIN_ID='YOUR_CHAIN_ID'
    ETHERSCAN_API_KEY='YOUR_ETHERSCAN_API_KEY'
    ```

## Protocol Development Workflow
Execute the following commands within your development environment to engage with the protocol:

- `pnpm protocol:test`: Execute tests to validate protocol integrity.
- `pnpm protocol:build`: Compile the protocol to prepare for deployment.
- `pnpm protocol:run`: Launch a local instance of the protocol for testing and development purposes.
- `pnpm protocol:deploy`: Deploy the protocol onto the blockchain network.
- `pnpm protocol:verify`: Verify the protocol implementation against blockchain network standards.

## Frontend Development Workflow
Execute the following commands within your development environment to engage with the frontend:

- `pnpm frontend:build`: Compile the frontend to prepare for deployment.
- `pnpm frontend:run`: Launch a local instance of the frontend for testing and development purposes. **This command will also require the protocol to be running locally.**