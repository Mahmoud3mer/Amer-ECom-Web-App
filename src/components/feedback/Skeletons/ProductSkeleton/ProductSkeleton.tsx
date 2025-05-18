import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader"

const ProductSkeleton = () => {
    return (
        <Row>
            {
                Array(4).fill(0).map((el, i) =>
                    <Col key={i} xs={12} md={4} lg={3} className="mb-5 mt-2">
                        <ContentLoader
                            speed={1.5}
                            width={400}
                            height={460}
                            viewBox="0 0 400 460"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="37" y="342" rx="2" ry="2" width="140" height="10" />
                            <rect x="35" y="68" rx="2" ry="2" width="190" height="256" />
                            <rect x="40" y="364" rx="2" ry="2" width="80" height="10" />
                            <rect x="41" y="384" rx="2" ry="2" width="100" height="5" />
                            <rect x="41" y="399" rx="2" ry="2" width="180" height="20" />
                        </ContentLoader>
                    </Col>
                )
            }
        </Row>
    )
}

export default ProductSkeleton;