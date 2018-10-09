import * as types from './mutation-types';

export const toggleSidebarOn = ({ commit }) => {
  commit(types.sidebarSwitch, true);
};

export const toggleSidebarOff = ({ commit }) => {
  commit(types.sidebarSwitch, false);
};

export const setTitle = ({ commit }, { title }) => {
  commit(types.titleSet, title);
};

export const setHeaderBackLink = ({ commit }, { backLink }) => {
  commit(types.headerBackLinkSet, backLink);
};

export const setHeaderActionIcon = ({ commit }, { iconName }) => {
  commit(types.headerActionIconSet, iconName);
};

export const setHeaderActionLink = ({ commit }, { actionLink }) => {
  commit(types.headerActionLinkSet, actionLink);
};

export const setActiveTab = ({ commit }, { tabName }) => {
  commit(types.tabActive, tabName);
};
