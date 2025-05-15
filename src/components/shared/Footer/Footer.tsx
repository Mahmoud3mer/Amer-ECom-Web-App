import { Col, Row } from 'react-bootstrap';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
       <Row className={styles.content}>
        <Col className={styles.item} lg={3} md={6}>
          <h4>Company</h4>
          <div>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </Col>

        <Col className={styles.item} lg={3} md={6}>
          <h4>Get Help</h4>
          <div>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Payment Options</a></li>
            </ul>
          </div>
        </Col>

        <Col className={styles.item} lg={3} md={6}>
          <h4>Online Shop</h4>
          <div>
            <ul>
              <li><a href="#">Watch</a></li>
              <li><a href="#">Bag</a></li>
              <li><a href="#">Shoes</a></li>
              <li><a href="#">Dress</a></li>
            </ul>
          </div>
        </Col>

        <Col className={`${styles.item} ${styles.followUs}`} lg={3} md={6}>
          <h4>Follow Us</h4>
          <div>
            <ul>
              <li><a href="#"><FaFacebookF/></a></li>
              <li><a href="#"><FaLinkedinIn/></a></li>
              <li><a href="#"><FaWhatsapp/></a></li>
            </ul>
          </div>
        </Col>

       </Row>
       <div className={styles.copyRights}>
        © 2025 Amer eCom. All rights reserved.
       </div>
    </footer>
  )
}

export default Footer;