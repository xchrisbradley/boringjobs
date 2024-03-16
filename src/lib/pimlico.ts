import { ENTRYPOINT_ADDRESS_V06, bundlerActions } from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import { createClient, createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export const rpcURL = "https://rpc.ankr.com/base_sepolia";

export const publicClient = createPublicClient({
  transport: http(rpcURL),
  chain: baseSepolia,
});

const PIMLICO_API_V1 = `https://api.pimlico.io/v1/base-sepolia/rpc?apikey=${process.env.PIMLICO_API_KEY}`;

export const bundlerClient = createClient({
  transport: http(PIMLICO_API_V1),
  chain: baseSepolia,
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06));

const PIMLICO_API_V2 = `https://api.pimlico.io/v2/base-sepolia/rpc?apikey=${process.env.PIMLICO_API_KEY}`;

export const pimlicoPaymasterClient = createClient({
  transport: http(PIMLICO_API_V2),
  chain: baseSepolia,
}).extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06));

export const pimlicoClient = createClient({
  transport: http(PIMLICO_API_V2),
  chain: baseSepolia,
})
  .extend(bundlerActions(ENTRYPOINT_ADDRESS_V06))
  .extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V06))
  .extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V06));
