// To store the user state in redux
import { store } from "../store";

export const storeUser = user => ({
  type: "LOGIN_SUCCESS",
  payload: user
});

export const logoutUser = () => {
  store.dispatch({ type: "LOGOUT_USER" });
};
