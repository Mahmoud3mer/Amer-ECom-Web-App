import { useAppSelector } from "@store/hooks";
import styles from './styles.module.css';
import accImg from '@assets/profile.png';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Account = () => {
  const { userInfo } = useAppSelector(s => s.auth);
   const { pathname } = useLocation();

  return (
    <div className={styles.profileContsiner}>
      <Helmet>
        <title>{ pathname.slice(1) }</title>
      </Helmet>
      <div className={styles.profileImg}>
        <img src={accImg} alt="Profile Image." />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileInfoItem}>
          <h5>User Name : </h5>
          <p>{userInfo?.firstName + " " + userInfo?.lastName}</p>
        </div>
        <div className={styles.profileInfoItem}>
          <h5>Email : </h5>
          <p>{userInfo?.email}</p>
        </div>
      </div>
    </div>

  )
}

export default Account