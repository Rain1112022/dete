import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    handleFlag: false,
    searchInput: {
      key: '',
      val: '',
    },
  }),

  getters: {
    getHandleFlag: (state) => {
      return state.handleFlag;
    },
    getSearchInput: (state) => {
      return state.searchInput;
    },
  },

  actions: {
    handleMsg(state) {
      this.handleFlag = state;
    },
    handleSearchInput(state) {
      this.searchInput = state;
    },
  },
});
