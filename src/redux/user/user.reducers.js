const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    case "LOGOUT_USER":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
