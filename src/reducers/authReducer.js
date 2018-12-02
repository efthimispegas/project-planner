const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      };

    case 'LOGIN_FAIL':
      console.log('login fail');
      return {
        ...state,
        authError: action.error
      };

    case 'SIGNUP_SUCCESS':
      console.log('sign up success');
      return {
        ...state,
        authError: null
      };

    case 'SIGNUP_FAIL':
      console.log('sign up fail');
      return {
        ...state,
        authError: action.error
      };

    case 'SIGNOUT_SUCCESS':
      console.log('singout success');
      return {
        ...state
      };

    case 'SIGNOUT_FAIL':
      return {
        ...state
      };

    default:
      return state;
  }
};

export default authReducer;
