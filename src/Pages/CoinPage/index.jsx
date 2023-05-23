import React, {useState} from 'react';
import {useGetCoinQuery, useGetHistoryQuery} from "../../Redux/coinsApi";
import {useParams, useNavigate} from 'react-router-dom'
import LineChart from "../../Components/lineChart";
import styles from '../../Assets/Styles/coinPage.module.css'
import back from '../../Assets/Images/back.svg'
import LoadMain from "../../Components/loadMain";

const CoinPage = ({assetState, setAssetState, checkIsNumber, transformValues}) => {
    const navigate = useNavigate()
    const {coinId} = useParams()
    const period = 'd1'
    const {data: coinData, isLoading} = useGetCoinQuery(coinId)
    const {data: historyData, isLoading: historyIsLoading} = useGetHistoryQuery({coinId, period})
    const [coinQuantity, setCoinQuantity] = useState('')
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const now = today.toLocaleString('en-US', options);

    const addCoin = (e) => {
        e.preventDefault()
        if (assetState.find(obj => obj.id === coinData.id)) {
            const newStorage = assetState.map((item, index) => item.id === coinData.id ? {...item, oldPrice: coinData.priceUsd, quantity: Number(assetState[index].quantity) + Number(coinQuantity)} : item)
            localStorage.setItem('wallet', JSON.stringify(newStorage))
            setAssetState(JSON.parse(localStorage.getItem('wallet')))
        } else {
            const newStorage = [...assetState, {id: coinData.id, quantity: Number(coinQuantity), name: coinData.name, oldPrice: coinData.priceUsd}]
            localStorage.setItem('wallet', JSON.stringify(newStorage))
            setAssetState(JSON.parse(localStorage.getItem('wallet')))
        }
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
        {
            isLoading
            ?
            <LoadMain />
            :
                <>
                    <div className={styles.page_head}>
                        <div className={styles.coin_head_info}>
                            <p className={styles.coin_name}>{coinData.name}</p>
                            <p className={styles.coin_symbol}>{coinData.symbol}</p>
                            <p className={styles.date}>{now}</p>
                        </div>
                        <form className={styles.form} onSubmit={e => addCoin(e)}>
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
                            {historyIsLoading ? null : <LineChart chartData={waitResponse()} />}
                        </div>
                    </div>
                    <button className={styles.back} onClick={() => navigate('/')}>
                        <img src={back} alt='' className={styles.arrow}></img>
                    </button>
            </>
        }
        </>
    )
}

export default CoinPage