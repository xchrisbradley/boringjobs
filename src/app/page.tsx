"use client";
import { getAccount } from '@/actions';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Address } from 'abitype';
import { use, useEffect, useState } from 'react';


export default withPageAuthRequired(function Page({ user }) {


  // const smartAccountClient = createSmartAccountClient({
  //   account,
  //   entryPoint: ENTRYPOINT_ADDRESS_V07,
  //   chain: sepolia,
  //   bundlerTransport: http(pimlicoUrl),
  //   middleware: {
  //     sponsorUserOperation: pimlicoClient.sponsorUserOperation,
  //     gasPrice: async () => {
  //       return (await pimlicoClient.getUserOperationGasPrice()).fast;
  //     },
  //   },
  // });

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
});