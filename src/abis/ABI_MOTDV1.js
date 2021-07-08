export const ABI_MOTD_V1 = [
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "account",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "operator",
  "type": "address"
  },
  {
  "indexed": false,
  "internalType": "bool",
  "name": "approved",
  "type": "bool"
  }
  ],
  "name": "ApprovalForAll",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": false,
  "internalType": "address",
  "name": "creator",
  "type": "address"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "tokenId",
  "type": "uint256"
  }
  ],
  "name": "MemeMinted",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "previousOwner",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "newOwner",
  "type": "address"
  }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": false,
  "internalType": "address",
  "name": "account",
  "type": "address"
  }
  ],
  "name": "Paused",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "operator",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "from",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "to",
  "type": "address"
  },
  {
  "indexed": false,
  "internalType": "uint256[]",
  "name": "ids",
  "type": "uint256[]"
  },
  {
  "indexed": false,
  "internalType": "uint256[]",
  "name": "values",
  "type": "uint256[]"
  }
  ],
  "name": "TransferBatch",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "operator",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "from",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "to",
  "type": "address"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "id",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "value",
  "type": "uint256"
  }
  ],
  "name": "TransferSingle",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": false,
  "internalType": "string",
  "name": "value",
  "type": "string"
  },
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "id",
  "type": "uint256"
  }
  ],
  "name": "URI",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": false,
  "internalType": "address",
  "name": "account",
  "type": "address"
  }
  ],
  "name": "Unpaused",
  "type": "event"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "account",
  "type": "address"
  },
  {
  "internalType": "uint256",
  "name": "id",
  "type": "uint256"
  }
  ],
  "name": "balanceOf",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address[]",
  "name": "accounts",
  "type": "address[]"
  },
  {
  "internalType": "uint256[]",
  "name": "ids",
  "type": "uint256[]"
  }
  ],
  "name": "balanceOfBatch",
  "outputs": [
  {
  "internalType": "uint256[]",
  "name": "",
  "type": "uint256[]"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "creatorFee",
  "outputs": [
  {
  "internalType": "int256",
  "name": "",
  "type": "int256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "creatorOf",
  "outputs": [
  {
  "internalType": "address",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "hashes",
  "outputs": [
  {
  "internalType": "string",
  "name": "",
  "type": "string"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "account",
  "type": "address"
  },
  {
  "internalType": "address",
  "name": "operator",
  "type": "address"
  }
  ],
  "name": "isApprovedForAll",
  "outputs": [
  {
  "internalType": "bool",
  "name": "",
  "type": "bool"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "owner",
  "outputs": [
  {
  "internalType": "address",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "ownerOf",
  "outputs": [
  {
  "internalType": "address",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "paused",
  "outputs": [
  {
  "internalType": "bool",
  "name": "",
  "type": "bool"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "from",
  "type": "address"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  },
  {
  "internalType": "uint256[]",
  "name": "ids",
  "type": "uint256[]"
  },
  {
  "internalType": "uint256[]",
  "name": "amounts",
  "type": "uint256[]"
  },
  {
  "internalType": "bytes",
  "name": "data",
  "type": "bytes"
  }
  ],
  "name": "safeBatchTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "from",
  "type": "address"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  },
  {
  "internalType": "uint256",
  "name": "id",
  "type": "uint256"
  },
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "internalType": "bytes",
  "name": "data",
  "type": "bytes"
  }
  ],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "operator",
  "type": "address"
  },
  {
  "internalType": "bool",
  "name": "approved",
  "type": "bool"
  }
  ],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "bytes4",
  "name": "interfaceId",
  "type": "bytes4"
  }
  ],
  "name": "supportsInterface",
  "outputs": [
  {
  "internalType": "bool",
  "name": "",
  "type": "bool"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "newOwner",
  "type": "address"
  }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "uri",
  "outputs": [
  {
  "internalType": "string",
  "name": "",
  "type": "string"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "initialize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "string",
  "name": "_newUri",
  "type": "string"
  }
  ],
  "name": "setUri",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "string",
  "name": "_hash",
  "type": "string"
  },
  {
  "internalType": "int256",
  "name": "_creatorFee",
  "type": "int256"
  }
  ],
  "name": "mint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "string",
  "name": "_hash",
  "type": "string"
  }
  ],
  "name": "getTokenID",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "tokenID",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "getMemesCount",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "count",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "pause",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "unpause",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "sayHello",
  "outputs": [
  {
  "internalType": "string",
  "name": "",
  "type": "string"
  }
  ],
  "stateMutability": "pure",
  "type": "function"
  }
  ]