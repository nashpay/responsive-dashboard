export default {
  balance: {
    prePrompt: function* prePrompt(prior, cache) {
      return yield cache.promptSlave(prior);
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
};
