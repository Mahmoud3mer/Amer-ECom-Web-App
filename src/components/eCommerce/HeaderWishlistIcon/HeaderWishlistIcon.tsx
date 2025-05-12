import Wishlist from '@assets/wishlist/wishlist.svg?react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderWishlistIcon = ({ count }: { count: number }) => {
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
        <div className={styles.wihlistIconContainer} title='Wishlist' onClick={() => navigate('wishList')}>
            <div className={styles.iconContainer}>
                <Wishlist />
                {
                    count > 0 &&
                    <div className={`${styles.wishlistQuantity} ${isAnimate ? styles.pumpCartQuantity : ''}`}>
                        {count}
                    </div>
                }
            </div>
            <span>
                Wishlist
            </span>
        </div>
    )
}

export default HeaderWishlistIcon