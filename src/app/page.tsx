import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { rpcURL, publicClient, pimlicoPaymasterClient, pimlicoClient } from '@/lib/pimlico';
import { Address, UserOperation } from '@/lib/types';
import { baseSepolia } from 'viem/chains';
import { http } from "viem";

import { getAccountNonce, ENTRYPOINT_ADDRESS_V06, ENTRYPOINT_ADDRESS_V07, createSmartAccountClient } from 'permissionless';
import { privateKeyToSimpleSmartAccount } from 'permissionless/accounts';
import { getRequiredPrefund } from 'permissionless';

const debugPrivateKey = ''

export default withPageAuthRequired(async function Page() {
  const session = await getSession();

  const account = await privateKeyToSimpleSmartAccount(publicClient as any, {
    privateKey: debugPrivateKey,
    factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985",
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  });


  const senderBalance = await publicClient.getBalance({
    address: account.address,
  })

  console.log('senderBalance', senderBalance)

  const smartAccountClient = createSmartAccountClient({
    account,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: pimlicoClient.chain,
    bundlerTransport: http(rpcURL),
    middleware: {
      sponsorUserOperation: pimlicoClient.sponsorUserOperation,
      gasPrice: async () => {
        return (await pimlicoClient.getUserOperationGasPrice()).fast;
      },
    },
  });

  // const txHash = await smartAccountClient.sendTransaction({
  //   to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  //   value: 0n,
  //   data: "0x1234",
  //   chain: pimlicoClient.chain,
  // });
  // console.log('txHash', txHash);


  // /// 

  // const sender = account.address;

  // const contractCode = await publicClient.getBytecode({ address: sender });

  // const nonce = await getAccountNonce(publicClient as any, {
  //   entryPoint: ENTRYPOINT_ADDRESS_V06,
  //   sender
  // })

  // console.log('nonce', nonce)

  // const sponsoredUserOperation: UserOperation = {
  //   sender: account.address,
  //   nonce: 0n,
  //   initCode: contractCode ? '0x' : initCode,
  //   callData,
  //   callGasLimit: 1n, // All gas values will be filled by Estimation Response Data.
  //   verificationGasLimit: 1n,
  //   preVerificationGas: 1n,
  //   maxFeePerGas: 1n,
  //   maxPriorityFeePerGas: 1n,
  //   paymasterAndData: ERC20_PAYMASTER_ADDRESS,
  //   signature: '0x'
  // }

  return (
    <div className='p-6 space-y-4 text-xs'>
      <Button>
        <Link href={`https://sepolia.basescan.org/address/${account.address}`} target='_blank'>
          View Smart Contract Account
        </Link>
      </Button>
      <h1>[Session]</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>[Smart Account]</h1>
      <pre>{JSON.stringify(smartAccountClient, null, 2)}</pre>
    </div>
  );
}, { returnTo: '/' })