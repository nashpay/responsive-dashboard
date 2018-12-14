import * as types from './mutation-types';
import {
  storeCreate,
  storeUpdate,
  storeDelete,
  storeClear,
  storeActions,
} from '../../utils/objectStore';

export const updateTransferStep = ({ commit }, val) => {
  commit(types.transferStep, val);
};
export const updateSubAccountId = ({ commit }, val) => {
  commit(types.subAccountId, val);
};
export const updateRecipientList = ({ state, commit }, { data, dataId, action }) => {
  let val = '';
  if (action === storeActions.CREATE) {
    val = storeCreate(state.recipientList, data);
  }
  if (action === storeActions.UPDATE) {
    val = storeUpdate(state.recipientList, data, dataId);
  }
  if (action === storeActions.DELETE) {
    val = storeDelete(state.recipientList, dataId);
  }
  if (action === storeActions.CLEAR) {
    val = storeClear();
  }
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
export const updateRecipientAddBtn = ({ commit }, val) => {
  commit(types.recipientAddBtn, val);
};
