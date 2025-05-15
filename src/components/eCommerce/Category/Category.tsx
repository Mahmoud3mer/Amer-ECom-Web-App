import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface CategoryProps {
  title: string;
  imgSrc: string;
  prefix: string
}

const Category = ({ title, imgSrc, prefix } : CategoryProps) => {
  return (
    <div className={styles.category}>
        <Link to={`/categories/${prefix}`}>
          <div className={styles.image}>
              <img 
              src={imgSrc}
              alt={title}
              loading="lazy"
              />
          </div>
          <h4 className={styles.title}>{ title }</h4>
        </Link>
    </div>
  )
}

export default Category