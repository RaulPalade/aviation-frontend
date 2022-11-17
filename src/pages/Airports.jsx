import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Airports() {
  // eslint-disable-next-line
  const [airports, setAirports] = useState(null);
  const [stateSelectedAirports, setStateSelectedAirports] = useState(null);
  const [states, setStates] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      const airporstData = await axios.get("http://localhost:8080/airports");
      const airports = airporstData.data;

      if (airports !== null) {
        let states = [];
        airports.forEach((airport) => {
          if (!states.includes(airport.state)) {
            states.push(airport.state);
          }
        });

        setStates(states);
        setAirports(airports);
        setLoading(false);
        getAirportByState(states[0]);
      } else {
        toast.error("Impossible to get airports");
      }
    };

    getAirports();
  }, []);

  const getAirportByState = async (state) => {
    const airportsByStateData = await axios.get(
      `http://localhost:8080/airports?state=${state}`
    );

    const airportsByState = airportsByStateData.data;
    if (airportsByState !== null) {
      setStateSelectedAirports(airportsByState);
    } else {
      toast.error("No airports found for this state");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      Select the country to view airports:
      <Form.Control
        as="select"
        custom
        onChange={(event) => getAirportByState(event.target.value)}>
        {states?.map((state, index) => {
          return (
            <option key={index} value={state}>
              {state}
            </option>
          );
        })}
      </Form.Control>
      <br />
      <br />
      <Table striped>
        <thead>
          <tr>
            <th>IATA</th>
            <th>City</th>
            <th>Name</th>
            <th>Runways</th>
          </tr>
        </thead>

        <tbody>
          {stateSelectedAirports?.map((airport) => {
            const { iatacode, city, name, runways } = airport;
            return (
              <tr key={iatacode}>
                <td>{iatacode}</td>
                <td>{city}</td>
                <td>{name}</td>
                <td>{runways}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        variant="primary"
        className="btn-circle btn-xl float-end mt-2"
        onClick={() => navigate("/addAirport")}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default Airports;
