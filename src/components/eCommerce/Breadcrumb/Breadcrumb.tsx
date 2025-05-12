import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbExample = () => {
  const location = useLocation();
  const { pathname } = location;

  // Split path and filter out empty strings
  const pathnames = pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Home
      </Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Breadcrumb.Item active key={name}>
            {decodeURIComponent(name)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={name}>
            {decodeURIComponent(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbExample;
