import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../../Assets/Styles/header.module.css'
import logo from '../../Assets/Images/header-logo.svg'
import portfolio from '../../Assets/Images/portfolio.svg'
import MostPopularCoin from "../MostPopularCoin";

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
                <span className={styles.headerName}>CoinCap</span>
            </div>
            <div className={styles.headerBackground}>
                <div className={styles.headerPopularCoinsContainer}>
                    <MostPopularCoin index={0}/>
                    <MostPopularCoin index={1}/>
                    <MostPopularCoin index={2}/>
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