import styles from './styles.module.css';
import Header from '@components/shared/Header/Header';
import Footer from '@components/shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

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

        {/* Toaster */}
        {/* <ToastList/> */}
        
        <Toaster
          position='top-right'
          gutter={8} 
          toastOptions={{
            duration: 2000,
            success: {
              style: {
                background: 'green',
                color: 'white',
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white',
              },
            },
          }}
        />

        {/* start footer */}
        <Footer />
        {/* end footer */}
    </div>
  )
}

export default MainLayout