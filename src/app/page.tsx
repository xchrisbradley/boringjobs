import { getContract } from 'viem';

import { publicClient, smartAccountClient } from '@/lib/pimlico';
import { greeterDeployment, jobBoardDeployment } from '@/lib/deployments';
import { writeContract } from '@/actions';

import JobBoardContract from '@/abis/JobBoard.json';
import { Contract } from '@/components/Contract';

export const runtime = 'edge'

export default async function Page() {
  const owner = await publicClient.readContract({
    // @ts-ignore
    address: jobBoardDeployment[publicClient.chain.id],
    abi: JobBoardContract.abi,
    functionName: 'owner',
  })

  return (
    <div className='p-6 space-y-4 text-xs'>
      {/* @ts-ignore */}
      <div>Job Board Owner: {owner}</div>
      <Contract name='owner' value={owner} action={writeContract} func={'transferOwnership'} abi={JobBoardContract.abi} address={jobBoardDeployment[publicClient.chain.id]} />
    </div>
  );
}