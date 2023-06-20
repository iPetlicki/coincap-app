import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../Assets/Styles/addModalWindow.module.css'
import close from '../../../Assets/Images/close.svg'
import addCoin from "../../../Helpers/addCoins"

const AddWindow = ({addActive, name, assetState, setAssetState, setAddActive, price, id, checkIsNumber}) => {
    const textInput = useRef(null)
    const [quantity, setQuantity] = useState('')
    const handleClick = (e) => {
        addCoin(e, assetState, price, quantity, setAssetState, id, name)
        setQuantity('')
        setAddActive(false)
    }
    useEffect(() => {
        if (addActive) {
            textInput.current.focus()
        }
    })

    return (
        <>
        {addActive &&
            <div className={styles.modal} onClick={() => setAddActive(false)}>
                <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                    {<h1>Buy {name}</h1>}
                    <form className={styles.form} onSubmit={e => handleClick(e)}>
                        <input className={styles.input} ref={textInput} placeholder='Enter quantity' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                        <button className={styles.add_coin} disabled={!(checkIsNumber(quantity))}>Add</button>
                    </form>
                    <img className={styles.close} src={close} alt='close' onClick={() => setAddActive(false)}/>
                </div>
            </div>
        }
        </>
    )
}

export default AddWindow
