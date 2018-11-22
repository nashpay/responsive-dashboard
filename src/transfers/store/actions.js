import * as types from './mutation-types';

export const updateTransferStep = ({ commit }, val) => {
  commit(types.transferStep, val);
};
export const updateSubAccountId = ({ commit }, val) => {
  commit(types.subAccountId, val);
};
export const updateRecipientList = ({ commit }, val) => {
  commit(types.recipientList, val);
};
export const updateTransferDetails = ({ commit }, val) => {
  commit(types.transferDetails, val);
};
export const updateTransferRequestStatus = ({ commit }, val) => {
  commit(types.transferRequestStatus, val);
};
export const updateTransferResponse = ({ commit }, val) => {
  commit(types.transferResponse, val);
};
