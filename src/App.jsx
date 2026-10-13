import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";
import Allocations from "./pages/Allocations";
import Reports from "./pages/Reports";
export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:tripId" element={<CustomerDetail />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:staffId" element={<StaffDetail />} />
        <Route path="/allocations" element={<Allocations />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
