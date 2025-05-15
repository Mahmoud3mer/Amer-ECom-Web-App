import { Spinner } from 'react-bootstrap';
import styles from './styles.module.css';

const IntroLoader = () => {
  return (
    <>
        <div className={`${styles.loaderContainer}`}>
            <Spinner animation="grow" variant="success"/>
        </div>
    </>
  )
}

export default IntroLoader