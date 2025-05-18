
import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader"

const CartSkeleton = () => {
    return (
        <Row>
            {
                Array(4).fill(0).map((el, i) =>
                    <Col key={i}>
                        <ContentLoader
                            speed={1.5}
                            width={400}
                            height={150}
                            viewBox="0 0 400 150"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="143" y="53" rx="2" ry="2" width="70" height="10" />
                            <rect x="142" y="31" rx="2" ry="2" width="50" height="8" />
                            <rect x="32" y="19" rx="2" ry="2" width="100" height="120" />
                            <rect x="144" y="87" rx="10" ry="10" width="126" height="20" />
                            <rect x="315" y="82" rx="2" ry="2" width="60" height="8" />
                            <rect x="311" y="105" rx="2" ry="2" width="70" height="10" />
                            <rect x="4" y="49" rx="2" ry="2" width="10" height="8" />
                        </ContentLoader>
                    </Col>
                )
            }
        </Row>
    )
}

export default CartSkeleton;