const intialState = {
  loginSuccess: '',
  loginError: '',
  signinSuccess: '',
  signinFailure: '',
  isAuth: '',
  isAuthFail: null,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginSuccess: action.status,
        loginError: '',
        isAuth: action.status,
        isAuthFail: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, loginError: action.err, loginSuccess: '' };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        signinSuccess: action.status,
        signinFailure: '',
        isAuth: action.status,
        isAuthFail: null,
      };
    case 'SIGNIN_FAILURE':
      return { ...state, signinFailure: action.err, signinSuccess: '' };
    case 'IS_AUTH_SUCCESS':
      return { ...state, isAuth: action.user, isAuthFail: null };
    case 'IS_AUTH_FAILURE':
      return { ...state, isAuthFail: action.err, isAuth: '' };
    case 'CLEAR_LOGIN':
      return { ...state, loginError: '' };
    case 'CLEAR_SIGNIN':
      return { ...state, signinFailure: '' };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isAuth: '',
        isAuthFail: '',
        loginSuccess: '',
        loginError: '',
        signinSuccess: '',
        signinFailure: '',
      };
    default:
      return state;
  }
};

export default reducer;
