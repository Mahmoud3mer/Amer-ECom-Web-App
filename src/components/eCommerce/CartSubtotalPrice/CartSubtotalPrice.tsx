import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { ProductInterface } from '@inerfaces/interfaces';
import { useEffect, useState } from 'react';
import ModalAcception from '@components/feedback/Modals/ModalAcception';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { placeOrder } from '@store/ordersSlice';
import toast from 'react-hot-toast';
import { clearCartAfterPlaceOrder } from '@store/cartSlice';

interface ICartSubtotalPrice {
    cartProducts: ProductInterface[],
    accessToken: string | null,
}

let shipping: number = 0;

const CartSubtotalPrice = ({ cartProducts, accessToken }: ICartSubtotalPrice) => {
    const [subTotal, setSubTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const { loading, error } = useAppSelector(s => s.orders);
    const dispatch = useAppDispatch();

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

    const placeOrderHandler = () => {
        dispatch(placeOrder(subTotal)).unwrap().then(() => {
            toast.success('Order Added Success.');
            dispatch(clearCartAfterPlaceOrder())
            setShowModal(false);
        }).catch((err) => {
            toast.error(err || error);
        });
    }

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

            {
                accessToken &&
                <Button
                    variant="success"
                    className={`w-100 ${styles.checkoutBtn}`}
                    onClick={handleShowModal}
                    disabled={ !subTotal ? true : false}
                >
                    Checkout
                </Button>
            }

            <ModalAcception subtotal={subTotal} loading={loading} show={showModal} handleClose={handleCloseModal} placeOrderHandler={placeOrderHandler} />
        </div>
    )
}

export default CartSubtotalPrice