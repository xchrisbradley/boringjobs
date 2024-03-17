import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { privateKeyToAccount } from "viem/accounts"
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient, getAccountNonce } from 'permissionless';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import { publicClient, bundlerTransport, bundlerClient, paymasterClient } from '@/lib/pimlico';

import GreeterContract from '@/abis/greeter.json';
import { greeterDeployment } from '@/lib/deployments';
import { getContract } from 'viem';

const debugPrivateKey = ''

export default withPageAuthRequired(async function Page() {
  const signer = privateKeyToAccount(debugPrivateKey);

  const safeAccount = await signerToSafeSmartAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer,
    safeVersion: "1.4.1",
  })

  const smartAccountClient = createSmartAccountClient({
    account: safeAccount,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: publicClient.chain,
    bundlerTransport: bundlerTransport,
    middleware: {
      gasPrice: async () => (await bundlerClient.getUserOperationGasPrice()).fast,
      sponsorUserOperation: paymasterClient.sponsorUserOperation,
    },
  })

  const nonce = await smartAccountClient.account.getNonce()
  console.log('nonce', nonce)

  const data = await publicClient.readContract({
    address: greeterDeployment[publicClient.chain.id],
    abi: GreeterContract.abi,
    functionName: 'greet',
  })

  const greeterContract = getContract({
    address: greeterDeployment[publicClient.chain.id],
    abi: GreeterContract.abi,
    client: {
      public: publicClient,
      wallet: smartAccountClient,
    },
    nonce
  })
  const txHash = await greeterContract.write.setGreeting(['Jack'])

  return (
    <div className='p-6 space-y-4 text-xs'>
      <h1>Greet</h1>
      <div>
        {data}
      </div>
      <div>
        {txHash}
      </div>
    </div>
  );
}, { returnTo: '/' })