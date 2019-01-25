// creds.js
import NodeRSA from 'node-rsa';

export default (opts) => {
  let privKey = {};
  if (typeof atob !== 'undefined') {
    privKey = new NodeRSA(atob(opts.API_SECRET));
  } else {
    const b64String = Buffer.from(opts.API_SECRET, 'base64').toString();
    // console.log(`b64 string: ${b64String}`);
    // privKey = new NodeRSA(Buffer.from(opts.API_SECRET, 'base64').toString());
    privKey = new NodeRSA(b64String);
  }
  return {
    API_KEY: opts.API_KEY,
    signBody: (x) => {
      console.log('To Sign');
      console.log(x);
      const signed = privKey.encrypt(x, 'base64');
      console.log('Signed');
      console.log(signed);
      return signed;
    },
  };
};
