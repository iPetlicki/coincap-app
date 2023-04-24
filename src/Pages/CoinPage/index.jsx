import React from 'react';
import {useGetCoinQuery, useGetHistoryQuery} from "../../Redux/coinsApi";
import {useParams} from 'react-router-dom'
import LineChart from "../../Components/lineChart";
import styles from '../../Assets/Styles/coinPage.module.css'



const CoinPage = () => {
    const {coinId} = useParams()
    const period = 'd1'
    const {data: coinData, isLoading} = useGetCoinQuery(coinId)
    const {data: historyData, isLoading: historyIsLoading} = useGetHistoryQuery({coinId, period})

    const waitResponse = () => {
        return historyIsLoading ? null : {
            labels: historyData.map(data => data.date.slice(0, 7).split('-').join('.')),
            datasets: [{
                fill: true,
                data: historyData.map(data => data.priceUsd),
                label:'Price $',
                pointStyle: false,
                pointHoverRadius: 5,
                borderWidth: 3,
                backgroundColor: ['violet'],
                hoverBackgroundColor: ['red'],
                borderColor: ['violet'],
            }],
        }
    }

    return (
        <>
        {
            isLoading
            ?
            <h1>Loading</h1>
            :
            <div>
                <p>{coinData.name}</p>
                <p>{coinData.symbol}</p>
                <p>{coinData.rank}</p>
                <p>{coinData.explorer}</p>
                <div className={styles.chartContainer} >
                    {historyIsLoading ? null : <LineChart chartData={waitResponse()} />}
                </div>
            </div>
        }
        </>
    )
}

export default CoinPage;