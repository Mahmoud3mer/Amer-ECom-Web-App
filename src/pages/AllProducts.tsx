import Product from "@components/eCommerce/Product/Product"
import LoaderRecords from "@components/feedback/LoaderRecords";
import useAllProducts from "@hooks/useAllProducts";
import { Col, Container, Row } from "react-bootstrap"
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const { refactorProducts, loading, error} = useAllProducts();
  const { pathname } = useLocation();

  return (
    <Container>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      <Row>
        <LoaderRecords loading={loading} error={error} type={'product'}>
            {
              refactorProducts?.map((p) =>
                <Col key={p.id} xs={12} md={4} lg={3} className="mb-5 mt-2 d-flex justify-content-center">
                  <Product title={p.title} imgSrc={p.img} price={p.price} productId={p.id} max={p.max} quantity={p.quantity} isLiked={p.isLiked} />
                </Col>
              )
            }
        </LoaderRecords>
      </Row>
    </Container>
  )
}

export default AllProducts;