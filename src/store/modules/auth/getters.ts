import { AuthState } from './state';
import { GetterTree } from 'vuex';

const getters: GetterTree<AuthState, any> = {
  authenticate: (state) => state.auth,
  isLoading: (state) => state.isLoading,
};

export default getters;
