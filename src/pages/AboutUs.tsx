
// import { Helmet } from 'react-helmet';
// import { useLocation } from 'react-router-dom';

// const AboutUs = () => {
//   const { pathname } = useLocation();

//   return (
//     <>
//       <Helmet>
//         <title>{ pathname.slice(1) }</title>
//       </Helmet>

//       <div>AboutUs</div>
//     </>
    
//   )
// }

// export default AboutUs

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <Container className="py-4">
      {/* Introduction */}
      <div className="text-center bg-light p-5 rounded mb-4">
        <h1 className="display-4 mb-3">About MyShop</h1>
        <p className="lead">
          Welcome to MyShop, your one-stop destination for high-quality products that suit all your needs.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-5">
        <h2 className="text-center mb-3">Our Story</h2>
        <p className="text-muted">
          MyShop was founded in 2025 with a vision to provide exceptional products at competitive prices.
          From a small idea, we’ve grown to serve thousands of customers across the region, delivering joy
          with every purchase.
        </p>
      </section>

      {/* Our Values */}
      <section className="mb-5">
        <h2 className="text-center mb-3">Our Values</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Quality:</strong> We carefully select products to ensure top-notch quality.
          </li>
          <li className="list-group-item">
            <strong>Customer Satisfaction:</strong> Your happiness is our priority.
          </li>
          <li className="list-group-item">
            <strong>Sustainability:</strong> We’re committed to eco-friendly products.
          </li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="mb-5">
        <h2 className="text-center mb-3">Why Choose Us?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Fast Delivery</Card.Title>
                <Card.Text>Reliable and quick shipping to your doorstep.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Card.Title>Competitive Prices</Card.Title>
                <Card.Text>Best prices without compromising quality.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Card.Title>24/7 Support</Card.Title>
                <Card.Text>Our team is here to help you anytime.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="mb-3">Ready to Shop?</h2>
        <Button as={Link} to="/" variant="success">
          Explore Products
        </Button>
      </div>
    </Container>
  );
  }

  export default AboutUs;