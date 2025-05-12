import { IoMdClose } from "react-icons/io";
import { HiPlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";

import styles from './styles.module.css'
import { ProductInterface } from "@inerfaces/interfaces";
import { memo, useEffect, useState } from "react";


interface CartItemInterface extends ProductInterface {
    product: ProductInterface;
    handleIncreaseQuantity: (productId: number | string, quantity: number, max: number) => void;
    handleDecreaseQuantity: (productId: number | string, quantity: number) => void;
    removeItemFromCategory: (productId: number | string) => void;
}

const CartItem = memo(({ product, handleIncreaseQuantity, handleDecreaseQuantity, removeItemFromCategory }: CartItemInterface) => {
    const [isAnimate, setIsAnimate] = useState(false);

    useEffect(() => {
        setIsAnimate(true);

        const d = setTimeout(() => {
            setIsAnimate(false);
        }, 300)

        return () => clearTimeout(d)
    }, [product.quantity])

    return (
        <div className={styles.cartItemContainer}>
            <div className={styles.cartItemIcon} title="Remove item">
                <IoMdClose onClick={() => removeItemFromCategory(product.id)} />
            </div>
            <div className={styles.cartItemContentContainer}>
                <div className={styles.cartItemImage}>
                    <img src={product.img ?? ''} alt={product.title} loading="lazy" />
                </div>
                <div className={styles.cartItemContent}>
                    <div className={styles.productInfo}>
                        <span className={styles.category}>{product.cat_prefix}</span>
                        <h3 className={styles.title}>{product.title}</h3>
                    </div>

                    <div className={`${styles.controlsContainer} d-flex flex-column flex-md-row`}>
                        <div className={styles.cartItemQuantity}>
                            <button className={styles.quantityBtn} onClick={() => handleDecreaseQuantity(product.id, product.quantity as number)}>
                                <HiMinusSm />
                            </button>
                            <span className={`${styles.quantity} ${isAnimate ? styles.pumping : ''}`}>
                                {product.quantity}
                            </span>
                            <button className={styles.quantityBtn} onClick={() => handleIncreaseQuantity(product.id, product.quantity as number, product.max)}>
                                <HiPlusSm />
                            </button>
                        </div>

                        <div className={styles.cartItemPrice}>
                            <span>{product.price} EGP</span>
                            <span className={styles.totalPrice}>{(product.price * (product.quantity || 1)).toFixed(2)} EGP</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default CartItem