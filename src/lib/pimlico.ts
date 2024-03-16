import { ENTRYPOINT_ADDRESS_V07, bundlerActions } from "permissionless";
import {
	pimlicoBundlerActions,
	pimlicoPaymasterActions,
} from "permissionless/actions/pimlico";
import { createClient, createPublicClient, http } from "viem";

export const publicClient = createPublicClient({
	transport: http(process.env.RPC_ENDPOINT),
}) as any;

export const pimlicoUrl = `https://api.pimlico.io/2/mumbai/rpc?apikey=${process.env.PIMLICO_API_KEY}`;

export const pimlicoClient = (createClient({
	transport: http(pimlicoUrl),
}) as any)
	.extend(bundlerActions(ENTRYPOINT_ADDRESS_V07))
	.extend(pimlicoBundlerActions(ENTRYPOINT_ADDRESS_V07))
	.extend(pimlicoPaymasterActions(ENTRYPOINT_ADDRESS_V07));