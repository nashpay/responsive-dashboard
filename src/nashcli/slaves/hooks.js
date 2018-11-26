export default {
  list: {
    preReq: (rawPayload) => {
      return { payload: {}, headers: {} };
    },
    postReq: () => {

    },
  },
  create: {
    preReq: (rawPayload) => {
      return { payload: rawPayload, headers: {} };
    },
    postReq: () => {

    },
  },
};
