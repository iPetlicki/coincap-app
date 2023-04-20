import {useGetCoinsQuery} from "../../Redux/coinsApi";
import styles from '../../Assets/Styles/mainTable.module.css'
import {useNavigate} from "react-router-dom";

const MainTable = ({limit, setLimit}) => {

    const {data, isLoading} = useGetCoinsQuery(limit)
    const navigate = useNavigate()

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map(assets =>
                        <tr
                            key={assets.id}
                            onClick={() => navigate(`/coin/${assets.id}`)}
                        >
                            <td>{assets.rank}</td>
                            <td>
                                {assets.name}
                                <td className={styles.symbol}>{assets.symbol}</td>
                            </td>
                            <td>${Number(assets.vwap24Hr).toFixed(2)}</td>
                            <td
                                style={assets.changePercent24Hr < 0 ? {color: 'red'} : {color: 'green'}}
                            >
                                {Number(assets.changePercent24Hr).toFixed(2)}%
                            </td>
                            <td>${Number(assets.marketCapUsd).toLocaleString('en')}</td>
                            <td>${Number(assets.priceUsd).toFixed(2)}</td>
                            <td>+</td>
                        </tr>
                    )}
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

//Number(data.data[0].marketCapUsd).toFixed(0).length