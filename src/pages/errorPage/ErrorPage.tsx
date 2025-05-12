import { Container } from "react-bootstrap"
import styles from '@pages/errorPage/styles.module.css'
import { NavLink } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  }else{
    errorStatus = 404;
    errorStatusText = 'Page Not Found';
  }

  return (
    <Container className={styles.pageContainer}>
      <div className={styles.errorContent}>
        {/* <h1>4<span>0</span>4</h1>
        <p>Page <span>Not</span> Found</p> */}
        <h1>{errorStatus}</h1>
        <p>{errorStatusText}</p>
        <Button variant="outline-success">
          <NavLink to={'/'} className={'nav-link'} replace={true}>Back to home</NavLink>
        </Button>
      </div>
    </Container>
  )
}

export default ErrorPage