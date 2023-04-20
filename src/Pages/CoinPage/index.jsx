import React from 'react';
import {useGetCoinQuery} from "../../Redux/coinsApi";
import {useParams} from 'react-router-dom'

const CoinPage = () => {
    const {coinId} = useParams()
    const {data, isLoading} = useGetCoinQuery(coinId)

    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <div>
            <p>{data.data.name}</p>
            <p>{data.data.symbol}</p>
            <p>{data.data.rank}</p>
            <p>{data.data.explorer}</p>
        </div>
    );
};

export default CoinPage;