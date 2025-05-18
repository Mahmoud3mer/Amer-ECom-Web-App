import Category from "@components/eCommerce/Category/Category"
import LoaderRecords from "@components/feedback/LoaderRecords";
import useCategories from "@hooks/useCategories";
import { Col, Container, Row } from "react-bootstrap"
import {Helmet} from "react-helmet";
import { useLocation } from "react-router-dom";

const Categories = () => {
  const { categories, loading, error } = useCategories();
  const { pathname } = useLocation();
  // console.log(pathname.slice(1));
  
  return (
    <Container>
       <Helmet>
          <title>{ pathname.slice(1) }</title>
      </Helmet>
      <Row>
        <LoaderRecords loading={loading} error={error} type={'category'}>
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