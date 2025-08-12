import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/user/Main";
import Bookings from "./pages/Booking";
import Blank_Design from "./components/Blank_Design";
import Payments from "./pages/Payments";
import Employee_Details from "./pages/Employee_Details";
import Roles from "./pages/Roles";
import My_Services from "./pages/My_Services";
import Add_Category from "./pages/Add_Category";
import Add_Vehicles from "./pages/Add_Vehicles";
import Landing from "./pages/Landing";
import My_Bookings from "./pages/My_Bookings";

const app = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* <Route path="/" element={<Main />}></Route> */}
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/blank_page" element={<Blank_Design />}></Route>
        <Route path="/payments" element={<Payments />}></Route>
        <Route path="/users" element={<Employee_Details />}></Route>
        <Route path="/roles" element={<Roles />}></Route>
        <Route path="/vehicles" element={<My_Services />}></Route>
        <Route path="/vehicles/add" element={<Add_Category />}></Route>
        <Route path="/vehicles/category" element={<Add_Vehicles />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/mybooking" element={<My_Bookings/>}></Route>
      </Routes>
    </>
  );
};

export default app;
