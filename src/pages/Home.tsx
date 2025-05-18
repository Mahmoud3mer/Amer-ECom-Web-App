import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();
  
  return (
    <>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>

      <div>Home</div>
    </>
  )
}

export default Home