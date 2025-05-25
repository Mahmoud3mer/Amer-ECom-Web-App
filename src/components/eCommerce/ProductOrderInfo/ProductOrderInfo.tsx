import styles from "./styles.module.css";


interface ProductProps {
    title: string,
    imgSrc: string | null,
    price: number,
    quantity?: number;
}

const ProductOrderInfo = ({ title, imgSrc, price, quantity }: ProductProps) => {
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
                    <h5 title={title}>{title}</h5>
                    <div className={styles.price}>
                        {price}<span>EGP</span>
                    </div>
                    <p>
                        Total Quantity : {quantity}
                    </p>
                    <p>
                        Total Price : {quantity as number * price} EGP
                    </p>
                </div>

            </div>
        </>
  )
}

export default ProductOrderInfo