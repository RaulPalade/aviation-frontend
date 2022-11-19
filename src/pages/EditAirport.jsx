import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

function EditAirport() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    iatacode: "",
    city: "",
    state: "",
    name: 0,
    runways: 0,
  });
  const { iatacode, city, state, name, runways } = formData;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getAirport = async () => {
      try {
        const airportResponse = await axios.get(
          `http://localhost:8080/airports/${params.iatacode}`
        );
        const airportData = airportResponse.data;

        setFormData(airportData);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to find this airport");
      }
    };

    getAirport();
  }, [params.iatacode]);

  const updateAirport = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/airports/${params.iatacode}`,
        formData
      );

      toast.success("Airport updated");
      setTimeout(() => {
        navigate(`/airports`);
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

  const onChangeState = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      state: e.target.value,
    }));
  };

  const onChangeCity = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      city: e.target.value,
    }));
  };

  const onChangeName = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const onChangeRunways = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      runways: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={updateAirport}>
        <Form.Group className="mb-3">
          <Form.Label>IATA Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert iata code"
            value={iatacode}
            onChange={onChangeIatacode}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert state"
            value={state}
            onChange={onChangeState}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert city"
            value={city}
            onChange={onChangeCity}
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
          <Form.Label>Runways</Form.Label>
          <Form.Control
            type="number"
            value={runways}
            onChange={onChangeRunways}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Airport
        </Button>
      </Form>
    </div>
  );
}

export default EditAirport;
