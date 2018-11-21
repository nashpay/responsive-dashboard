import * as types from './mutation-types';

export const updateDepositStep = ({ commit }, val) => {
  commit(types.depositStep, val);
};
export const updateSubAccountId = ({ commit }, val) => {
  commit(types.subAccountId, val);
};
export const updateDepositDetails = ({ commit }, val) => {
  commit(types.depositDetails, val);
};
export const updateDepositRequestStatus = ({ commit }, val) => {
  commit(types.depositRequestStatus, val);
};
export const updateDepositResponse = ({ commit }, val) => {
  commit(types.depositResponse, val);
};
