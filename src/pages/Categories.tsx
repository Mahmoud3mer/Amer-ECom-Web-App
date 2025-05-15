import Category from "@components/eCommerce/Category/Category"
import LoaderRecords from "@components/feedback/LoaderRecords";
import useCategories from "@hooks/useCategories";
import { Col, Container, Row } from "react-bootstrap"

const Categories = () => {
  const { categories, loading, error } = useCategories();

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
      </Row>
    </Container>
  )
}

export default Categories