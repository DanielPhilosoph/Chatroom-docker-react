import { createStore } from "redux";

import MainReducer from "../reducers/MainReducer";

const store = createStore(MainReducer);

export default store;
