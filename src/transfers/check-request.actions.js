import { Bitcoin } from '../plugins/nash-keychain/';

const txInputReducer = (acc, row) => acc.concat({ txHash: row.txId, vout: row.vout, value: row.value });

const queryTransferRequestSingleOutput = function* q({ address, value, connector }) {
  const payload = { addresses: [{ address, value }] };
  const res = yield connector.postTransferRequest({ body: payload });
  console.log(res);
  if (res.statusCode === 200 && res.success === true) {
    // Could become legacy code in the future if the API changes...
    const inputs = res.body.txInputs.reduce(txInputReducer, []);
    const { txOutputs: outputs, currency: coin, network } = res.body;
    if (coin === 'BTC' && network === 'testnet') {
      const tx = Bitcoin.Transaction({
        networkName: 'testnet3',
        cache: {
          inputs,
          outputs,
        },
      });
    } 
  }
  // Reformat the res into a transaction
  const inputs = res.body
};

export {
  queryTransferRequestSingleOutput,
};
