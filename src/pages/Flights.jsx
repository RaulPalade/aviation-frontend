import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function Flights() {
  const [flights, setFlights] = useState(null);
  const [formData, setFormData] = useState({ from: "", to: "" });
  const { from, to } = formData;

  const navigate = useNavigate();

  const searchFlights = async (e) => {
    e.preventDefault();
    const flightsData = await axios.get(
      `http://localhost:8080/flights?origin=${from}&destination=${to}`
    );
    const flights = flightsData.data;

    flights.forEach((flight) => {
      let depTime = new Date(flight.departureTime);
      let arrTime = new Date(flight.arrivalTime);
      flight.departureTime = depTime.toLocaleString("IT");
      flight.arrivalTime = arrTime.toLocaleString("IT");
    });

    if (flights !== null && flights.length > 0) {
      setFlights(flights);
    } else if (flights !== null && flights.length === 0) {
      toast.error("No flights found");
      return;
    }
  };

  const onChangeDeparture = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      from: e.target.value,
    }));
  };

  const onChangeDestination = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      to: e.target.value,
    }));
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

  return (
    <div className="pageContainer">
      <h3>Search Flights</h3>
      <Form className="mt-5" onSubmit={searchFlights}>
        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="text"
            placeholder="Departure airport"
            value={from}
            onChange={onChangeDeparture}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Destination airport"
            value={to}
            onChange={onChangeDestination}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <br />
      <br />
      <Table striped>
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
          {flights?.map((flight) => {
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
