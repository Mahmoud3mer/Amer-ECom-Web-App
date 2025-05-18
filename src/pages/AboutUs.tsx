
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>

      <div>AboutUs</div>
    </>
    
  )
}

export default AboutUs