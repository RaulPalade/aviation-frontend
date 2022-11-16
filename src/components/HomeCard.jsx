import Card from "react-bootstrap/Card";

function HomeCard({ image, title }) {
  return (
    <Card className="bg-dark text-dark">
      <Card.Img src={image} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title class="cardTitle">{title}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export default HomeCard;
