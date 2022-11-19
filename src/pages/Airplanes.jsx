import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function Airplanes() {
  const [airplanes, setAirplanes] = useState(null);
  const [constructors, setConstructors] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getAirplanes = async () => {
      try {
        const airplanesReponse = await axios.get(
          "http://localhost:8080/airplanes"
        );
        const airplanesData = airplanesReponse.data;

        let constructors = [];
        airplanesData.forEach((airplane) => {
          if (!constructors.includes(airplane.constructor)) {
            constructors.push(airplane.constructor);
          }
        });

        setConstructors(constructors);
        setAirplanes(airplanesData);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        toast.error("Impossible to get airplanes");
      }
    };

    getAirplanes();
  }, []);

  const onDelete = async (idAirplane) => {
    console.log(idAirplane);
    try {
      await axios.delete(`http://localhost:8080/airplanes/${idAirplane}`);

      const updateAirplanes = airplanes.filter(
        (airplane) => airplane.idAirplane !== idAirplane
      );

      setAirplanes(updateAirplanes);
      toast.success("Airplane deleted");
    } catch (error) {
      toast.error("Impossible to delete");
    }
  };

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
                    <th></th>
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
                          <td>
                            <Button
                              variant="success"
                              title="Edit"
                              onClick={() =>
                                navigate(`/editAirplane/${idAirplane}`)
                              }>
                              <FontAwesomeIcon icon={faFilePen} />
                            </Button>
                            &nbsp;
                            <Button
                              variant="danger"
                              title="Delete"
                              onClick={() => onDelete(idAirplane)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
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
