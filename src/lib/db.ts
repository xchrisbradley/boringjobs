import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { Address, ContractDetails } from "@/lib/types";
import { Claims } from "@auth0/nextjs-auth0";

type Contracts = {
  [key: Address]: ContractDetails;
};

type Data = {
  contracts: Contracts;
  user: Claims;
  account: Account;
};

export type Account =
  | {
      address: Address;
      source: string;
      type: string;
      client: {
        cacheTime: number;
        key: string;
        name: string;
        pollingInterval: number;
        transport: {
          key: string;
          name: string;
          retryCount: number;
          retryDelay: number;
          timeout: number;
          type: string;
          url: string;
        };
        type: string;
        uid: string;
      };
      entryPoint: Address;
      publicKey: Address;
    }
  | {};

const file = ".database.json";
const adapter = new JSONFile<Data>(file);
const defaultData: Data = { contracts: {}, account: {}, user: {} };
const db = new Low(adapter, defaultData);

export { db };
