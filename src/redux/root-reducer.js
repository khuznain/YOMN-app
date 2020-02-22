import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import user from "./user/user.reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ["user"]
};

const rootReducer = combineReducers({
  user
});

export default persistReducer(persistConfig, rootReducer);
