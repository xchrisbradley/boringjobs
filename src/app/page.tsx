import { getContract } from 'viem';

import { Flex, Text, Button } from '@radix-ui/themes';
import { publicClient, smartAccountClient } from '@/lib/pimlico';
import { greeterDeployment } from '@/lib/deployments';
import { updateGreeting } from '@/actions';

import GreeterContract from '@/abis/greeter.json';
import { Contract } from '@/components/Contract';

export const runtime = 'edge'

export default async function Page() {
  const greeting = await publicClient.readContract({
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
    nonce: (await smartAccountClient.account.getNonce())
  })

  return (
    <div className='p-6 space-y-4 text-xs'>
      <div>Greeting: {greeting}</div>
      <Contract name='greeting' value={greeting} action={updateGreeting} func={'setGreeting'} abi={GreeterContract.abi} address={greeterDeployment[publicClient.chain.id]} />
    </div>
  );
}