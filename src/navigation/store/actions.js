import * as types from './mutation-types';

export const updatePopup = ({ commit }, popupState) => {
  commit(types.popupScreen, popupState);
};
export const updateLayover = ({ commit }, layoverState) => {
  commit(types.layoverScreen, layoverState);
};
export const updatePopupHeader = ({ commit }, header) => {
  commit(types.popupHeader, header);
};
export const updatePopupPage = ({ commit }, page) => {
  commit(types.popupPage, page);
};
