"use server";

import {
	ENTRYPOINT_ADDRESS_V07,
	createSmartAccountClient,
} from "permissionless";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { pimlicoClient, pimlicoUrl, publicClient } from "@/lib/pimlico";
import { Address } from "abitype";


export const getAccount = async (privateKey: Address) => {
    const account = await privateKeyToSimpleSmartAccount(publicClient, {
        privateKey,
        factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985", // simple account factory
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
    return account;
}