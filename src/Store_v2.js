import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Import the thunk middleware
import accountReducer from "./Features/accounts/accountSlice";
import customerReducer from "./Features/customers/customerSlice";
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create store with thunk middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Apply thunk middleware
);

export default store;