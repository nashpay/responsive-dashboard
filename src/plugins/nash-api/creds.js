// creds.js
// import NodeRSA from 'node-rsa';
import crypto from 'crypto';
import ursa from 'ursa';


export default (opts) => {
  const privKey = ursa.createPrivateKey(opts.API_SECRET, '', 'base64');
  /*
  let privKey = {};
  if (typeof atob !== 'undefined') {
    // privKey = atob(opts.API_SECRET);
    privKey = new NodeRSA(atob(opts.API_SECRET));
  } else {
    const privKeyStr = Buffer.from(opts.API_SECRET, 'base64').toString();
    console.log(`privKeyStr: [${privKeyStr}]`);
    // console.log(`b64 string: ${b64String}`);
    privKey = new NodeRSA(privKeyStr, {
      environment: 'browser',
    });
    // privKey = new NodeRSA(b64String);
  }
  */
  return {
    API_KEY: opts.API_KEY,
    signBody: (x) => {
      //
      // const signer = crypto.createSign('SHA256');
      // signer.update(x);
      // const signed = privKey.encrypt(x, 'base64');
      // const signed = signer.sign(privKey, 'base64');
      const hash = crypto.createHash('sha256');
      hash.update(x);
      const payload = hash.digest();
	  const signer = ursa.createSigner('sha256');
      signer.update(payload);
      const signed = signer.sign(privKey).toString('base64');
      return signed;
    },
  };
};
