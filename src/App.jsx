
import './index.css'
import CreateCustomer from "./Features/customers/CreateCustomer.jsx";
import Customer from "./Features/customers/Customer";
import AccountOperations from "./Features/accounts/AccountOperations";
import BalanceDisplay from "./Features/accounts/BalanceDisplay";
import { useSelector } from 'react-redux';

function App() {

  const fullName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {fullName === "" ?  <CreateCustomer /> :
      <>
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
      </>
      }
     
    </div>
  );
}

export default App;
