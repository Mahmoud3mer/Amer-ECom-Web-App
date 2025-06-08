import Product from "@components/eCommerce/Product/Product";
import LoaderRecords from "@components/feedback/LoaderRecords";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useWishlist from "@hooks/useWishlist";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';

const WishList = () => {
  const {refactorProducts, loading, error} = useWishlist();
  const { pathname } = useLocation();

  return (
    <Container>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      
      <Row>
        <LoaderRecords loading={loading} error={error} type={'product'}>
          {
            refactorProducts.length < 1 ?
              <div className='d-flex justify-content-center fs-2 fw-medium font-monospace text-success'>
                {/* Wishlist Is Empty. */}
                <LottieHandler type={'empty'} message={'Wishlist Is Empty.'}/>
              </div> :
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

export default WishList