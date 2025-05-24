import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getAllProducts } from "@store/productsSlice";
import { useEffect } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet"
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();
  const { products } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{pathname.slice(1)}</title>
      </Helmet>

      <div>
        {/* Hero Section */}
        <Carousel className="mb-4" fade interval={1500}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT90awoHrzBfmnOsQ4zV_vU1kJmgxJsjALKNdHf4NOXeh0GclY1Wwo1LRWYmwt5y8UUDyL5Cpt1CpIiqhCyxZFPVa9nXbnRZnL5fVuiug"
              alt="Shop Now"
            />
            <Carousel.Caption>
              <h3>Welcome to MyShop!</h3>
              <p>Discover the best products at unbeatable prices.</p>
              <Button as={Link} to="/products" variant="success">
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkGxpYzbT7q8jwxYZx_gKo3ghy7Uww3TK7LJxprP9uCoC7WTirEjFqDOYn0Iw37d9xNHdnAR7Gbdiy6hIa662-lo2VB5kdPWdCuQC_rIg"
              alt="Shop Now"
            />
            <Carousel.Caption>
              <h3>Welcome to MyShop!</h3>
              <p>Discover the best products at unbeatable prices.</p>
              <Button as={Link} to="/products" variant="success">
                Shop Now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Featured Products */}
        <Container>
          <h2 className="text-center mb-4">Featured Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={product.img || 'https://via.placeholder.com/150'} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button as={Link} to={`/products/${product.id}`} variant="outline-success">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Home;