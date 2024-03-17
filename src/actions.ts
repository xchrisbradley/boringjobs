"use server";

import { db } from "@/lib/db";
import {
  ENTRYPOINT_ADDRESS_V07,
  createSmartAccountClient,
} from "permissionless";
import {
  SimpleSmartAccount,
  privateKeyToSimpleSmartAccount,
} from "permissionless/accounts";
import { sepolia, Chain, baseSepolia } from "viem/chains";
import { publicClient } from "@/lib/pimlico";
import { Session, getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

import { bundlerActions, getAccountNonce } from "permissionless";
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import {
  Address,
  Client,
  Hash,
  Hex,
  PrivateKeyAccount,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
  encodePacked,
  hexToBigInt,
  keccak256,
  getContractAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { gnosis } from "viem/chains";
