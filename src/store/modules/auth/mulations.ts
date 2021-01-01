import { MutationTree } from 'vuex';
import { AuthState } from './state';
import { Authenticate } from '@/shared/models/authenticate';

const mutations: MutationTree<AuthState> = {
  // UPDATE_TOKEN: (state, payload: string) => {
  //   state.token = payload;
  // },
  // REMOVE_TOKEN: (state) => {
  //   state.token = null;
  // },
  // SET_LOADING: (state, payload: boolean) => {
  //   state.isLoading = payload;
  // },
  // SET_IS_REGISTER_SUCCESS: (state, payload: boolean) => {
  //   state.isRegisterSuccess = payload;
  // },
  setUser(state, payload: Authenticate) {
    state.auth = payload;
  }
};
export default mutations;
