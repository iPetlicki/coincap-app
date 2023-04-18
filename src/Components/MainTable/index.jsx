import {useGetCoinsQuery,} from "../../Redux/coinsApi";
import styles from '../../Assets/Styles/mainTable.module.css'
import React, {useState} from "react";


const MainTable = () => {
    const [limit, setLimit] = useState(10)
    const {data, isLoading} = useGetCoinsQuery(limit)


//------------------------------стилизовать---------------------
    if (isLoading) {
        return <h1>isLoading</h1>
    }
//----------------------------------------------------------
    return (
        <div className={styles.mainTableContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>VWAP</th>
                        <th>Change(24h)</th>
                        <th>Market Cap</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map(assets => <tr key={assets.id}>
                        <td>{assets.rank}</td>
                        <td>{assets.id}</td>
                        <td>{assets.vwap24Hr}</td>
                        <td>{assets.changePercent24Hr}</td>
                        <td>{assets.marketCapUsd}</td>
                        <td>{assets.priceUsd}</td>
                        </tr>)}
                </tbody>
            </table>
            <button
                className={styles.viewMore}
                onClick={() => setLimit(limit + 10)}
            >
                View More
            </button>
        </div>
    );
};

export default MainTable;