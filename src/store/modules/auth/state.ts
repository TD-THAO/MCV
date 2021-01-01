import { Authenticate } from '@/shared/models/authenticate';

export interface AuthState {
  token: string | null;
  isLoading: boolean;
  auth: Authenticate;
}

const state: AuthState = {
  token: null,
  isLoading: false,
  auth: new Authenticate(),
};

export default state;
