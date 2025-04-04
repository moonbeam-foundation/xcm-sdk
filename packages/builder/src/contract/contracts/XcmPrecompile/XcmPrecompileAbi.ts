export const XCM_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'dest',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'beneficiary',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'parents',
                type: 'uint8',
              },
              {
                internalType: 'bytes[]',
                name: 'interior',
                type: 'bytes[]',
              },
            ],
            internalType: 'struct XCM.Location',
            name: 'location',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetLocationInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint32',
        name: 'feeAssetItem',
        type: 'uint32',
      },
    ],
    name: 'transferAssetsLocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'paraId',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetAddressInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint32',
        name: 'feeAssetItem',
        type: 'uint32',
      },
    ],
    name: 'transferAssetsToPara20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'paraId',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: 'beneficiary',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetAddressInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint32',
        name: 'feeAssetItem',
        type: 'uint32',
      },
    ],
    name: 'transferAssetsToPara32',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'beneficiary',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetAddressInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint32',
        name: 'feeAssetItem',
        type: 'uint32',
      },
    ],
    name: 'transferAssetsToRelay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'dest',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetAddressInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'enum XCM.TransferType',
        name: 'assetsTransferType',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'remoteFeesIdIndex',
        type: 'uint8',
      },
      {
        internalType: 'enum XCM.TransferType',
        name: 'feesTransferType',
        type: 'uint8',
      },
      {
        internalType: 'bytes',
        name: 'customXcmOnDest',
        type: 'bytes',
      },
    ],
    name: 'transferAssetsUsingTypeAndThenAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'dest',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetAddressInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint8',
        name: 'remoteFeesIdIndex',
        type: 'uint8',
      },
      {
        internalType: 'bytes',
        name: 'customXcmOnDest',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'remoteReserve',
        type: 'tuple',
      },
    ],
    name: 'transferAssetsUsingTypeAndThenAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'dest',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'parents',
                type: 'uint8',
              },
              {
                internalType: 'bytes[]',
                name: 'interior',
                type: 'bytes[]',
              },
            ],
            internalType: 'struct XCM.Location',
            name: 'location',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetLocationInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'enum XCM.TransferType',
        name: 'assetsTransferType',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'remoteFeesIdIndex',
        type: 'uint8',
      },
      {
        internalType: 'enum XCM.TransferType',
        name: 'feesTransferType',
        type: 'uint8',
      },
      {
        internalType: 'bytes',
        name: 'customXcmOnDest',
        type: 'bytes',
      },
    ],
    name: 'transferAssetsUsingTypeAndThenLocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'dest',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint8',
                name: 'parents',
                type: 'uint8',
              },
              {
                internalType: 'bytes[]',
                name: 'interior',
                type: 'bytes[]',
              },
            ],
            internalType: 'struct XCM.Location',
            name: 'location',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct XCM.AssetLocationInfo[]',
        name: 'assets',
        type: 'tuple[]',
      },
      {
        internalType: 'uint8',
        name: 'remoteFeesIdIndex',
        type: 'uint8',
      },
      {
        internalType: 'bytes',
        name: 'customXcmOnDest',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XCM.Location',
        name: 'remoteReserve',
        type: 'tuple',
      },
    ],
    name: 'transferAssetsUsingTypeAndThenLocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
