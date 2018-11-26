import moment from 'moment';

export default {
  list: {
    prePrompt: function* prePrompt(prior, cache) {
      //
    },
    postPrompt: function* postPrompt(pInput, schema) {
      return pInput;
    },
    preReq: function* preReq(rawPayload, cache) {
      const payload = { };
      Object.assign(payload, rawPayload);
      const headers = {};
      if (payload.slave !== 'default') {
        const subAccId = yield cache.getSubAccountIdByName(payload.slave);
        Object.assign(headers, { 'X-SubAccount-Id': subAccId });
      }
      delete payload.slave;
      return { payload, headers };
    },
    postReq: () => {

    },
  },
  create: {
    prePrompt: function* prePrompt(prior, cache) {
      // return yield cache.promptSlave(prior);
    },
    postPrompt: function* postPrompt(pInput, schema) {
      return pInput;
    },
    preReq: function* preReq(rawPayload, cache) {
      const tagList = rawPayload.tag.split('-');
      const network = tagList[1];
      const currency = tagList[0];
      const timestamp = moment().utc().unix();
      const payload = { network, currency, timestamp };
      Object.assign(payload, rawPayload);
      const headers = {};
      console.log('rawPayload');
      console.log(rawPayload);
      if (rawPayload.slave !== 'default') {
        const subAccId = yield cache.getSubAccountIdByName(rawPayload.slave);
        Object.assign(headers, { 'X-SubAccount-Id': subAccId });
      }
      delete payload.tag;
      delete payload.slave;
      return { payload, headers };
    },
    postReq: () => {

    },
  },
};
