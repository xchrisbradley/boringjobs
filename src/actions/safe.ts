import { encodeFunctionData, encodePacked } from "viem";
import type { Address } from "viem";
import { isZeroAddress } from "ethereumjs-util";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// erc paymaster base sepolia: 0x0000000000dd6dd248ab5487218e1c2d7fbb29c9
// erc base sepolia: 0x036CbD53842c5426634e7929541eC2318f3dCF7e

export type InternalTx = {
  to: Address;
  data: `0x${string}`;
  value: bigint;
  operation: 0 | 1;
};

export const enableModuleCallData = (safe4337ModuleAddress: `0x${string}`) => {
  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address[]",
            name: "modules",
            type: "address[]",
          },
        ],
        name: "enableModules",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "enableModules",
    args: [[safe4337ModuleAddress]],
  });
};

export const getInitializerCode = async ({
  owner,
  addModuleLibAddress,
  safe4337ModuleAddress,
  multiSendAddress,
  erc20TokenAddress,
  paymasterAddress,
}: {
  owner: Address;
  addModuleLibAddress: Address;
  safe4337ModuleAddress: Address;
  multiSendAddress: Address;
  erc20TokenAddress: Address;
  paymasterAddress: Address;
}) => {
  const setupTxs: InternalTx[] = [
    {
      to: addModuleLibAddress,
      data: enableModuleCallData(safe4337ModuleAddress),
      value: 0n,
      operation: 1, // 1 = DelegateCall required for enabling the module
    },
  ];

  if (!isZeroAddress(erc20TokenAddress) && !isZeroAddress(paymasterAddress)) {
    setupTxs.push({
      to: erc20TokenAddress,
      data: generateApproveCallData(paymasterAddress),
      value: 0n,
      operation: 0, // 0 = Call
    });
  }

  const multiSendCallData = encodeMultiSend(setupTxs);

  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_owners",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "_threshold",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "fallbackHandler",
            type: "address",
          },
          {
            internalType: "address",
            name: "paymentToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "payment",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "paymentReceiver",
            type: "address",
          },
        ],
        name: "setup",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "setup",
    args: [
      [owner],
      1n,
      multiSendAddress,
      multiSendCallData,
      safe4337ModuleAddress,
      ZERO_ADDRESS,
      0n,
      ZERO_ADDRESS,
    ],
  });
};

const encodeMultiSend = (txs: InternalTx[]): `0x${string}` => {
  const data: `0x${string}` = `0x${txs
    .map((tx) => encodeInternalTransaction(tx))
    .join("")}`;

  return encodeFunctionData({
    abi: [
      {
        inputs: [
          { internalType: "bytes", name: "transactions", type: "bytes" },
        ],
        name: "multiSend",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "multiSend",
    args: [data],
  });
};

const encodeInternalTransaction = (tx: InternalTx): string => {
  const encoded = encodePacked(
    ["uint8", "address", "uint256", "uint256", "bytes"],
    [
      tx.operation,
      tx.to,
      tx.value,
      BigInt(tx.data.slice(2).length / 2),
      tx.data,
    ]
  );
  return encoded.slice(2);
};
