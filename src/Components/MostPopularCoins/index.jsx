import React from 'react';
import styles from '../../Assets/Styles/mostPopularCoins.module.css'
import {useGetCoinsQuery} from "../../Redux/coinsApi";

const MostPopularCoins = () => {
    const {data = [], isLoading} = useGetCoinsQuery()
    const assets = data.data

    return (
        <>
            <div className={styles.MostPopularCoinContainer}>
                {isLoading ? <p>Loading</p> : <p>{assets[0].name}</p>}
                {isLoading ? <p>Loading</p> : <p className={styles.symbol}>{assets[0].symbol}</p>}
                {isLoading ? <p>Loading</p> : <p>${Number(assets[0].vwap24Hr).toFixed(2)}</p>}
            </div>
            <div className={styles.MostPopularCoinContainer}>
                {isLoading ? <p>Loading</p> : <p>{assets[1].name}</p>}
                {isLoading ? <p>Loading</p> : <p className={styles.symbol}>{assets[1].symbol}</p>}
                {isLoading ? <p>Loading</p> : <p>${Number(assets[1].vwap24Hr).toFixed(2)}</p>}
            </div>
            <div className={styles.MostPopularCoinContainer}>
                {isLoading ? <p>Loading</p> : <p>{assets[2].name}</p>}
                {isLoading ? <p>Loading</p> : <p className={styles.symbol}>{assets[2].symbol}</p>}
                {isLoading ? <p>Loading</p> : <p>${Number(assets[2].vwap24Hr).toFixed(2)}</p>}
            </div>

        </>
    );
};

export default MostPopularCoins;