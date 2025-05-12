import Product from "@components/eCommerce/Product/Product"
import LoaderRecords from "@components/feedback/LoaderRecords";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getAllProducts, productsCleanUp } from "@store/productsSlice";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"

const AllProducts = () => {
  const { products, loading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);
  const wishlistItemsIds = useAppSelector(state => state.wishlist.itemsId);
  
  const refactorProducts = products.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLiked: wishlistItemsIds.includes(el.id),
  }))

  useEffect(() => {
    dispatch(getAllProducts());

    return () => {
      dispatch(productsCleanUp()); 
    }
  }, [dispatch]);

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
            products?.map((p) =>
              <Col key={p.id} xs={12} md={4} lg={3} className="mb-5 mt-2">
                <Product title={p.title} imgSrc={p.img} price={p.price} />
              </Col>
            )
        } */}
      </Row>
    </Container>
  )
}

export default AllProducts;