import {useGetCoinsQuery} from "../../Redux/coinsApi";
import styles from '../../Assets/Styles/mainTable.module.css'
import {useNavigate} from "react-router-dom";
import plus from '../../Assets/Images/plus.svg'
import LoadMain from "../loadMain";


const MainTable = ({limit, setLimit, getData, setAddActive, transformValues}) => {
    const {data, isLoading} = useGetCoinsQuery(limit)
    const navigate = useNavigate()
    const showModal = (e, assets) => {
        e.stopPropagation()
        setAddActive(true)
        getData(assets.priceUsd, assets.name, assets.id)
    }

    return (
        <>
            {
                isLoading
                    ?
                    <LoadMain />
                    :
                    <div className={styles.mainTableContainer}>
                        <table className={styles.mainTable}>
                            <thead>
                            <tr className={styles.trMain}>
                                <th className={styles.thMain}>Rank</th>
                                <th className={styles.thMain}>Name</th>
                                <th className={styles.thMain}>VWAP(24h)</th>
                                <th className={styles.thMain}>Change(24h)</th>
                                <th className={styles.thMain}>Market Cap</th>
                                <th className={styles.thMain}>Price</th>
                                <th className={styles.thMain}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.data.map(assets =>
                                <tr className={styles.trMain} key={assets.id} onClick={() => navigate(`/coin/${assets.id}`)}>
                                    <td className={styles.tdMain}>{assets.rank}</td>
                                    <td className={styles.tdMain}>{assets.name}
                                        <p className={styles.symbol}>{assets.symbol}</p>
                                    </td>
                                    <td className={styles.tdMain}>{transformValues(assets.vwap24Hr)}</td>
                                    <td className={styles.tdMain} style={assets.changePercent24Hr < 0 ? {color: 'red'} : {color: 'green'}}>
                                        {Number(assets.changePercent24Hr).toFixed(2)}%
                                    </td>
                                    <td className={styles.tdMain}>{transformValues(assets.marketCapUsd)}</td>
                                    <td className={styles.tdMain}>{transformValues(assets.priceUsd)}</td>
                                    <td  className={styles.tdMain} onClick={(e) => showModal(e, assets)}>
                                        <img
                                            src={plus}
                                            alt='plus'
                                            width='16px'
                                            height='16px'
                                            title='add to portfolio'
                                        />
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <button className={styles.viewMore} onClick={() => setLimit(limit + 10)}>View More</button>
                    </div>
            }

        </>
    )
}

export default MainTable
