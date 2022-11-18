import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditAirplane() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    constructor: "",
    model: "",
    seats: 0,
  });
  const { constructor, model, seats } = formData;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getAirplane = async () => {
      try {
        const airplaneData = await axios.get(
          `http://localhost:8080/airplanes/${parseInt(params.idAirplane)}`
        );
        const airplane = airplaneData.data;
        setFormData(airplane);
        setLoading(false);
      } catch (error) {
        toast.error("Impossible to get airplane");
      }
    };

    getAirplane();
  }, [params.idAirplane]);

  const editAirplane = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/airplanes",
        formData
      );
      if (response.status === 200) {
        toast.success("New airplane added");
        setTimeout(() => {
          navigate("/airplanes");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <Form className="mt-5" onSubmit={editAirplane}>
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
          Edit Airplane
        </Button>
      </Form>
    </div>
  );
}

export default EditAirplane;
