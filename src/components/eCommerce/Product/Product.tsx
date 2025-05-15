import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { FaCartPlus } from "react-icons/fa6";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cartSlice";
import { memo, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { likeDislikeWishlist } from "@store/wishlistSlice";

interface ProductProps {
    title: string,
    imgSrc: string | null,
    price: number,
    productId: string | number,
    max: number;
    quantity?: number;
    isLiked: boolean;
}
const Product = memo(({ title, imgSrc, price, productId, max, quantity, isLiked }: ProductProps) => {

    const dispatch = useAppDispatch();
    // const [clicked, setClicked] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const remainingQuantity: number = max - (quantity ?? 0);
    const quantityReachedToMax: boolean = remainingQuantity <= 0 ? true : false;

    useEffect(() => {
        if (!btnDisabled) {
            return;
        }
        const d = setTimeout(() => {
            setBtnDisabled(false);
        }, 300)

        return () => clearTimeout(d);
    }, [btnDisabled])

    const handleAddToCart = (productId: string | number) => {
        dispatch(addToCart({ productId }));
        setBtnDisabled(true)
    }

    const handlAddRemoveWishlist = (productId: string | number) => {
        if (isLoading) {
            return;
        }
        
        setIsloading(true)
        dispatch(likeDislikeWishlist(productId))
        .unwrap()
        .then(() => setIsloading(false))
        .catch(() => setIsloading(false));

        // setTimeout(() => {
        //     setIsloading(false);
        // }, 300)
    }

    return (
        <>
            <div className={styles.productCard}>
                <div className={styles.productImg}>
                    <img
                        src={imgSrc ?? ''}
                        alt=""
                        loading="lazy"
                    />
                </div>

                <div className={styles.productContent}>
                    <h4 title={title}>{title}</h4>
                    <div className={styles.price}>
                        {price}<span>EGP</span>
                    </div>
                    <p className={styles.maximumNotice}>
                        {quantityReachedToMax
                            ? <span className="text-danger">You reach to the limit.</span>
                            : `You can add ${remainingQuantity} item(s).`}
                    </p>
                    <Button
                        variant="success"
                        style={{ color: "white", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}
                        onClick={() => handleAddToCart(productId)}
                        disabled={btnDisabled || quantityReachedToMax ? true : false}
                    >
                        {
                            btnDisabled ?
                                <Spinner animation="border" variant="light" style={{ width: '1.5rem', height: '1.5rem' }} /> :
                                <>
                                    <FaCartPlus /> <span>Add to cart</span>
                                </>
                        }

                    </Button>
                </div>

                <div className={styles.favorite}>
                    {
                        isLoading ? <Spinner animation="border" variant="success" style={{ width: '1.5rem', height: '1.5rem' }} /> :
                        isLiked ?
                            <FaHeart className={styles.like} onClick={() => handlAddRemoveWishlist(productId)} /> :
                            <FaRegHeart className={styles.disLike} onClick={() => handlAddRemoveWishlist(productId)} />
                    }
                </div>
            </div>
        </>


    )
})

export default Product