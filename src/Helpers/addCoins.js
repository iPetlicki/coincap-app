const addCoin = (e, assetState, price, quantity, setAssetState, id, name) => {
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
}

export default addCoin