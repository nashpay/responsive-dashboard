import { Bitcoin } from '../plugins/nash-keychain';
import TxStore from './tx-store';

const txInputReducer = allInputs => (acc, row, idx) => acc.concat({
  txHash: row.txId,
  vout: row.vout,
  value: row.value,
  redeemScript: allInputs[idx].redeem,
});

const queryTransferRequestSingleOutput = function* q({ address, value, connector }) {
  const payload = { addresses: [{ address, value }] };
  const res = yield connector.postTransferRequest({ body: payload });
  if (res.statusCode === 200 && res.success === true) {
    // Could become legacy code in the future if the API changes...
    const inputs = res.body.txInputs.reduce(txInputReducer(res.body.txInfo.allInputs), []);
    //
    const { txOutputs: outputs, currency: coin, network } = res.body;
    if (coin === 'BTC' && network === 'testnet') {
      const tx = Bitcoin.Transaction({
        networkName: 'testnet3',
        // data: res.body.txInfo.txinc,
        inputs,
        outputs,
      });
      TxStore.dispatch('saveTxInputs', inputs);
      TxStore.dispatch('saveTxOutputs', outputs);
      TxStore.dispatch('saveTxCoin', coin);
      TxStore.dispatch('saveTxNetwork', network);
      return tx;
    }
    return false;
  }
  return false;
};

const makeTX = ({ coin, network, inputs, outputs }) => {
  if (coin === 'BTC' && network === 'testnet') {
    const tx = Bitcoin.Transaction({
      networkName: 'testnet3',
      // data: res.body.txInfo.txinc,
      inputs,
      outputs,
    });
    return tx;
  }
};

const makeTXFromStore = () => {
  const {
    txInputs,
    txOutputs,
    txCoin,
    txNetwork,
  } = TxStore.state;
  return makeTX({
    coin: txCoin,
    inputs: txInputs,
    outputs: txOutputs,
    network: txNetwork,
  });
};

export {
  queryTransferRequestSingleOutput,
  makeTXFromStore,
};
