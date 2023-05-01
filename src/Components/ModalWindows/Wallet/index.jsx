import React, {useEffect} from 'react';
import styles from "../../../Assets/Styles/wallet.module.css";
import close from '../../../Assets/Images/close.svg'

const Wallet = ({walletActive, setWalletActive, getTotal, assetState, removeAsset}) => {
    const total = (assetState.reduce((total, current) => {return total + current.quantity * current.oldPrice}, 0)).toFixed(2)

    useEffect(() => getTotal(total))

    return (
            <div className={walletActive ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setWalletActive(false)}>
                <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                    <p>Your wallet</p>
                    <table style={{border: "solid 4px"}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price(old)</th>
                                <th>Sum</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetState.map((asset) =>
                                <tr key={asset.id}>
                                    <td>{asset.name}</td>
                                    <td>{asset.quantity}</td>
                                    <td>{Number(asset.oldPrice).toFixed(2)}</td>
                                    <td>{Number(asset.quantity * asset.oldPrice).toFixed(2)}</td>
                                    <td onClick={() => removeAsset(asset.id)} className={styles.delete}>X</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h2>total: {total}</h2>
                    <img className={styles.close} src={close} alt='close' onClick={() => setWalletActive(false)}/>
                </div>
            </div>
    );
};

export default Wallet;