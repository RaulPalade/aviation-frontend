import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Spinner from "../components/Spinner";

function Airlines() {
  const [airlines, setAirlines] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAirlines = async () => {
      const airlinesData = await axios.get("http://localhost:8080/airlines");
      const airlines = airlinesData.data;
      console.log(airlines);

      if (airlines !== null) {
        setAirlines(airlines);
        setLoading(false);
      } else {
        toast.error("Impossible to get airline list");
      }
    };

    getAirlines();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <br />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>IATA</th>
            <th>Name</th>
            <th>State</th>
            <th>Fleet</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Airlines;
