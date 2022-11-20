import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function Flights() {
  const [loading, setLoading] = useState(true);
  const [departureAirports, setDepartureAirports] = useState(null);
  const [destinationAirports, setDestinationAirports] = useState(null);
  const [flights, setFlights] = useState(null);
  const [filteredFlights, setFilteredFlights] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [toSelectDisabled, setToSelectDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      try {
        const airportsResponse = await axios.get(
          "http://localhost:8080/airports"
        );
        const airportsData = airportsResponse.data;

        let cities = [];
        airportsData.forEach((airport) => {
          cities.push(airport.city);
        });

        setDepartureAirports(cities);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airports");
      }
    };
    getAirports();
  }, []);

  const searchFightsFrom = async (from) => {
    setFilteredFlights(null);
    try {
      const flightFromResponse = await axios.get(
        `http://localhost:8080/flights?origin=${from}`
      );
      const flightFromData = flightFromResponse.data;

      let cities = [];
      flightFromData.forEach((flight) => {
        let depTime = new Date(flight.departureTime);
        let arrTime = new Date(flight.arrivalTime);
        flight.departureTime = depTime.toLocaleString("IT");
        flight.arrivalTime = arrTime.toLocaleString("IT");
        cities.push(flight.destination.city);
      });

      setFlights(flightFromData);
      setDestinationAirports(cities);

      if (cities.length > 0) {
        setToSelectDisabled(false);
      } else {
        setToSelectDisabled(true);
      }
    } catch (error) {
      toast.error("No flight found");
    }
  };

  const filterFlights = (e) => {
    e.preventDefault();
    let destinationFlights = [];

    flights.forEach((flight) => {
      if (flight.destination.city === selectedDestination) {
        destinationFlights.push(flight);
      }
    });
    setFilteredFlights(destinationFlights);
  };

  const onDelete = async (flightNumber) => {
    try {
      await axios.delete(`http://localhost:8080/flights/${flightNumber}`);

      const updatedFlights = flights.filter(
        (flight) => flight.flightNumber !== flightNumber
      );

      setFlights(updatedFlights);
      toast.success("Flight deleted");
    } catch (error) {
      toast.error("Impossible to delete");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <h3>Search Flights</h3>
      <Form className="mt-5" onSubmit={filterFlights}>
        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => {
              searchFightsFrom(event.target.value);
            }}>
            {departureAirports?.map((airport, index) => {
              return (
                <option key={index} value={airport}>
                  {airport}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => {
              setSelectedDestination(event.target.value);
            }}
            disabled={toSelectDisabled}>
            {destinationAirports?.map((airport, index) => {
              return (
                <option key={index} value={airport}>
                  {airport}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <br />
      <br />
      <Table striped hidden={filteredFlights === null}>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>From</th>
            <th>To</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Airline</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredFlights?.map((flight) => {
            const {
              flightNumber,
              origin,
              destination,
              departureTime,
              arrivalTime,
              airline,
              duration,
            } = flight;

            return (
              <tr key={flightNumber}>
                <td>{flightNumber}</td>
                <td>{origin.city}</td>
                <td>{destination.city}</td>
                <td>{departureTime}</td>
                <td>{arrivalTime}</td>
                <td>{airline.name}</td>
                <td>{duration}</td>
                <td>
                  <Button
                    variant="success"
                    title="Edit"
                    onClick={() => navigate(`/editFlight/${flightNumber}`)}>
                    <FontAwesomeIcon icon={faFilePen} />
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    title="Delete"
                    onClick={() => onDelete(flightNumber)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        variant="primary"
        className="btn-circle btn-xl float-end mt-2"
        onClick={() => navigate("/addFlight")}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default Flights;
