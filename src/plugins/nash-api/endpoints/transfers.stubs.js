const createTransferReply = {
  txInfo: {
    txinc: '02000000010c471fc88aa23e2ddb1d393a39ad467da09f079d4272d624530778a49426b8270000000000ffffffff02102700000000000017a914631441f745d8d419a58c33fc808e0e83fa7d420d87d04d1e000000000017a9145d61fb986d3e2be7918f86c1dd3605ce58a2a0458700000000',
    allInputs: [
      {
        redeem: '5221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853ae',
        txId: '27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c',
        vout: 0,
        change: 0,
        index: 170,
        value: 2000000,
        cfmTxId: 91,
      },
    ],
  },
  txInputs: [
    {
      txId: '27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c',
      vout: 0,
      change: 0,
      index: 170,
      value: 2000000,
      cfmTxId: 91,
    },
  ],
  txOutputs: [
    {
      address: '2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m',
      value: 10000,
    },
    {
      address: '2N1kzD64dLPSG1EdEwvbVw6AQtfdZ1FNKHD',
      value: 1986000,
      addressId: 208,
    },
  ],
  subAccountId: 1,
  currency: 'BTC',
  network: 'testnet',
};

const signTransferPostBody = {
  txInfo: {
    txinc: '02000000010c471fc88aa23e2ddb1d393a39ad467da09f079d4272d624530778a49426b82700000000b700483045022100b3b1f31a741fe05a8b732dd9c467a99ab7fc493191f1019f817b38c4173b928902201366c35df24130ce0fed33d348c585dcd077b5d2365d2ef37f0e429d0ae4f3f30100004c695221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853aeffffffff02102700000000000017a914631441f745d8d419a58c33fc808e0e83fa7d420d87d04d1e000000000017a9145d61fb986d3e2be7918f86c1dd3605ce58a2a0458700000000',
    allInputs: [
      {
        redeem: '5221025626d8f08798da73aba87facd0fc38bc53a78d6dc014e61d9e9419b5a8ff83e22102ded2fdb140ada8bd42951e3ea288a8b9a7f0899156c2b9af110988b73e5f147a2102554f1bb274cd0ff59b09001f5bb6a70aed6551a221f312261b53a140b9ac10a853ae',
        txId: '27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c',
        vout: 0,
        change: 0,
        index: 170,
        value: 2000000,
        cfmTxId: 91,
      },
    ],
  },
  txInputs: [
    {
      txId: '27b82694a478075324d672429d079fa07d46ad393a391ddb2d3ea28ac81f470c',
      vout: 0,
      change: 0,
      index: 170,
      value: 2000000,
      cfmTxId: 91,
    },
  ],
  txOutputs: [
    {
      address: '2N2H79oYtZi446FYi1oNxSoCTQVBYG4Vz3m',
      value: 10000,
    },
    {
      address: '2N1kzD64dLPSG1EdEwvbVw6AQtfdZ1FNKHD',
      value: 1986000,
      addressId: 208,
    },
  ],
  subAccountId: 1,
  currency: 'BTC',
  network: 'testnet',
};

export {
  createTransferReply,
  signTransferPostBody,
};
