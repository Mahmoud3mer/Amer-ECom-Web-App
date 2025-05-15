import Product from "@components/eCommerce/Product/Product"
import LoaderRecords from "@components/feedback/LoaderRecords";
import useProducts from "@hooks/useProducts";
import { Col, Container, Row } from "react-bootstrap"

const Products = () => {

  const { refactorProducts, loading, error } = useProducts();

  return (
    <Container>
      <Row>
        <LoaderRecords loading={loading} error={error}>
            {
              refactorProducts?.map((p) =>
                <Col key={p.id} xs={12} md={4} lg={3} className="mb-5 mt-2 d-flex justify-content-center">
                  <Product title={p.title} imgSrc={p.img} price={p.price} productId={p.id} max={p.max} quantity={p.quantity} isLiked={p.isLiked} />
                </Col>
              )
            }
        </LoaderRecords>
        {/* {
          loading === 'pending' ?
            <div className='h-full d-flex justify-content-center align-items-center'>
              <Spinner animation="border" variant="success" />
            </div> :
            productsCategory?.map((p) =>
              <Col key={p.id} xs={12} md={4} lg={3} className="mb-5 mt-2">
                <Product title={p.title} imgSrc={p.img} price={p.price} />
              </Col>
            )
        } */}
      </Row>
    </Container>
  )
}

export default Products