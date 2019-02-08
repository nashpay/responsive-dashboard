import { assert } from 'chai';
import bitcoinJS from 'bitcoinjs-lib';
import bip32 from 'bip32';
import { Transaction, Networks } from './bitcoin';

import {
  privKeyOne,
  privKeyTwo,
  privKeyThree,
  chainCodeOne,
  chainCodeTwo,
  chainCodeThree,
  redeemScript,
  txNoSignatures,
  txOneSignature,
  txMultiNoSignatures,
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

const HDWallet1 = bip32.fromPrivateKey(walletOne.privateKey, Buffer.from(chainCodeOne, 'hex'), Networks.testnet3)
  .derive(0)
  .derive(5);
const pubKey1 = HDWallet1.publicKey;
const HDWallet2 = bip32.fromPrivateKey(walletTwo.privateKey, Buffer.from(chainCodeTwo, 'hex'), Networks.testnet3)
  .derive(0)
  .derive(5);
const pubKey2 = HDWallet2.publicKey;
const HDWallet3 = bip32.fromPrivateKey(walletThree.privateKey, Buffer.from(chainCodeThree, 'hex'), Networks.testnet3)
  .derive(0)
  .derive(5);
const pubKey3 = HDWallet3.publicKey;


const pubKeys = [
  Buffer.from(pubKey1, 'hex'),
  Buffer.from(pubKey2, 'hex'),
  Buffer.from(pubKey3, 'hex'),
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
      }).signWithPrivKey(HDWallet1.privateKey);
      assert.equal(tx.toHex(), txOneSignature);
    });
    it('should fully sign the multiple transaction inputs with 2 set of keys', () => {
      const manyInputs = [{
        txHash: 'baa9e8b194153c280fe8bb1a671e4b25090d27a0c422e0242a85667bda8f9292',
        value: 32500000, // 0.325 BTC
        vout: 4,
      }, {
        txHash: 'baa9e8b194153c280fe8bb1a671e4b25090d27a0c422e0242a85667bda8f9292',
        value: 32500000, // 0.325 BTC
        vout: 3,
      }];
      const manyOutputs = [{
        address: '2NDr71pgHpL6sH3js8bg6bMtVVCPiehngxg', // Change 0, Index 6
        value: 32400000,
      }, {
        address: '2NC1owWcEBTqyQtUZGwa2NKfQ7LU28uXdPt', // Change 0, Index 6
        value: 32400000,
      }];

      const tx = Transaction({
        networkName: 'testnet3',
        inputs: manyInputs,
        outputs: manyOutputs,
        pubKeys,
      });
      assert.equal(tx.toHex(), txMultiNoSignatures);
      const txSigned = tx.signWithPrivKey(HDWallet1.privateKey)
        .signWithPrivKey(HDWallet3.privateKey);
      assert.equal(txSigned.isFullySigned, true);
      assert.equal(txSigned.toHex(), txTwoSignatures);
    });
  });
});
