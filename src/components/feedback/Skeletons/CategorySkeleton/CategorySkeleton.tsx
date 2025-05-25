import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader"

const CategorySkeleton = () => {
    return (
        <Row>
            {
                Array(4).fill(0).map((_,i) =>
                    <Col key={i} xs={12} md={4} lg={3} className="mb-5 mt-2">
                        <ContentLoader
                            speed={1.5}
                            width={180}
                            height={180}
                            viewBox="0 0 180 180"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="39" y="133" rx="3" ry="3" width="80" height="6" />
                            <circle cx="77" cy="66" r="56" />
                        </ContentLoader>
                    </Col>
                )
            }
        </Row>
    )
}

export default CategorySkeleton;