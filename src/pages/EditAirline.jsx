import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

function EditAirline() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    iatacode: "",
    name: "",
    state: "",
    fleet: 0,
  });
  const { iatacode, name, state, fleet } = formData;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getAirline = async () => {
      try {
        const airlineResponse = await axios.get(
          `http://localhost:8080/airlines/${params.iatacode}`
        );
        const airlineData = airlineResponse.data;

        setFormData(airlineData);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airline");
      }
    };

    getAirline();
  }, [params]);

  const updateAirline = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/airlines/${params.iatacode}`,
        formData
      );

      toast.success("Airline updated");
      setTimeout(() => {
        navigate(`/airlines`);
      }, 1000);
    } catch (error) {
      toast.error("Impossible to update");
    }
  };

  const onChangeIatacode = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      iatacode: e.target.value,
    }));
  };

  const onChangeName = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const onChangeState = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      state: e.target.value,
    }));
  };

  const onChangeFleet = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      fleet: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={updateAirline}>
        <Form.Group className="mb-3">
          <Form.Label>IATA Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert iata code"
            value={iatacode}
            onChange={onChangeIatacode}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert name"
            value={name}
            onChange={onChangeName}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={state}
            onChange={onChangeState}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fleet</Form.Label>
          <Form.Control
            type="number"
            value={fleet}
            onChange={onChangeFleet}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Edit Airline
        </Button>
      </Form>
    </div>
  );
}

export default EditAirline;
