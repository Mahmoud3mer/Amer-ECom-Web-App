import CartItem from "@components/eCommerce/CartItem/CartItem"
import { Col, Container, Row } from "react-bootstrap"
import CartSubtotalPrice from "@components/eCommerce/CartSubtotalPrice/CartSubtotalPrice"
import useCart from "@hooks/useCart"

const Cart = () => {
  const { refactorProducts, loading, error, handleDecreaseQuantity, handleIncreaseQuantity, handlRemoveItemFromCategory } = useCart();
  // const handleDecreaseQuantity = (productId: number | string, quantity: number) => {
  //   if (quantity > 1) {
  //     dispatch(decreaseQuantity({ productId, quantity }))
  //   }
  // }
  // const handleIncreaseQuantity = (productId: number | string, quantity: number, max: number) => {
  //   if (quantity < max) {
  //     dispatch(increaseQuantity({ productId, quantity }))
  //   }
  // }
  // const handlRemoveItemFromCategory = (productId: number | string) => {
  //   dispatch(removeItemFromCategory({ productId }))
  // }

  return (
    <Container>
      <Row>
        <Col lg={8}>

          {
            refactorProducts.length < 1 ?

              <div className='d-flex justify-content-center fs-2 fw-medium font-monospace text-success'>
                Cart Is Empty.
              </div> :
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
          }
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