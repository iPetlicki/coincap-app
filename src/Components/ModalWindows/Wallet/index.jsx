import React, {useEffect} from 'react';
import {useGetCoinsQuery} from '../../../Redux/coinsApi';
import styles from "../../../Assets/Styles/wallet.module.css";
import close from '../../../Assets/Images/close.svg'
import remove from '../../../Assets/Images/remove.svg'
import empty from '../../../Assets/Images/empty.svg'

const Wallet = ({walletActive, setWalletActive, totalOld, assetState, removeAsset, transformValues, getTotalCurrent}) => {
    const {data, isLoading} = useGetCoinsQuery(2000)
    const getCurrentPrice = (asset) => {
        return data.data.find(obj => obj.id === asset.id ).priceUsd
    }
    const totalCurrent = () => {
        return assetState.map(item => item.quantity * Number(getCurrentPrice(item))).reduce((total, current) =>  total + current, 0)
    }
    const differenceValues = isLoading ? null : transformValues(totalCurrent() - totalOld)
    const differencePercents =  isLoading ? null : ((totalCurrent() - totalOld) / totalOld * 100).toFixed(3)
    const displayDifference = () => {
        if (!differencePercents) {
            return null
        } else {
            return <p className={differencePercents < 0 ? styles.negative : styles.positive}>({`${differenceValues}, ${Math.abs(differencePercents)}`}%)</p>
        }

    }
    useEffect(() => {
        getTotalCurrent(isLoading? null :totalCurrent())
    })

    return (
        <>
            {isLoading
                ?
                null
                :
                <>
                    {walletActive &&
                    <div className={walletActive ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setWalletActive(false)}>
                        <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                            {assetState.length === 0
                                ? <>
                                    <h1 className={styles.empty}>Your wallet is empty</h1>
                                    <img src={empty} width='200px' height='200px' alt=''/>
                                </>
                                :
                                <>
                                    <h1>Wallet</h1>
                                    <table className={styles.wallet_table}>
                                        <thead>
                                        <tr className={styles.tr_wallet}>
                                            <th className={styles.thMain}>Name</th>
                                            <th className={styles.thMain}>Quantity</th>
                                            <th className={styles.thMain}>Price</th>
                                            <th className={styles.thMain}>Sum</th>
                                            <th className={styles.thMain}> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {assetState.map(asset =>
                                            <tr className={styles.tr_wallet} key={asset.id}>
                                                <td>{asset.name}</td>
                                                <td>{asset.quantity}</td>
                                                <td>{transformValues(getCurrentPrice(asset))}</td>
                                                <td>{transformValues((asset.quantity * getCurrentPrice(asset)))}</td>
                                                <td onClick={() => removeAsset(asset.id)} className={styles.delete}><img src={remove} alt=''/></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                    <div className={styles.total_container}>
                                        <p>Total: {transformValues(totalCurrent())}</p>
                                        {totalCurrent() - totalOld !== 0
                                            ? (<div style={{display:'flex'}}>
                                                {displayDifference()}
                                            </div>)
                                            : null}
                                    </div>
                                </>
                            }
                            <img className={styles.close} src={close} alt='close' onClick={() => setWalletActive(false)}/>
                        </div>
                    </div>}
                </>
                }
        </>
    )
}

export default Wallet