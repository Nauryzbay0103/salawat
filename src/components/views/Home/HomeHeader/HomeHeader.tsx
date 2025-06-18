import UserIcon from '@/assets/icons/user-icon.svg?react'
import logo from '@/assets/images/logo.png'
import styles from './HomeHeader.module.scss'

const HomeHeader = () => {
    return (
        <div className={styles.homeHeader}>
            <div className={styles.homeHeader__content}>
                <img src={logo} alt='logo' />
                <button className={styles.login_button}>
                    <UserIcon style={{ width: '1.125rem', height: '1.125rem' }} />
                    Войти
                </button>
            </div>
        </div>
    )
}

export default HomeHeader
