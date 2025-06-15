import {createStore} from "redux";

const initialState = {
  balance :0,
  loan:0,
  loanPurpose: "",

}
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      // Only one loan at a time
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




const store = createStore(reducer);


// 💰 Deposit money
export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

// 💸 Withdraw money
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

// 🏦 Request loan
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

// ✅ Pay back loan
export function payLoan() {
  return {
    type: "account/payLoan",
  };
}


store.dispatch(deposit(1000));

console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());
store.dispatch(requestLoan(5000, "Buy a laptop"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

 
// const store = createStore(reducer);

// store.dispatch({type : 'account/deposit' , payload : 500})

// console.log(store.getState())

// store.dispatch({type : 'account/withdraw' , payload : 200})

// console.log(store.getState())





