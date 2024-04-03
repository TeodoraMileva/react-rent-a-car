import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Register } from './components/auth/register/Register';
import { Login } from './components/auth/login/Login';
import { CustomerForm } from './components/customers/customer-form/CustomerForm';
import { Customer } from './components/customers/customer/Customer';
import { CustomersList } from './components/customers/customers-list/CustomersList';
import { Layout } from './components/layout/Layout';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { Vehicle } from './components/vehicles/vehicle/Vehicle';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { RentForm } from './components/vehicles/rent/RentForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard>}/>
        <Route exact path="/login" element={<NonAuthenticatedGuard><Login/></NonAuthenticatedGuard>}/>
        <Route exact path="/" element={<AuthenticatedRoute><Layout/></AuthenticatedRoute>}>
            <Route path="/vehicles-list" element={<VehiclesList/>}/>
            <Route path="/vehicle/:id" element={<Vehicle/>}/>
            <Route path="/vehicle/create" element={<VehicleForm/>}/>
            <Route path="/vehicle/edit/:id" element={<VehicleForm/>}/>
            <Route path="/vehicle/rent/:id" element={<RentForm/>}/>

            <Route path="/customers-list" element={<CustomersList/>}/>
            <Route path="/customer/:id" element={<Customer/>}/>
            <Route path="/customer/create" element={<CustomerForm/>}/>
            <Route path="/customer/edit/:id" element={<CustomerForm/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
