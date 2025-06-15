import { createStore, combineReducers } from "redux";

// ------------------ ACCOUNT STATE ------------------
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      if (state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

// ------------------ CUSTOMER STATE ------------------
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

// ------------------ COMBINE REDUCERS ------------------
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// ------------------ STORE ------------------
const store = createStore(rootReducer);

// ------------------ ACTION CREATORS ------------------
// Account
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}

// Customer
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

// ------------------ DISPATCH EXAMPLES ------------------

store.dispatch(deposit(1000));
console.log("After deposit:", store.getState());

store.dispatch(withdraw(300));
console.log("After withdraw:", store.getState());

store.dispatch(requestLoan(5000, "Buy a laptop"));
console.log("After requesting loan:", store.getState());

store.dispatch(payLoan());
console.log("After paying loan:", store.getState());

store.dispatch(createCustomer("Ali Khan", "12345-6789012-3"));
console.log("After creating customer:", store.getState());

store.dispatch(updateName("Muddassir Ali"));
console.log("After updating name:", store.getState());
