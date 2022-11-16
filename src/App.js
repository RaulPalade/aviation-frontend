import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Airlines from "./pages/Airlines";
import Airplanes from "./pages/Airplanes";
import Airports from "./pages/Airports";
import Flights from "./pages/Flights";
import NavbarApp from "./components/NavbarApp";
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
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
