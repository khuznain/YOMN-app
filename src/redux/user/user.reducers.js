const INITIAL_STATE = {
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload
      };
    case "RESET_APP_STATE":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
