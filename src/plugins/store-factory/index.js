const camelToSnake = /(?=[A-Z])/;

const nameAction = x => `save${x.charAt(0).toUpperCase()}${x.slice(1)}`;

const mutationFn = k => (s, v) => Object.assign(s, { [k]: v });

const actionScaffold = types => k => ({ commit }, v) => commit(types[k], v);

const storeFactory = (schema, opts = {}) => {
  const types = schema.reduce((acc, x) => {
    const y = x.split(camelToSnake).join('_').toUpperCase();
    return { ...acc, [x]: y };
  }, {});
  const mutations = schema.reduce((acc, x) => ({ ...acc, [types[x]]: mutationFn(x) }), {});
  const actionFn = actionScaffold(types);
  const actions = schema.reduce((acc, x) => ({ ...acc, [nameAction(x)]: actionFn(x) }), {});
  const state = schema.reduce((acc, x) => ({ ...acc, [x]: 'STORE_DEFAULT' }), {});
  return {
    types,
    mutations,
    actions,
    state,
  };
};

export {
  storeFactory,
};
