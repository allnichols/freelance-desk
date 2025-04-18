import { Routes, Route } from "react-router";
import { Dashboard } from "./routes/Dashboard";
import Invoices from "./views/invoices";

const App = () => {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<div>Home</div>} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  );
};

export default App;
