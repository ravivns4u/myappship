// import { Outlet } from 'react-router-dom'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom"
import "./assets/css/bootstrap.min.css"
import Home from "./components/HomeComponents/Home";
import AboutUs from "./components/StaticComponents/AboutUs";
import SearchReasult from "./components/SearchComponents/SearchReasult";
import ContactUs from "./components/StaticComponents/ContactUs";
import UserDeshboards from "./components/UserComponents/UserDeshboards";
import UserProfile from "./components/UserComponents/UserProfile";
import UserKyc from "./components/UserComponents/UserKyc";
import UserFinance from "./components/UserComponents/UserFinance";
import UserKycSuccess from "./components/UserComponents/UserKycSuccess";
import ConfirmBooking from "./components/BookingComponents/ConfirmBooking";
import PaymentDetails from "./components/BookingComponents/PaymentDetails";
import PaymentTransection from "./components/BookingComponents/PaymentTransection";
import PaymentRecepit from "./components/BookingComponents/PaymentRecepit";
import Invoice from "./components/BookingComponents/Invoice";


function App() {
  return (
    <>
     <Router>
   <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/about-us' element={<AboutUs  />} />
     <Route path='/search-result' element={<SearchReasult />} />
     <Route path='/contact-us' element={<ContactUs />} />
     <Route path='/dashboard-page' element={<UserDeshboards />} />
     <Route path='/user-profile' element={<UserProfile />} />
     <Route path='/kyc' element={<UserKyc />} />
     <Route path='/finance' element={<UserFinance />} />
     <Route path='/kycsuccess' element={<UserKycSuccess />} />
     <Route path='/confirm-booking' element={<ConfirmBooking />} />
     <Route path='/payment-details' element={<PaymentDetails />} />
     <Route path='/payment-transaction' element={<PaymentTransection />} />
     <Route path='/payment-receipt' element={<PaymentRecepit />} />
     <Route path='/invoice' element={<Invoice />} />

     
   </Routes>
 </Router>
    </>
  );
}

export default App;
