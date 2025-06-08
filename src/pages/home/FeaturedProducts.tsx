import { ProductInterface } from "@inerfaces/interfaces"
import { Row } from "react-bootstrap"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import '/node_modules/swiper/swiper.css';

import Product from "@components/eCommerce/Product/Product";

type TFeaturedProducts = {
    products: ProductInterface[];
}

const FeaturedProducts = ({ products }: TFeaturedProducts) => {
    const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            spaceBetween: 40
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 4,
            spaceBetween: 50
        }
    };

    return (
        <>
            <h2 className="text-center mb-4">Featured Products</h2>
            <Row className="my-5">
                <Swiper
                    effect={'coverflow'}
                    spaceBetween={50}
                    slidesPerView={4}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                    loop
                    navigation={true}
                    pagination={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 5,
                        stretch: 20,
                        depth: 50,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    breakpoints={breakpoints}
                >
                    {
                        products.map((p) => (
                            <SwiperSlide key={p.id} className="d-flex justify-content-center">
                                <Product title={p.title} imgSrc={p.img} price={p.price} productId={p.id} max={p.max} quantity={p.quantity} isLiked={p.isLiked} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Row>
        </>
    )
}

export default FeaturedProducts