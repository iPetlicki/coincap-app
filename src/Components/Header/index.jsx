import React from 'react';
import styles from '../../Assets/Styles/header.module.css'
import logo from '../../Assets/Images/header-logo.svg'
import portfolio from '../../Assets/Images/portfolio.svg'
import MostPopularCoins from "../MostPopularCoins";


const Header = () => {
    return (
        <div>
            <div className={styles.headerLogo}>
                <img src={logo} alt={'logo'}/>
                <span style={{marginLeft: 6, position:"relative", top: -2}}>CoinCap</span>
            </div>

            <div className={styles.headerBackground}>
                <div className={styles.headerPopularCoinsContainer}>
                    <MostPopularCoins />
                </div>
                <button className={styles.headerPortfolio}>
                    <img src={portfolio} alt='portfolio' />
                    <span className={styles.headerPortfolioValue}>16156.24 $</span>
                </button>
            </div>
        </div>
    );
}

export default Header;