import React, {useEffect, useRef, useState} from 'react';
import styles from '../../../Assets/Styles/addModalWindow.module.css'
import close from '../../../Assets/Images/close.svg'

const AddWindow = ({active, setActive, name, price, id}) => {
    const [quantity, setQuantity] = useState('')
    const addQuantity = (e) => {
        e.preventDefault()
        const data = {id, quantity: Number(quantity), name, oldPrice: price }
        const store = JSON.parse(localStorage.getItem('wallet'))
        if (store.find(obj => obj.id === id)) {
            const newStore = store.filter(obj => obj.id !== id)
            const oldData = store.filter(obj => obj.id === id)[0]
            newStore.push({...oldData, quantity: Number(oldData.quantity) + Number(quantity)})
            localStorage.setItem('wallet', JSON.stringify(newStore))
        } else {
            store.push(data)
            localStorage.setItem('wallet', JSON.stringify(store))
        }
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