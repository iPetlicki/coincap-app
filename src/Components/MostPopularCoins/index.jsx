import React from 'react';
import styles from '../../Assets/Styles/mostPopularCoins.module.css'
import {useGetCoinsQuery} from "../../Redux/coinsApi";
import {useNavigate} from "react-router-dom";
import LoadHead from "../loadHead";

const MostPopularCoins = () => {
    const {data = [], isLoading} = useGetCoinsQuery()
    const assets = data.data
    const navigate = useNavigate()


    return (
        <>
            <div className={styles.MostPopularCoinContainer} onClick={() => navigate(`/coin/${assets[0].id}`)}>
                {isLoading
                    ?
                    <LoadHead />
                :   <>
                        <p>{assets[0].name}</p>
                        <p className={styles.symbol}>{assets[0].symbol}</p>
                        <p>${Number(assets[0].priceUsd).toFixed(2)}</p>
                    </>
                }

            </div>
            <div className={styles.MostPopularCoinContainer} onClick={() => navigate(`/coin/${assets[1].id}`)}>
                {isLoading
                    ?
                    <LoadHead />
                    :   <>
                        <p>{assets[1].name}</p>
                        <p className={styles.symbol}>{assets[1].symbol}</p>
                        <p>${Number(assets[1].priceUsd).toFixed(2)}</p>
                    </>
                }
            </div>
            <div className={styles.MostPopularCoinContainer} onClick={() => navigate(`/coin/${assets[2].id}`)}>
                {isLoading
                    ?
                    <LoadHead />
                    :   <>
                        <p>{assets[2].name}</p>
                        <p className={styles.symbol}>{assets[2].symbol}</p>
                        <p>${Number(assets[2].priceUsd).toFixed(2)}</p>
                    </>
                }
            </div>

        </>
    )
}

export default MostPopularCoins