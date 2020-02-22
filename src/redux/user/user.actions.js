// To store the user state in redux

export const storeUser = user => ({
  type: "LOGIN_SUCCESS",
  payload: user
});

export const logoutUser = _ => ({
  type: "LOGOUT_USER"
});
