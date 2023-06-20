import React from 'react';
import styles from "../../Assets/Styles/mostPopularCoin.module.css";
import LoadHead from "../AuxiliaryComponents/loadHead";
import {useGetCoinsQuery} from "../../Redux/coinsApi";
import {useNavigate} from "react-router-dom";

const MostPopularCoin = ({index}) => {
    const {data = [], isLoading} = useGetCoinsQuery()
    const assets = data.data
    const navigate = useNavigate()

    return (
            <div className={styles.MostPopularCoinContainer} onClick={() => navigate(`/coin/${assets[index].id}`)}>
                {isLoading
                    ?
                    <LoadHead />
                    :   <>
                            <p>{assets[index].name}</p>
                            <p className={styles.symbol}>{assets[index].symbol}</p>
                            <p>${Number(assets[index].priceUsd).toFixed(2)}</p>
                        </>
                }
            </div>
    )
}

export default MostPopularCoin;