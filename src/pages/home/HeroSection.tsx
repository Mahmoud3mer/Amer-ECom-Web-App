import { Button, Carousel } from "react-bootstrap"
import img_1 from '@assets/hero-section/img1.svg';
import img_2 from '@assets/hero-section/img2.svg';
import img_3 from '@assets/hero-section/img3.webp';
import img_4 from '@assets/hero-section/img4.webp';
import { Link } from "react-router-dom";

const HeroSection = () => {
    const hero_images = [img_1, img_2, img_3, img_4];

    return (
        <Carousel className="mb-4" fade interval={1500} controls={true} indicators={false}>
            {
                hero_images.map((img, i) =>
                    <Carousel.Item key={i}>
                        <img
                            className="d-block w-100"
                            src={img}
                            alt="Shop Now"
                            style={{height:'100dvh', objectFit: 'cover'}}
                        />
                        <Carousel.Caption>
                            <h4 style={{ color: '#016801' }}>Welcome to MyShop!</h4>
                            <p >Discover the best products at unbeatable prices.</p>
                            <Link to="/products">
                                <Button variant="outline-success">
                                    Shop Now
                                </Button>
                            </Link>

                        </Carousel.Caption>
                    </Carousel.Item>
                )
            }
        </Carousel>
    )
}

export default HeroSection