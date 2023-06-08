import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../../Assets/Styles/header.module.css'
import logo from '../../Assets/Images/header-logo.svg'
import portfolio from '../../Assets/Images/portfolio.svg'
import MostPopularCoins from "../MostPopularCoins";




const Header = ({setWalletActive, totalCurrent, transformValues}) => {
    const navigate = useNavigate()
    const showWallet = (e) => {
        e.stopPropagation()
        setWalletActive(true)
    }
    return (
        <>
            <div className={styles.headerLogo} onClick={() => navigate('/')}>
                <img src={logo} alt={'logo'}/>
                <span style={{marginLeft: 6, position:"relative", top: -2}}>CoinCap</span>
            </div>

            <div className={styles.headerBackground}>
                <div className={styles.headerPopularCoinsContainer}>
                    <MostPopularCoins />
                    <button className={styles.headerWallet} onClick={(e) => showWallet(e)}>
                        <img src={portfolio} alt='portfolio' />
                        <span className={styles.headerWalletValue}>{transformValues(totalCurrent)}</span>
                    </button>
                </div>

            </div>
        </>
    );
}

export default Header;