import styles from './styles.module.css';

const ToastItem = () => {
  return (
    <div className={`${styles.toastItem} alert alert-primary`}>
        <h5>title</h5>
        <p>message</p>
        <button type="button" className="btn-close"></button>
        <span
        className="placeholder"
        style={{
          width: `100%`,
        }}
      ></span>
    </div>
  )
}

export default ToastItem