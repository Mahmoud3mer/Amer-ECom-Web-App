import styles from './styles.module.css';
import ToastItem from './ToastItem';

const ToastList = () => {
  return (
    <div className={styles.toastList}>
        <ToastItem/>
        <ToastItem/>
    </div>
  )
}

export default ToastList