import {
  ENTRYPOINT_ADDRESS_V06,
  bundlerActions,
  createSmartAccountClient,
} from "permissionless";
import { privateKeyToAccount } from "viem/accounts";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { Address, createClient, createPublicClient, http } from "viem";
import { baseSepolia, Chain, foundry } from "viem/chains";
import { signerToSafeSmartAccount } from "permissionless/accounts";

const debugPrivateKey: Address = `0x${process.env.PRIVATE_KEY}`;

const fork = (chain: Chain) => ({
  ...chain,
  name: `${chain.name} Fork`,
  rpcUrls: foundry.rpcUrls,
});

export const forkedChains = [baseSepolia]; //.map(fork);

export const publicClient = createPublicClient({
  transport: http("https://rpc.ankr.com/base_sepolia"),
  chain: forkedChains[0],
});

const baseUrl = "https://api.pimlico.io";
export const pimlicoUrl = `${baseUrl}/2/base-sepolia/rpc?apikey=${process.env.PIMLICO_API_KEY}`;
export const bundlerTransport = http(
  `${baseUrl}/v1/base-sepolia/rpc?apikey=${process.env.PIMLICO_API_KEY}`
);
export const paymasterTransport = http(
  `${baseUrl}/v2/base-sepolia/rpc?apikey=${process.env.PIMLICO_API_KEY}`
);

export const bundlerClient = createPimlicoBundlerClient({
  transport: bundlerTransport,
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  chain: forkedChains[0],
});

export const gasPrices = await bundlerClient.getUserOperationGasPrice();

export const pimlicoClient = createClient({
  transport: http(pimlicoUrl),
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06))
  .extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06));

export const paymasterClient = createPimlicoPaymasterClient({
  transport: paymasterTransport,
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  chain: forkedChains[0],
});

export const signer = privateKeyToAccount(debugPrivateKey);

export const safeAccount = await signerToSafeSmartAccount(publicClient, {
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  signer,
  safeVersion: "1.4.1",
});

export const smartAccountClient = createSmartAccountClient({
  account: safeAccount,
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  chain: publicClient.chain,
  bundlerTransport: bundlerTransport,
  middleware: {
    gasPrice: async () => (await bundlerClient.getUserOperationGasPrice()).fast,
    sponsorUserOperation: paymasterClient.sponsorUserOperation,
  },
});
