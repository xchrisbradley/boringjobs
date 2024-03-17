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
    <Flex direction="column" gap="2">
      <Text>Greeting: {greeting}</Text>
      <Contract name='greeting' value={greeting} action={updateGreeting} />
    </Flex>
    // <div className='p-6 space-y-4 text-xs'>
    //   {/* <ContractReadOnly name='greeting' value={greeting} /> */}
    //   {/* <Contract name='greeting' value={greeting} /> */}
    //   {/* <Profile contract={greeterDeployment[publicClient.chain.id]} /> */}
    //   {/* <Profile account={smartAccountClient.account.address} /> */}
    //   {/* <h1>Greeter Contract</h1>
    //   <p>Greeter Contract address: {greeterDeployment[publicClient.chain.id]}</p>
    //   <p>Greeter Contract Greeting: {data}</p>
    //   <pre>
    //     {JSON.stringify(smartAccountClient, null, 2)}
    //   </pre> */}
    // </div>
  );
}