import { http, createConfig } from "wagmi";
import { baseSepolia, Chain, foundry } from "wagmi/chains";

const fork = (chain: Chain) => ({
  ...chain,
  name: `${chain.name} Fork`,
  rpcUrls: foundry.rpcUrls,
});

export const forkedChains = [baseSepolia];

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia]: http(process.env.RPC_ENDPOINT),
  },
});
