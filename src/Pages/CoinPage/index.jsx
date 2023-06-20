import React, {useState} from 'react';
import {useGetCoinQuery, useGetHistoryQuery} from "../../Redux/coinsApi";
import {useParams, useNavigate} from 'react-router-dom'
import styles from '../../Assets/Styles/coinPage.module.css'
import back from '../../Assets/Images/back.svg'
import Index from "../../Components/LineChart";
import LoadMain from "../../Components/AuxiliaryComponents/loadMain";
import NotFoundPge from "../NotFountPage";
import {today, options} from "../../Helpers/getDate";
import addCoin from "../../Helpers/addCoins";

const CoinPage = ({assetState, setAssetState, checkIsNumber, transformValues}) => {
    const navigate = useNavigate()
    const {coinId} = useParams()
    const {data: coinData, isLoading} = useGetCoinQuery(coinId)
    const {data: historyData, isLoading: historyIsLoading, isError} = useGetHistoryQuery(coinId)
    const [coinQuantity, setCoinQuantity] = useState('')
    const handleClick = (e) => {
        addCoin(e, assetState, coinData.priceUsd, coinQuantity, setAssetState, coinData.id, coinData.name)
        setCoinQuantity('')
    }
    const waitResponse = () => {
        return historyIsLoading ? null : {
            labels: historyData.map(data => data.date.slice(0, 10).split('-').join('.')),
            datasets: [{
                fill: true,
                data: historyData.map(data => data.priceUsd),
                label:'Price $',
                pointStyle: false,
                pointHoverRadius: 5,
                borderWidth: 1,
                backgroundColor: ['rgb(116, 144, 252, 0.48)'],
                hoverBackgroundColor: ['red'],
                borderColor: ['rgb(116, 144, 252, 0.48)'],
            }],
        }
    }

    return (
        <>
            {isError
                ?
                <NotFoundPge />
                :

                    isLoading
                    ?
                    <LoadMain />
                    :
                    <>
                        <div className={styles.page_head}>
                            <div className={styles.coin_head_info}>
                                <p className={styles.coin_name}>{coinData.name}</p>
                                <p className={styles.coin_symbol}>{coinData.symbol}</p>
                                <p className={styles.date}>{today.toLocaleDateString('en-US', options)}</p>
                            </div>
                            <form className={styles.form} onSubmit={e => handleClick(e)}>
                                <input className={styles.input} value={coinQuantity} placeholder='Enter quantity' onChange={e => setCoinQuantity(e.target.value)}/>
                                <button className={styles.add_coin} disabled={!checkIsNumber(coinQuantity)}>Add</button>
                            </form>
                        </div>
                        <div className={styles.info_container}>
                            <table className={styles.info_table}>
                                <thead className={styles.table_head}>
                                <tr>
                                    <th>Information</th>
                                    <th>Сurrency data</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Price</td>
                                    <td style={{fontWeight:'bold'}}>{transformValues(coinData.priceUsd)} </td>
                                </tr>
                                <tr>
                                    <td>Available supply for trading</td>
                                    <td>{transformValues(coinData.supply)}</td>
                                </tr>
                                <tr>
                                    <td>Total quantity of asset issued</td>
                                    <td>{transformValues(coinData.maxSupply)}</td>
                                </tr>
                                <tr>
                                    <td>Quantity of trading volume represented in USD over the last 24 hours</td>
                                    <td>{transformValues(coinData.volumeUsd24Hr)}</td>
                                </tr>
                                <tr>
                                    <td>Volume Weighted Average Price in the last 24 hours</td>
                                    <td>{transformValues(coinData.vwap24Hr)}</td>
                                </tr>
                                <tr>
                                    <td>The direction and value change in the last 24 hours</td>
                                    <td>{Number(coinData.changePercent24Hr).toFixed(2)} %</td>
                                </tr>
                                <tr>
                                    <td>Link</td>
                                    <td><a href={`${coinData.explorer}`}  rel="noreferrer" target={'_blank'}>Click</a></td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={styles.chartContainer}>
                                {historyIsLoading ? null : <Index chartData={waitResponse()} />}
                            </div>
                        </div>
                        <button className={styles.back} onClick={() => navigate('/')}>
                            <img src={back} alt='' className={styles.arrow}></img>
                            Back
                        </button>
                    </>
            }
        </>
    )
}

export default CoinPage