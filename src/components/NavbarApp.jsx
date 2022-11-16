import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logo.svg";

function NavbarApp({ props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <>
      <Navbar variant="dark" className="color-nav py-2">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src={Logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              className={pathMatchRoute("/airlines") ? "active" : "notActive"}
              onClick={() => navigate("/airlines")}>
              Airlines
            </Nav.Link>
            <Nav.Link
              className={pathMatchRoute("/airplanes") ? "active" : "notActive"}
              onClick={() => navigate("/airplanes")}>
              Airplanes
            </Nav.Link>
            <Nav.Link
              className={pathMatchRoute("/airports") ? "active" : "notActive"}
              onClick={() => navigate("/airports")}>
              Airports
            </Nav.Link>
            <Nav.Link
              className={pathMatchRoute("/flights") ? "active" : "notActive"}
              onClick={() => navigate("/flights")}>
              Flights
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarApp;
