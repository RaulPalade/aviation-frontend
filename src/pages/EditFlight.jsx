import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function EditFlight() {
  const [flightLoaded, setflightLoaded] = useState(false);
  const [flight, setFlight] = useState(null);
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

  const [depAirports, setDepAirports] = useState(null);
  const [arrAirports, setArrAirports] = useState(null);
  const [airportsLoaded, setAirportsLoaded] = useState(false);

  const [airlines, setAirlines] = useState(null);
  const [airplanes, setAirplanes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [depDate, setDepDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrDate, setArrDate] = useState("");
  const [arrTime, setArrTime] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getFlight = async () => {
      const flightResponse = await axios.get(
        `http://localhost:8080/flights/${params.flightNumber}`
      );

      const flightData = flightResponse.data;
      setFlight(flightData);

      let depDate = flightData.departureTime.substring(0, 10);
      let depTime = flightData.departureTime.substring(11, 16);
      setDepDate(depDate);
      setDepTime(depTime);

      setFormData((prevState) => ({
        ...prevState,
        departureTime: depDate + "T" + depTime + ":00.000+00:00",
      }));

      let arrDate = flightData.arrivalTime.substring(0, 10);
      let arrTime = flightData.arrivalTime.substring(11, 16);
      setArrDate(arrDate);
      setArrTime(arrTime);
      setFormData((prevState) => ({
        ...prevState,
        arrivalTime: arrDate + "T" + arrTime + ":00.000+00:00",
      }));

      setFormData((prevState) => ({
        ...prevState,
        flightNumber: flightData.flightNumber,
      }));
      setFormData((prevState) => ({
        ...prevState,
        passengers: flightData.passengers,
      }));
      setFormData((prevState) => ({
        ...prevState,
        duration: flightData.duration,
      }));
      setFormData((prevState) => ({
        ...prevState,
        origin: flightData.origin.iatacode,
      }));
      setFormData((prevState) => ({
        ...prevState,
        destination: flightData.destination.iatacode,
      }));

      setLoading(false);
      setflightLoaded(true);
    };
    getFlight();

    if (flightLoaded) {
      const getAirports = async () => {
        try {
          const airportsResponse = await axios.get(
            "http://localhost:8080/airports"
          );
          const airportsData = airportsResponse.data;

          let depData = [...airportsData];
          let arrData = [...airportsData];

          depData.forEach((airport, index) => {
            if (airport.iatacode === flight.origin.iatacode) {
              depData.unshift(depData.splice(index, 1)[0]);
            }
          });
          setDepAirports(depData);

          arrData.forEach((airport, index) => {
            if (airport.iatacode === flight.destination.iatacode) {
              arrData.unshift(arrData.splice(index, 1)[0]);
            }
          });
          setArrAirports(arrData);
          setAirportsLoaded(true);

          if (airportsLoaded) {
            setFormData((prevState) => ({
              ...prevState,
              origin: depAirports[0].iatacode,
            }));
            setFormData((prevState) => ({
              ...prevState,
              destination: arrAirports[0].iatacode,
            }));
          }
        } catch (e) {
          toast.error("Impossible to get airports");
        }
      };
      getAirports();
    }

    if (flightLoaded) {
      const getAirlines = async () => {
        try {
          const airlinesResponse = await axios.get(
            "http://localhost:8080/airlines"
          );
          const airlinesData = airlinesResponse.data;

          airlinesData.forEach((airline, index) => {
            if (airline.iatacode === flight.airline.iatacode) {
              airlinesData.unshift(airlinesData.splice(index, 1)[0]);
            }
          });

          setAirlines(airlinesData);
          setFormData((prevState) => ({
            ...prevState,
            airline: airlinesData[0].iatacode,
          }));
          setLoading(false);
        } catch (e) {
          toast.error("Impossible to get airlines");
        }
      };
      getAirlines();
    }

    if (flightLoaded) {
      const getAirplanes = async () => {
        try {
          const airplanesResponse = await axios.get(
            "http://localhost:8080/airplanes"
          );
          const airplanesData = airplanesResponse.data;

          airplanesData.forEach((airplane, index) => {
            if (airplane.idAirplane === flight.airplane.idAirplane) {
              airplanesData.unshift(airplanesData.splice(index, 1)[0]);
            }
          });
          setAirplanes(airplanesData);
          setFormData((prevState) => ({
            ...prevState,
            airplane: airplanesData[0].idAirplane,
          }));
        } catch (e) {
          toast.error("Impossible to get airplanes");
        }
      };
      getAirplanes();
    }
    // eslint-disable-next-line
  }, [params.flightNumber, flightLoaded]);

  const updateFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/flights/${params.flightNumber}`,
        formData
      );

      toast.success("Flight updated");
      setTimeout(() => {
        navigate(`/flights`);
      }, 1000);
    } catch (error) {
      toast.error("Impossible to update");
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
      <Form className="mt-5" onSubmit={updateFlight}>
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
            {depAirports?.map((airport, index) => {
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
            {arrAirports?.map((airport, index) => {
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
          Update Flight
        </Button>
      </Form>
    </div>
  );
}

export default EditFlight;
