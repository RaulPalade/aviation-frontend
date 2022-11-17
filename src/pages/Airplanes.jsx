import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Airplanes() {
  const [airplanes, setAirplanes] = useState(null);
  const [constructors, setConstructors] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirplanes = async () => {
      const airplanesData = await axios.get("http://localhost:8080/airplanes");
      const airplanes = airplanesData.data;

      if (airplanes !== null) {
        let constructors = [];
        airplanes.forEach((airplane) => {
          if (!constructors.includes(airplane.constructor)) {
            constructors.push(airplane.constructor);
          }
        });

        setConstructors(constructors);
        setAirplanes(airplanes);
        setLoading(false);
      } else {
        toast.error("Impossible to get airplanes");
      }
    };

    getAirplanes();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <Tabs id="controlled-tab-example" className="mb-3 text-dark">
        {constructors?.map((constructor) => {
          return (
            <Tab eventKey={constructor} title={constructor}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Seats</th>
                  </tr>
                </thead>

                <tbody>
                  {airplanes?.map((airplane) => {
                    const { idAirplane, model, seats } = airplane;
                    return (
                      constructor === airplane.constructor && (
                        <tr key={idAirplane}>
                          <td>{model}</td>
                          <td>{seats}</td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
          );
        })}
      </Tabs>
      <Button
        variant="primary"
        className="btn-circle btn-xl float-end mt-2"
        onClick={() => navigate("/addAirplane")}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
}

export default Airplanes;
