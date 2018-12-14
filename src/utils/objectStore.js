import uuid from 'uuid/v4';

const clone = function clone(x) {
  return JSON.parse(JSON.stringify(x));
};

export const storeActions = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  CLEAR: 5,
};

export const storeCreate = function storeAdd(initState, val) {
  const workState = clone(initState);
  const newVal = clone(val);
  const id = uuid();
  Object.assign(newVal, { id });
  workState.push(newVal);
  return workState;
};

export const storeUpdate = function storeAdd(initState, val, id) {
  const workState = clone(initState);
  const newVal = clone(val);
  const findIndex = workState.findIndex(x => x.id === id);
  if (findIndex !== -1) {
    workState[findIndex] = newVal;
  }
  return workState;
};

export const storeDelete = function storeDelete(initState, id) {
  const workState = clone(initState);
  const findIndex = workState.findIndex(x => x.id === id);
  if (findIndex !== -1) {
    workState.splice(findIndex, 1);
  }
  return workState;
};

export const storeClear = function storeClear() {
  return [];
};
