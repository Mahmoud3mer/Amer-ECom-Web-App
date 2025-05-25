import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getAllProducts } from "@store/productsSlice";
import { useEffect } from "react";
import {  Container } from "react-bootstrap";
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  const { pathname } = useLocation();
  const { products } = useAppSelector(s => s.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{pathname.slice(1)}</title>
      </Helmet>

      <div>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <Container>
          <FeaturedProducts products={products}/>
        </Container>
      </div>
    </>
  )
}

export default Home;