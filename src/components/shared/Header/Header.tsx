import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import styles from './styles.module.css';
import HeaderCart from "@eCommerce/HeaderCartIcon/HeaderCart";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { getCartTotalQuantitySelector, getWishlistTotalQuantitySelector } from "@store/selectors";
import BreadcrumbExamble from "@components/eCommerce/Breadcrumb/Breadcrumb";
import Logo from '@assets/Logo/logo1.svg';
import ECom from '@assets/Logo/eCom.svg';
import HeaderWishlistIcon from "@components/eCommerce/HeaderWishlistIcon/HeaderWishlistIcon";
import { TbLogout2 } from "react-icons/tb";
import { logOut } from "@store/authSlice";
import { useEffect } from "react";
import { getWishlistProducts } from "@store/wishlistSlice";

const Header = () => {
    const navigate = useNavigate();
    const totalCartQuantity = useAppSelector(state => getCartTotalQuantitySelector(state));
    const totalWishlisttQuantity = useAppSelector(state => getWishlistTotalQuantitySelector(state));
    const { userInfo, accessToken } = useAppSelector(s => s.auth);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    console.log(pathname);
    
    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    };

    useEffect(() => {
        dispatch(getWishlistProducts('ProductIds'));
    }, [dispatch, accessToken])

    return (
        <header>
            <div className={styles.headerContainer}>
                {/* <h1 className={styles.headerLogo}>
                    <span>Amer</span>{' '}<Badge bg="success" style={{padding:'8px'}}>ECom</Badge>
                </h1> */}
                <div className={styles.logo} onClick={() => navigate('/')}>
                    {/* <img src={Logo} alt="Logo" /><Badge bg="success" style={{ padding: '8px' }}>eCom</Badge> */}
                    <img src={Logo} alt="Logo" /> <img src={ECom} alt="Logo" />
                </div>
                <div className={styles.iconsWrraper}>
                    <HeaderWishlistIcon count={totalWishlisttQuantity} />
                    <HeaderCart count={totalCartQuantity} />
                </div>

            </div>
            <Navbar
                expand="lg"
                className={`bg-body-tertiary ${styles.navBar}`}
                bg="dark"
                data-bs-theme="dark"
            >
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{margin:'10px'}}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? "activeLink" : "")}>Home</Nav.Link> */}
                            <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.activeLink} nav-link` : "nav-link")}>Home</NavLink>
                            <NavLink to="/categories" className={({ isActive }) => (isActive ? `${styles.activeLink} nav-link` : "nav-link")}>Categories</NavLink>
                            <NavLink to="/about-us" className={({ isActive }) => (isActive ? `${styles.activeLink} nav-link` : "nav-link")}>About</NavLink>
                            <NavLink to="/products" className={({ isActive }) => (isActive ? `${styles.activeLink} nav-link` : "nav-link")}>Products</NavLink>
                        </Nav>

                        {
                            accessToken ?
                                <NavDropdown title={userInfo?.firstName + ' ' + userInfo?.lastName} id="basic-nav-dropdown" style={{ color: '#FFFFFF8C' }}>
                                    <NavDropdown.Item as={NavLink} to={'profile'} end>Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to={'profile/orders'}>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className={styles.logOut} onClick={handleLogOut}>
                                        <TbLogout2 /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown> :
                                <Nav>
                                    <NavLink to="/login" className={({ isActive }) => (isActive ? "activeLink nav-link" : "nav-link")}>Login</NavLink>
                                    <NavLink to="/register" className={({ isActive }) => (isActive ? "activeLink nav-link" : "nav-link")}>Register</NavLink>
                                </Nav>
                        }


                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* BreadcrumbExamble */}
            {
                pathname === '/' ? '' :
                <div className={`${styles.breadcrumb} mt-3 mx-2`}>
                <BreadcrumbExamble />
            </div>
            }
            
        </header>
    )
}

export default Header