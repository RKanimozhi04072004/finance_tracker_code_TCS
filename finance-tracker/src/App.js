

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import FinanceChart from "./components/FinanceChart";
import EditTransaction from "./pages/EditTransaction";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/budget" element={<Budget />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
<Route path="/login" element={<Login />} />

<Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>

  );

}

export default App;