import { Col, Container, ListGroup, Row } from "react-bootstrap"
import { NavLink, Outlet } from "react-router-dom"

const ProfileLayout = () => {
    return (
        <Container className="my-5">
            <Row>
                <Col md={3} className="mb-5">
                    <ListGroup>
                        <ListGroup.Item as={NavLink} to={''} end variant="success">
                            Profile
                        </ListGroup.Item>
                        <ListGroup.Item as={NavLink} to={'orders'} variant="success">
                            Orders
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileLayout;