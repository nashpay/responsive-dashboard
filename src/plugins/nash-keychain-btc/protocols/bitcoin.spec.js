import { assert } from 'chai';
import bitcoinJS from  'bitcoinjs-lib';
import { Transaction, Networks } from './bitcoin'; 
import buffer from 'buffer/';


import {
  privKeyOne,
  privKeyTwo,
  privKeyThree,
  redeemScript,
  txNoSignatures,
  txOneSignature,
  txTwoSignatures,
} from './bitcoin.stubs';

const inputs = [{
  txHash: 'baa9e8b194153c280fe8bb1a671e4b25090d27a0c422e0242a85667bda8f9292',
  vout: 4, // Index of this output in previous transaction
  value: 32500000, // 0.325 Coin
}]; 
const outputs = [{
  address: '2NDr71pgHpL6sH3js8bg6bMtVVCPiehngxg',
  value: 32400000, // 0.324 Coins
}];

const walletOne = bitcoinJS.ECPair.fromPrivateKey(Buffer.from(privKeyOne, 'hex'), { network: Networks.testnet3 });
const walletTwo = bitcoinJS.ECPair.fromPrivateKey(Buffer.from(privKeyTwo, 'hex'), { network: Networks.testnet3 });
const walletThree = bitcoinJS.ECPair.fromPrivateKey(Buffer.from(privKeyThree, 'hex'), { network: Networks.testnet3 });

const pubKeys = [
  walletOne.publicKey,
  walletTwo.publicKey,
  walletThree.publicKey,
];

describe('NASH Bitcoin Keychain Operations', () => {
  describe('constructor', () => {
    it('should create a transaction for p2sh correctly with object params (network, inputs, outputs)', () => {
      const tx = Transaction({
        networkName: 'testnet3',
        inputs,
        outputs,
        pubKeys,
      });
      assert.equal(tx.toHex(), txNoSignatures);
      assert.equal(tx.getRedeemScript(), redeemScript);
    });
    it('should create a transaction for p2sh correctly with raw hex data', () => {
    });
  });
  describe('signWithPrivKey', () => {
    it('should sign the transaction inputs with 1 set of keys', () => {
      const tx = Transaction({
        networkName: 'testnet3',
        inputs,
        outputs,
        pubKeys,
      }).signWithPrivKey(privKeyOne);
      assert.equal(tx.toHex(), txOneSignature);
    });
    it('should fully sign the transaction inputs with 2 set of keys', () => {
      const tx = Transaction({
        networkName: 'testnet3',
        inputs,
        outputs,
        pubKeys,
      })
        .signWithPrivKey(privKeyOne, { encoding: 'hex' })
        .signWithPrivKey(privKeyTwo);
      assert.equal(tx.toHex(), txTwoSignatures);
      assert.equal(tx.isFullySigned(), true);
    });
  });
});
