const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    case "LOGOUT_USER": {
      console.log("this is working....");
      return null;
    }
    default:
      return state;
  }
};
