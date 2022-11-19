import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function Airlines() {
  const [airlines, setAirlines] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirlines = async () => {
      try {
        const airlinesResponse = await axios.get(
          "http://localhost:8080/airlines"
        );
        const airlinesData = airlinesResponse.data;

        setAirlines(airlinesData);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airline list");
      }
    };

    getAirlines();
  }, []);

  const onDelete = async (iatacode) => {
    try {
      await axios.delete(`http://localhost:8080/airlines/${iatacode}`);

      const updatedAirlines = airlines.filter(
        (airline) => airline.iatacode !== iatacode
      );

      setAirlines(updatedAirlines);
      toast.success("Airline deleted");
    } catch (error) {
      toast.error("Impossible to delete");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <div className="pageContainer">
        <br />
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>IATA</th>
              <th>Name</th>
              <th>State</th>
              <th>Fleet</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {airlines?.map((airline, index) => {
              const { iatacode, name, state, fleet } = airline;
              return (
                <tr key={iatacode}>
                  <td>{index}</td>
                  <td>{iatacode}</td>
                  <td>{name}</td>
                  <td>{state}</td>
                  <td>{fleet}</td>
                  <td>
                    <Button
                      variant="success"
                      title="Edit"
                      onClick={() => navigate(`/editAirline/${iatacode}`)}>
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
          onClick={() => navigate("/addAirline")}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </main>
  );
}

export default Airlines;
