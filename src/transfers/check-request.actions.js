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

const queryTransferRequestSingleOutput = function* q({ address, value, satPerByte, connector }) {
  const payload = { addresses: [{ address, value }], satPerByte: parseInt(satPerByte, 10) };
  const res = yield connector.postTransferRequest({ body: payload });
  // TODO By Right it should have returned { success: true, result } , ignore for now
  const { body } = res;
  if (res.statusCode === 200 && typeof body.subAccountId !== 'undefined') {
    // 
    const {
      txInputs: rawInputs,
      txOutputs: outputs,
      currency: coin,
      network,
      subAccountId,
    } = body;
    const inputs = rawInputs.reduce((acc, row) => {
      return acc.concat({
        txHash: row.txId,
        vout: row.vout,
        value: row.value,
        redeemScript: row.redeem,
      });
    }, []);

    if (coin === 'BTC' && network === 'live') {
      const tx = Bitcoin.Transaction({
	networkName: 'main',
	// data: res.body.txInfo.txinc,
	inputs,
	outputs,
      });
      TxStore.dispatch('saveDestAddr', address);
      TxStore.dispatch('saveDestValue', value);
      TxStore.dispatch('saveTxResponse', JSON.stringify(res.body));
      TxStore.dispatch('saveAccountId', String(subAccountId));
      TxStore.dispatch('saveTxInputs', inputs);
      TxStore.dispatch('saveTxOutputs', outputs);
      TxStore.dispatch('saveTxCoin', coin);
      TxStore.dispatch('saveTxNetwork', network);
    }
  }
};

const queryTransferRequestSingleOutputLegacy = function* q({ address, value, connector }) {
  const payload = { addresses: [{ address, value }] };
  const res = yield connector.postTransferRequest({ body: payload });
  if (res.statusCode === 200 && res.success === true) {
    // Could become legacy code in the future if the API changes...
    // Became Legacy on March 27 2019
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
      TxStore.dispatch('saveDestAddr', address);
      TxStore.dispatch('saveDestValue', value);
      TxStore.dispatch('saveTxResponse', JSON.stringify(res.body));
      TxStore.dispatch('saveAccountId', String(subAccountId));
      TxStore.dispatch('saveTxInputs', inputs);
      TxStore.dispatch('saveTxOutputs', outputs);
      TxStore.dispatch('saveTxCoin', coin);
      TxStore.dispatch('saveTxNetwork', network);
      return tx;
    }
    if (coin === 'BTC' && network === 'live') {
      const tx = Bitcoin.Transaction({
        networkName: 'main',
        // data: res.body.txInfo.txinc,
        inputs,
        outputs,
      });
      TxStore.dispatch('saveDestAddr', address);
      TxStore.dispatch('saveDestValue', value);
      TxStore.dispatch('saveTxResponse', JSON.stringify(res.body));
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

const signTransferRequestLegacy = function* q({ tx, connector }) {
  console.log('signTransferRequest called...');
  const payload = JSON.parse(TxStore.state.txResponse);
  console.log(payload);
  payload.txInfo.txinc = tx.toHex();
  console.log(payload);
  const res = yield connector.postTransferSign({ body: payload });
  if (res.statusCode === 200 && res.success === true) {
    // Could become legacy code in the future if the API changes...
    // Became Legacy 27th March 2019
    return res;
  }
  return false;
};

const signTransferRequest = function* q({ tx, connector }) {
  console.log('signTransferRequest called...');
  /*
  const payload = JSON.parse(TxStore.state.txResponse);
  console.log(payload);
  payload.txInfo.txinc = tx.toHex();
  console.log(payload);
  */
  const payload = { txSigned: tx.toHex() };
  const res = yield connector.postTransferSign({ body: payload });
  if (res.statusCode === 200 && res.success === true) {
    return res;
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
  if (coin === 'BTC' && network === 'live') {
    const tx = Bitcoin.Transaction({
      networkName: 'main',
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
  BTC: {
    testnet: 'm/44\'/1\'',
    live: 'm/44\'/0\'',
  },
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
      const derivPath = `${bip44}/10000'`;
      if (txCoin === 'BTC' && txNetwork === 'testnet') {
        const wallet = Bitcoin.Wallet({}).fromSeedphrase(phrase, derivPath, 'testnet3');
        return wallet;
      }
      if (txCoin === 'BTC' && txNetwork === 'live') {
        const wallet = Bitcoin.Wallet({}).fromSeedphrase(phrase, derivPath, 'main');
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
  signTransferRequest,
  walletFromSeedphrase,
  makeTXFromStore,
};
