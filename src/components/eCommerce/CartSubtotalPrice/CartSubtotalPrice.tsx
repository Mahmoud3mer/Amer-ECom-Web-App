import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { ProductInterface } from '@inerfaces/interfaces';
import { useEffect, useState } from 'react';

interface ICartSubtotalPrice {
    cartProducts: ProductInterface[],
}

let shipping: number = 0;

const CartSubtotalPrice = ({ cartProducts }: ICartSubtotalPrice) => {
    const [subTotal, setSubTotal] = useState(0);

    if (!subTotal) {
        shipping = 0;
    } else {
        shipping = 100;
    }

    useEffect(() => {
        const result = cartProducts.map((el) => +el.price * (el.quantity as number));
        const sum = result.reduce((prev, current) => prev + current, 0);
        // console.log(sum);
        setSubTotal(sum);
    }, [cartProducts]);


    return (
        <div className={`${styles.summaryContainer} ms-md-4 mt-4 mt-md-0 mb-4`}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryContent}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Subtotal</span>
                    <span className={styles.summaryValue}>{subTotal.toFixed(2)} EGP</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Shipping</span>
                    <span className={styles.summaryValue}>{shipping.toFixed(2)} EGP</span>
                </div>
            </div>

            <div className={styles.summaryTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{(subTotal + shipping).toFixed(2)} EGP</span>
            </div>

            <Button
                variant="success"
                className={`w-100 ${styles.checkoutBtn}`}
            >
                Proceed to Checkout
            </Button>
        </div>
    )
}

export default CartSubtotalPrice