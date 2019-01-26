// creds.js
// import NodeRSA from 'node-rsa';
import crypto from 'crypto';
// import ursa from 'ursa';


export default (opts) => {
  /* @TODO Ursa Implementation does not work in browser 
    const privKey = ursa.createPrivateKey(opts.API_SECRET, '', 'base64');
  */
  let privKey = '';
  if(typeof atob !== 'undefined') {
    privKey = atob(opts.API_SECRET);
  } else {
    privKey =  Buffer.from(opts.API_SECRET, 'base64').toString();
  }
  return {
    API_KEY: opts.API_KEY,
    signBody: (x) => {
      /* TODO Ursa Implementation does not work in browser 
      const hash = crypto.createHash('sha256');
      hash.update(x);
      const payload = hash.digest();
	  const signer = ursa.createSigner('sha256');
      signer.update(payload);
      const signed = signer.sign(privKey).toString('base64');
      return signed;
      */
      const hash = crypto.createHash('sha256');
      hash.update(x);
      const payload = hash.digest();
      const signer = crypto.createSign('SHA256');
      // signer.update(payload.toString('base64'));
      signer.update(payload);
      const signed = signer.sign(privKey, 'base64');
      return signed;
    },
  };
};
