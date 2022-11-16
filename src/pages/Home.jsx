import HomeCard from "../components/HomeCard";
import { Link } from "react-router-dom";
import AirplaneImg from "../assets/airplane.jpg";
import AirlineImg from "../assets/airline.jpg";
import AirportImg from "../assets/airport.jpg";
import FlightImg from "../assets/flight.jpg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  return (
    <div className="pageContainer">
      <Container>
        <Row>
          <Col>
            <Link to="/airplanes">
              <HomeCard image={AirplaneImg} title={"Airplanes"} />
            </Link>
          </Col>
          <Col>
            <Link to="/airlines">
              <HomeCard image={AirlineImg} title={"Airlines"} />
            </Link>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <Link to="/airports">
              <HomeCard image={AirportImg} title={"Airports"} />
            </Link>
          </Col>
          <Col>
            <Link to="/flights">
              <HomeCard image={FlightImg} title={"Flights"} />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
