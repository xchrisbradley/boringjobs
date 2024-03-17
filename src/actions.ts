"use server";

import { Address, getContract } from "viem";
import { publicClient, smartAccountClient } from "@/lib/pimlico";

export const updateGreeting = async (
  address: Address,
  abi: any,
  func: any,
  value: string
) => {
  "use server";
  const contract = getContract({
    address,
    abi,
    client: {
      public: publicClient,
      wallet: smartAccountClient,
    },
    // @ts-ignore
    nonce: await smartAccountClient.account.getNonce(),
  });

  return await contract.write[func]([value]);
};

export const writeContract = async (
  address: Address,
  abi: any,
  func: any,
  value: string
) => {
  "use server";
  const contract = getContract({
    address,
    abi,
    client: {
      public: publicClient,
      wallet: smartAccountClient,
    },
    // @ts-ignore
    nonce: await smartAccountClient.account.getNonce(),
  });

  return await contract.write[func]([value]);
};
