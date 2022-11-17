import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

function AddAirport() {
  const [formData, setFormData] = useState({
    iatacode: "",
    city: "",
    state: "",
    name: 0,
    runways: 0,
  });
  const { iatacode, city, state, name, runways } = formData;

  const navigate = useNavigate();

  const addAirport = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/airports",
        formData
      );

      if (response.status === 200) {
        toast.success("New airport added");
        setTimeout(() => {
          navigate("/airlines");
        }, 2000);
      }
    } catch (error) {
      toast.error("Impossible to add a new airport");
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

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={addAirport}>
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
          Add Airport
        </Button>
      </Form>
    </div>
  );
}

export default AddAirport;
