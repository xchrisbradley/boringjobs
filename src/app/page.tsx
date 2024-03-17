import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { privateKeyToAccount } from "viem/accounts"
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from 'permissionless';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import { publicClient, bundlerTransport, bundlerClient, paymasterClient, forkedChains } from '@/lib/pimlico';

import GreeterContract from '@/abis/greeter.json';

const debugPrivateKey = ''

export default withPageAuthRequired(async function Page() {
  const session = await getSession();

  const safeAccount = await signerToSafeSmartAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer: privateKeyToAccount(debugPrivateKey),
    safeVersion: "1.4.1",
  })

  const smartAccountClient = createSmartAccountClient({
    account: safeAccount,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: forkedChains[0],
    bundlerTransport: bundlerTransport,
    middleware: {
      gasPrice: async () => (await bundlerClient.getUserOperationGasPrice()).fast,
      sponsorUserOperation: paymasterClient.sponsorUserOperation,
    },
  })

  const data = await publicClient.readContract({
    address: GreeterContract.address,
    abi: GreeterContract.abi,
    functionName: 'greet',
  })

  // const txHash = await smartAccountClient.sendTransaction({
  //   chain: publicClient.chain,
  //   to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  //   value: parseEther("0.1"),
  //   maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
  //   maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
  // })
  // // console.log('txHash', txHash)

  return (
    <div className='p-6 space-y-4 text-xs'>
      <h1>Greet</h1>
      <div>
        {data}
      </div>
    </div>
  );
}, { returnTo: '/' })