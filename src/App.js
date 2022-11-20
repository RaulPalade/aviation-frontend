import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarApp from "./components/NavbarApp";

import Airlines from "./pages/Airline/Airlines";
import Airplanes from "./pages/Airplane/Airplanes";
import Airports from "./pages/Airport/Airports";
import Flights from "./pages/Flight/Flights";

import AddAirline from "./pages/Airline/AddAirline";
import AddAirplane from "./pages/Airplane/AddAirplane";
import AddAirport from "./pages/Airport/AddAirport";
import AddFlight from "./pages/Flight/AddFlight";

import EditAirline from "./pages/Airline/EditAirline";
import EditAirplane from "./pages/Airplane/EditAirplane";
import EditAirport from "./pages/Airport/EditAirport";
import EditFlight from "./pages/Flight/EditFlight";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Router>
        <NavbarApp />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/airplanes" element={<Airplanes />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/addAirline" element={<AddAirline />} />
          <Route path="/addAirplane" element={<AddAirplane />} />
          <Route path="/addAirport" element={<AddAirport />} />
          <Route path="/addFlight" element={<AddFlight />} />
          <Route path="/editAirline/:iatacode" element={<EditAirline />} />
          <Route path="/editAirplane/:idAirplane" element={<EditAirplane />} />
          <Route path="/editAirport/:iatacode" element={<EditAirport />} />
          <Route path="/editFlight/:flightNumber" element={<EditFlight />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
