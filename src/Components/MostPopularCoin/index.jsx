import React from 'react';
import styles from '../../Assets/Styles/mostPopularCoin.module.css'

const MostPopularCoin = () => {
    return (
        <div className={styles.MostPopularCoinContainer}>
            <p>Name</p>
            <p>abbreviation</p>
            <p>VWAP</p>
        </div>
    );
};

export default MostPopularCoin;