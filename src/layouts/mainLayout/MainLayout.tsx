import { Container } from 'react-bootstrap';
import styles from './styles.module.css';
import Header from '@components/shared/Header/Header';
import Footer from '@components/shared/Footer/Footer';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
  return (
    <div className={styles.container}>
        {/* start header */} 
        <Header />
        {/* end header */}

        {/* start content */}
        <div className={styles.wrapper}>
            <Outlet/>
        </div>
        {/* end content */}

        {/* start footer */}
        <Footer />
        {/* end footer */}
    </div>
  )
}

export default MainLayout