import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../Assets/Styles/addModalWindow.module.css'
import close from '../../../Assets/Images/close.svg'

const AddWindow = ({active, setActive, name}) => {
    const [quantity, setQuantity] = useState('')
    const addQuantity = (e) => {
        e.preventDefault()
        localStorage.setItem(name, quantity)
        setQuantity('')
        setActive(false)
    }
    const textInput = useRef(null)
    useEffect(() => {
        textInput.current.focus()
    })

    return (
        <div
            className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}
        >
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                {<p>Buy {name}</p>}
                <form className={styles.form} onSubmit={e => addQuantity(e)}>
                    <p>Enter quantity</p>
                    <input ref={textInput} value={quantity} onChange={e => setQuantity(e.target.value)}/>
                    <button>Add</button>
                </form>
                <img className={styles.close} src={close} alt='close' onClick={() => setActive(false)}/>
            </div>
        </div>
    );
};

export default AddWindow;