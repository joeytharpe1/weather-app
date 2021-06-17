import WeatherCard from './components/WeatherCard';
import { Container, Row, Col } from "react-bootstrap";

import './App.css';

function App() {

  return (
    <Container fluid className="container-bg container-fluid">
      <Row>
        <Col>
          <WeatherCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
