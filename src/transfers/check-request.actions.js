import { Bitcoin } from '../plugins/nash-keychain';
import TxStore from './tx-store';
import AuthStore from '../auth/store';

const txInputReducer = allInputs => (acc, row, idx) => acc.concat({
  txHash: row.txId,
  vout: row.vout,
  value: row.value,
  redeemScript: allInputs[idx].redeem,
  change: row.change,
  index: row.index,
});

const queryTransferRequestSingleOutput = function* q({ address, value, connector }) {
  const payload = { addresses: [{ address, value }] };
  const res = yield connector.postTransferRequest({ body: payload });
  if (res.statusCode === 200 && res.success === true) {
    // Could become legacy code in the future if the API changes...
    const inputs = res.body.txInputs.reduce(txInputReducer(res.body.txInfo.allInputs), []);
    //
    const { txOutputs: outputs, currency: coin, network, subAccountId } = res.body;
    if (coin === 'BTC' && network === 'testnet') {
      const tx = Bitcoin.Transaction({
        networkName: 'testnet3',
        // data: res.body.txInfo.txinc,
        inputs,
        outputs,
      });
      TxStore.dispatch('saveAccountId', String(subAccountId));
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

// BIP44 Mappings
const bip44Map = {
  'BTC': {
    'testnet': 'm/44\'/1\'',
  }
};

const walletFromSeedphrase = ({ phrase }) => {
  const {
    txCoin,
    txNetwork,
    accountId,
  } = TxStore.state;
  const bip44 = `${bip44Map[txCoin][txNetwork]}`;
  const accountList = AuthStore.getters.getAllAccounts;
  if (accountList !== false) {
    if (Object.hasOwnProperty.call(accountList, accountId) === false) {
      const derivPath = `${bip44}/10000\'`;
      if (txCoin === 'BTC' && txNetwork === 'testnet') {
        console.log(derivPath);
        const wallet = Bitcoin.Wallet({}).fromSeedphrase(phrase, derivPath, 'testnet3');
        console.log(wallet.getPrivKey());
        return wallet;
      }
      return false;
    }
    return false;
  }
  return false;
};

export {
  queryTransferRequestSingleOutput,
  walletFromSeedphrase,
  makeTXFromStore,
};
