import CartItem from "@components/eCommerce/CartItem/CartItem"
import { Col, Container, Row } from "react-bootstrap"
import CartSubtotalPrice from "@components/eCommerce/CartSubtotalPrice/CartSubtotalPrice"
import useCart from "@hooks/useCart"
import LoaderRecords from "@components/feedback/LoaderRecords"
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler"
import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom"

const Cart = () => {
  const { refactorProducts, loading, error, handleDecreaseQuantity, handleIncreaseQuantity, handlRemoveItemFromCategory } = useCart();
  const { pathname } = useLocation();
  
  return (
    <Container>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      <Row>
        <Col lg={8}>
          <LoaderRecords loading={loading} error={error} type={'cart'}>
            {
              refactorProducts.length < 1 ?

                <div className='d-flex justify-content-center fs-2 fw-medium font-monospace text-success'>
                  {/* Cart Is Empty. */}
                  <LottieHandler type={'empty'} message={'Cart Is Empty.'}/>
                </div> :
                refactorProducts.map((p) =>
                  <CartItem
                    key={p.id}
                    product={p}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    removeItemFromCategory={handlRemoveItemFromCategory}
                    id={""} title={""} price={0} cat_prefix={""} img={null} max={0} isLiked={false}/>
                )
            }
          </LoaderRecords>

          {/* {
            refactorProducts.map((p) => 
              <CartItem
                key={p.id}
                product={p}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
                removeItemFromCategory={handlRemoveItemFromCategory}
                id={""} title={""} price={0} cat_prefix={""} img={null} max={0}
                />
            )
          } */}

        </Col>

        {/* Summary */}
        <Col lg={4}>
          <CartSubtotalPrice cartProducts={refactorProducts} />
        </Col>
      </Row>
    </Container>
  )
}

export default Cart