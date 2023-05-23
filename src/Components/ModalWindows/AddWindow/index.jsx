import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../Assets/Styles/addModalWindow.module.css'
import close from '../../../Assets/Images/close.svg'

const AddWindow = ({addActive, name, assetState, setAssetState, setAddActive, price, id, checkIsNumber}) => {
    const textInput = useRef(null)
    const [quantity, setQuantity] = useState('')
    const addQuantity = (e) => {
        e.preventDefault()
        if (assetState.find(obj => obj.id === id)) {
            const newStorage = assetState.map((item, index) => item.id === id ? {...item, oldPrice: price, quantity: Number(assetState[index].quantity) + Number(quantity)} : item)
            localStorage.setItem('wallet', JSON.stringify(newStorage))
            setAssetState(JSON.parse(localStorage.getItem('wallet')))
        } else {
            const newStorage = [...assetState, {id, quantity: Number(quantity), name, oldPrice: price }]
            localStorage.setItem('wallet', JSON.stringify(newStorage))
            setAssetState(JSON.parse(localStorage.getItem('wallet')))
        }
        setQuantity('')
        setAddActive(false)
    }
    useEffect(() => {
        textInput.current.focus()
    })

    return (
        <div
            className={addActive ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setAddActive(false)}
        >
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                {<h1>Buy {name}</h1>}
                <form className={styles.form} onSubmit={e => addQuantity(e)}>
                    <input className={styles.input} ref={textInput} placeholder='Enter quantity' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                    <button className={styles.add_coin} disabled={!(checkIsNumber(quantity))}>Add</button>
                </form>
                <img className={styles.close} src={close} alt='close' onClick={() => setAddActive(false)}/>
            </div>
        </div>
    );
};

export default AddWindow;
