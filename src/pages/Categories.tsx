import Category from "@components/eCommerce/Category/Category"
import LoaderRecords from "@components/feedback/LoaderRecords";
import { getCategories } from "@store/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap"

const Categories = () => {
  const { categories, loading, error } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch])

  return (
    <Container>
      <Row>
        <LoaderRecords loading={loading} error={error}>
          {
            categories?.map((c) =>
              <Col key={c.id} xs={12} md={4} lg={3} className="mb-5 mt-2">
                <Category title={c.title} imgSrc={c.img} prefix={c.prefix} />
              </Col>
            )
          }
        </LoaderRecords>
        {/* {
          loading === 'pending' ?
            <div className='h-full d-flex justify-content-center align-items-center'>
              <Spinner animation="border" variant="success" />
            </div> :
            categories?.map((c) =>
              <Col key={c.id} xs={12} md={4} lg={3} className="mb-5 mt-2">
                <Category title={c.title} imgSrc={c.img} prefix={c.prefix} />
              </Col>
            )
        } */}
      </Row>
    </Container>
  )
}

export default Categories