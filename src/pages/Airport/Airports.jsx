import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function Airports() {
  const [airports, setAirports] = useState(null);
  const [stateSelectedAirports, setStateSelectedAirports] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      try {
        const airporstResponse = await axios.get(
          "http://localhost:8080/airports"
        );
        const airportsData = airporstResponse.data;

        let states = [];
        airportsData.forEach((airport) => {
          if (!states.includes(airport.state)) {
            states.push(airport.state);
          }
        });

        setStates(states);
        setSelectedState(states[0]);
        setAirports(airportsData);
        getAirportByState(states[0]);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airports");
      }
    };

    getAirports();
  }, []);

  const getAirportByState = async (state) => {
    setSelectedState(state);
    try {
      const airportsByStateResponse = await axios.get(
        `http://localhost:8080/airports?state=${state}`
      );

      const airportsByStateData = airportsByStateResponse.data;
      setStateSelectedAirports(airportsByStateData);
    } catch (error) {
      toast.error("No airports found for this state");
    }
  };

  const onDelete = async (iatacode) => {
    try {
      await axios.delete(`http://localhost:8080/airports/${iatacode}`);

      const updatedAirports = airports.filter(
        (airport) => airport.iatacode !== iatacode
      );

      let found = false;
      updatedAirports.forEach((airport) => {
        if (airport.state === selectedState) {
          found = true;
        }
      });

      if (!found) {
        const updatedStates = states.filter((state) => state !== selectedState);
        setStates(updatedStates);
      }

      setAirports(updatedAirports);
      toast.success("Airport deleted");
    } catch (error) {
      toast.error("Impossible to delete");
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
            <th></th>
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
                <td>
                  <Button
                    variant="success"
                    title="Edit"
                    onClick={() => navigate(`/editAirport/${iatacode}`)}>
                    <FontAwesomeIcon icon={faFilePen} />
                  </Button>
                  &nbsp;
                  <Button
                    variant="danger"
                    title="Delete"
                    onClick={() => onDelete(iatacode)}>
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
        onClick={() => navigate("/addAirport")}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default Airports;
