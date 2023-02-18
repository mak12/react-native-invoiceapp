import {
  AuthReducer,
  AtuhActions,
  initialAppState,
  AuthStateType,
} from '../AuthSlice';

describe('Auth Reducer', () => {
  describe('setToken', () => {
    it('should set the token', () => {
      const token = 'Bearer AqwjhsctcSAD';
      const expected: AuthStateType = {
        ...initialAppState,
        token: token,
      };
      expect(
        AuthReducer(initialAppState, AtuhActions.onSetToken(token)),
      ).toEqual(expected);
    });
  });

  describe('loggedIn', () => {
    it('should set the auth state to logged in', () => {
      const expected: AuthStateType = {
        ...initialAppState,
        isLoggedIn: true,
      };
      expect(AuthReducer(initialAppState, AtuhActions.onLogin())).toEqual(
        expected,
      );
    });
  });

  describe('logout', () => {
    it('should set the auth state to logged out and remove token', () => {
      const expected: AuthStateType = {
        ...initialAppState,
        isLoggedIn: false,
        token: '',
      };
      expect(AuthReducer(initialAppState, AtuhActions.onLogout())).toEqual(
        expected,
      );
    });
  });
});
