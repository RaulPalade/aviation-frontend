import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

function AddAirplane() {
  const [formData, setFormData] = useState({
    constructor: "",
    model: "",
    seats: 0,
  });
  const { constructor, model, seats } = formData;

  const navigate = useNavigate();

  const addAirplane = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/airplanes", formData);

      toast.success("New airplane added");
      setTimeout(() => {
        navigate("/airplanes");
      }, 2000);
    } catch (error) {
      toast.error("Impossible to add a new airplane");
    }
  };

  const onChangeConstructor = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      constructor: e.target.value,
    }));
  };

  const onChangeModel = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      model: e.target.value,
    }));
  };

  const onChangeSeats = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      seats: e.target.value,
    }));
  };

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={addAirplane}>
        <Form.Group className="mb-3">
          <Form.Label>Constructor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert constructor"
            value={constructor}
            onChange={onChangeConstructor}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert model"
            value={model}
            onChange={onChangeModel}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seats</Form.Label>
          <Form.Control
            type="number"
            value={seats}
            onChange={onChangeSeats}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Airplane
        </Button>
      </Form>
    </div>
  );
}

export default AddAirplane;
