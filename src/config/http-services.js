import axios from "axios";

/**
 * interceptors is like a middleware it fire between request and response
 * Further more https://www.sitepoint.com/axios-beginner-guide/
 *
 */

axios.interceptors.response.use(
  // Set token to header
  function(config) {
    // For incase end point auth

    // Set Token axios header
    // const token = store.getState().user.access_token;
    // config.headers.Authorization = token || null;
    // return config;

    return;
  },
  error => {
    //Expected errors for debugging
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
    } else {
      if (error.response.data.status) {
        errorHandler(error.response);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
