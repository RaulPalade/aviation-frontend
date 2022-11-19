import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

function AddAirline() {
  const [formData, setFormData] = useState({
    iatacode: "",
    name: "",
    state: "",
    fleet: 0,
  });
  const { iatacode, name, state, fleet } = formData;

  const navigate = useNavigate();

  const addAirline = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/airlines", formData);

      toast.success("New airline added");
      setTimeout(() => {
        navigate("/airlines");
      }, 2000);
    } catch (error) {
      toast.error("Impossible to add a new airline");
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

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={addAirline}>
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
          Add Airline
        </Button>
      </Form>
    </div>
  );
}

export default AddAirline;
