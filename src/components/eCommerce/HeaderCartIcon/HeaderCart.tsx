import Logo from '@assets/svg/cart.svg?react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderCart = ({ count }: { count: number }) => {

  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!count) {
      return;
    }
    setIsAnimate(true);

    const d = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(d);
  }, [count])

  return (
    // <div className={styles.cartIconContainer} title='cart' onClick={() => navigate('/shopping-cart')}>
    //     <Logo/>
    //     <div className={`${styles.cartQuantity} ${isAnimate? styles.pumpCartQuantity : ''}`}>
    //         {count}
    //     </div>
    // </div>

    <div className={styles.cartIconContainer} title='cart' onClick={() => navigate('/shopping-cart')}>
      <div className={styles.iconContainer}>
        <Logo />
        {
          count > 0 &&
          <div className={`${styles.cartQuantity} ${isAnimate ? styles.pumpCartQuantity : ''}`}>
            {count}
          </div>
        }

      </div>
      <span>
        Cart
      </span>
    </div>
  )
}

export default HeaderCart