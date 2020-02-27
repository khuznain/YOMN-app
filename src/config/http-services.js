import axios from "axios";

/**
 * interceptors is like a middleware it fire between request and response
 * Further more https://www.sitepoint.com/axios-beginner-guide/
 *
 */

axios.interceptors.response.use(
  response => {
    return response;
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
  patch: axios.patch,
  delete: axios.delete
};
