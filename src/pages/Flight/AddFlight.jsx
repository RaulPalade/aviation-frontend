import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

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
  const { flightNumber, passengers, duration } = formData;

  const [airports, setAirports] = useState(null);
  const [airlines, setAirlines] = useState(null);
  const [airplanes, setAirplanes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [depDate, setDepDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrDate, setArrDate] = useState("");
  const [arrTime, setArrTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      try {
        const airportsResponse = await axios.get(
          "http://localhost:8080/airports"
        );
        const airportsData = airportsResponse.data;

        setAirports(airportsData);
        setLoading(false);
        setFormData((prevState) => ({
          ...prevState,
          origin: airportsData[0].iatacode,
        }));
        setFormData((prevState) => ({
          ...prevState,
          destination: airportsData[0].iatacode,
        }));
      } catch (error) {
        toast.error("Impossible to get airports");
      }
    };

    const getAirlines = async () => {
      try {
        const airlinesResponse = await axios.get(
          "http://localhost:8080/airlines"
        );
        const airlinesData = airlinesResponse.data;

        setAirlines(airlinesData);
        setFormData((prevState) => ({
          ...prevState,
          airline: airlinesData[0].iatacode,
        }));
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airlines");
      }
    };

    const getAirplanes = async () => {
      try {
        const airplanesResponse = await axios.get(
          "http://localhost:8080/airplanes"
        );
        const airplanesData = airplanesResponse.data;

        setAirplanes(airplanesData);
        setFormData((prevState) => ({
          ...prevState,
          airplane: parseInt(airplanesData[0].idAirplane),
        }));
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airlines");
      }
    };

    getAirports();
    getAirlines();
    getAirplanes();
  }, []);

  const addFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/flights", formData);

      toast.success("New flight added");
      setTimeout(() => {
        navigate("/flights");
      }, 2000);
    } catch (error) {
      toast.error("Impossible to add a new flight");
    }
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
      passengers: parseInt(e.target.value),
    }));
  };

  const onChangeDuration = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      duration: e.target.value + ":00",
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
          <Form.Control as="select" onChange={onChangeDepartureAirport}>
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
          <Form.Control as="select" onChange={onChangeArrivalAirport}>
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
          <Form.Label>Departure Date</Form.Label>
          <Form.Control
            type="date"
            name="datepic"
            value={depDate}
            onChange={(e) => {
              setDepDate(e.target.value);
              setFormData((prevState) => ({
                ...prevState,
                departureTime: e.target.value + "T" + depTime + ":00.000+00:00",
              }));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departure time</Form.Label>
          <Form.Control
            type="time"
            value={depTime}
            onChange={(e) => {
              setDepTime(e.target.value);
              setFormData((prevState) => ({
                ...prevState,
                departureTime: depDate + "T" + e.target.value + ":00.000+00:00",
              }));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival Date</Form.Label>
          <Form.Control
            type="date"
            value={arrDate}
            onChange={(e) => {
              setArrDate(e.target.value);
              setFormData((prevState) => ({
                ...prevState,
                arrivalTime: e.target.value + "T" + arrTime + ":00.000+00:00",
              }));
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival time</Form.Label>
          <Form.Control
            type="time"
            value={arrTime}
            onChange={(e) => {
              setArrTime(e.target.value);
              setFormData((prevState) => ({
                ...prevState,
                arrivalTime: arrDate + "T" + e.target.value + ":00.000+00:00",
              }));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Airline</Form.Label>
          <Form.Control as="select" onChange={onChangeAirline}>
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
          <Form.Control as="select" onChange={onChangeAirplane}>
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
          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="time"
              value={duration}
              onChange={onChangeDuration}
            />
          </Form.Group>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Flight
        </Button>
      </Form>
    </div>
  );
}

export default AddFlight;
