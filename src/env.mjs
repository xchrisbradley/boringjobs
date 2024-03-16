import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH0_SECRET: z.string().min(1),
    AUTH0_BASE_URL: z.string().min(1),
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_CLIENT_SECRET: z.string().min(1),
    AUTH0_ISSUER_BASE_URL: z.string().min(1),
    AUTH0_SECRET: z.string().min(1),
    AUTH0_SCOPE: z.string().min(1),
    AUTH0_AUDIENCE: z.string().min(1),
    PIMLICO_API_KEY: z.string().min(1),
    RPC_ENDPOINT: z.string().min(1),
    PRIVATE_KEY: z.string().min(1),
    CHAIN_ID: z.string().min(1),
    ETHERSCAN_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    PIMLICO_API_KEY: process.env.PIMLICO_API_KEY,
    RPC_ENDPOINT: process.env.RPC_ENDPOINT,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CHAIN_ID: process.env.CHAIN_ID,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  },
});
