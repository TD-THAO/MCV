import { AuthState } from './state';
import { GetterTree } from 'vuex';

const getters: GetterTree<AuthState, any> = {
  user: (state) => state.user,
};

export default getters;
