import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function AddFlight() {
  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    airline: "",
    airplane: null,
    passengers: 0,
    duration: "",
  });
  const { flightNumber, departureTime, arrivalTime, passengers, duration } =
    formData;

  const [airports, setAirports] = useState(null);
  const [airlines, setAirlines] = useState(null);
  const [airplanes, setAirplanes] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      const airportsData = await axios.get("http://localhost:8080/airports");
      const airports = airportsData.data;

      if (airports !== null) {
        setAirports(airports);
        setLoading(false);
        setFormData((prevState) => ({
          ...prevState,
          origin: airports[0].iatacode,
        }));
        setFormData((prevState) => ({
          ...prevState,
          destination: airports[0].iatacode,
        }));
      } else {
        toast.error("Impossible to get airports");
      }
    };

    const getAirlines = async () => {
      const airlinesData = await axios.get("http://localhost:8080/airlines");
      const airlines = airlinesData.data;

      if (airlines !== null) {
        setAirlines(airlines);
        setFormData((prevState) => ({
          ...prevState,
          airline: airlines[0].iatacode,
        }));
        setLoading(false);
      } else {
        toast.error("Impossible to get airlines");
      }
    };

    const getAirplanes = async () => {
      const airplanesData = await axios.get("http://localhost:8080/airplanes");
      const airplanes = airplanesData.data;

      if (airplanes !== null) {
        setAirplanes(airplanes);
        setFormData((prevState) => ({
          ...prevState,
          airplane: parseInt(airplanes[0].idAirplane),
        }));
        setLoading(false);
      } else {
        toast.error("Impossible to get airlines");
      }
    };

    getAirports();
    getAirlines();
    getAirplanes();
  }, []);

  const addFlight = async (e) => {
    e.preventDefault();
    console.log(formData);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/flights",
    //     formData
    //   );

    //   if (response.status === 200) {
    //     toast.success("New flight added");
    //     setTimeout(() => {
    //       navigate("/flights");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   toast.error("Impossible to add a new flight");
    // }
  };

  const onChangeFlightNumber = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      flightNumber: e.target.value,
    }));
  };

  const onChangeDepartureAirport = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      origin: e.target.value,
    }));
  };

  const onChangeArrivalAirport = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      destination: e.target.value,
    }));
  };

  const onChangeDepartureTime = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      departureTime: e.target.value,
    }));
  };

  const onChangeArrivalTime = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      arrivalTime: e.target.value,
    }));
  };

  const onChangeAirline = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      airline: e.target.value,
    }));
  };

  const onChangeAirplane = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      airplane: parseInt(e.target.value),
    }));
  };

  const onChangePassengers = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      passengers: e.target.value,
    }));
  };

  const onChangeDuration = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      duration: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={addFlight}>
        <Form.Group className="mb-3">
          <Form.Label>Flight Number</Form.Label>
          <Form.Control
            type="text"
            value={flightNumber}
            onChange={onChangeFlightNumber}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departure Airport</Form.Label>
          <Form.Control as="select" custom onChange={onChangeDepartureAirport}>
            {airports?.map((airport, index) => {
              return (
                <option key={index} value={airport.iatacode}>
                  {airport.city}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival Airport</Form.Label>
          <Form.Control as="select" custom onChange={onChangeArrivalAirport}>
            {airports?.map((airport, index) => {
              return (
                <option key={index} value={airport.iatacode}>
                  {airport.city}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departure time</Form.Label>
          <Form.Control
            type="text"
            value={departureTime}
            onChange={onChangeDepartureTime}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival time</Form.Label>
          <Form.Control
            type="text"
            value={arrivalTime}
            onChange={onChangeArrivalTime}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Airline</Form.Label>
          <Form.Control as="select" custom onChange={onChangeAirline}>
            {airlines?.map((airline, index) => {
              return (
                <option key={index} value={airline.iatacode}>
                  {airline.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Airplane</Form.Label>
          <Form.Control as="select" custom onChange={onChangeAirplane}>
            {airplanes?.map((airplane, index) => {
              return (
                <option key={index} value={airplane.idAirplane}>
                  {airplane.constructor} {airplane.model}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Passengers</Form.Label>
          <Form.Control
            type="number"
            value={passengers}
            onChange={onChangePassengers}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={onChangeDuration}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Flight
        </Button>
      </Form>
    </div>
  );
}

export default AddFlight;
