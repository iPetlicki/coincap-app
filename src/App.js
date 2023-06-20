import CoinPage from "./Pages/CoinPage";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import MainTable from "./Components/MainTable";
import React, {useState} from "react";
import AddWindow from "./Components/ModalWindows/AddWindow";
import Wallet from "./Components/ModalWindows/Wallet";
import NotFoundPge from "./Pages/NotFountPage";
import {useGetCoinsQuery} from "./Redux/coinsApi";

function App() {
    if (!localStorage.getItem('wallet')) {
        localStorage.setItem('wallet', JSON.stringify([]))
    }
    const [limit, setLimit] = useState(10)
    const [addActive, setAddActive] = useState(false)
    const [walletActive, setWalletActive] = useState(false)
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [assetState, setAssetState] = useState(JSON.parse(localStorage.getItem('wallet')))
    const [totalCurrent, setTotalCurrent] = useState('')
    if (limit > 2000) {
        setLimit(2000)
    }
    const {data, isLoading, isError} = useGetCoinsQuery(limit)
    const checkIsNumber = (quantity) => {
        return !isNaN(quantity) && quantity > 0
    }
    const getData = (price, name, id) => {
        setPrice(price)
        setName(name)
        setId(id)
    }
    const totalOld = (assetState.reduce((total, old) =>  total + old.quantity * old.oldPrice, 0))
    const removeAsset = (id) => {
        const filteredArr = assetState.filter(item => item.id !== id)
        localStorage.setItem('wallet', JSON.stringify(filteredArr))
        setAssetState(JSON.parse(localStorage.getItem('wallet')))
    }
    const getTotalCurrent = (value) => {
        setTotalCurrent(value)
    }

    const transformValues = (string) => {
        if (Math.abs(string) >= 1e6 && Math.abs(string) < 1e9) {
            return '$' + (Number(string) / 1e6).toFixed(2) + 'm'
        } else if (Math.abs(string) >= 1e9 && Math.abs(string) < 1e12) {
            return '$' + (Number(string) / 1e9).toFixed(2) + 'b'
        } else if (string === null) {
            return '-'
        } else if (Math.abs(string) > 1e12) {
            return '$' + (Number(string) / 1e12).toFixed(2) + 't'
        } else if (string === 0) {
            return '0 $'
        } else if (Math.abs(string) < 0.01) {
            return '$' + Number(string).toFixed(7)
        } else {
            return '$' + Number(string).toFixed(2)
        }
    }

    return (
        <>
            {isError
                ?
                <NotFoundPge />
                :
                <div className='App'>
                    <Header
                        setWalletActive={setWalletActive}
                        totalCurrent={totalCurrent}
                        transformValues={transformValues}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                    />
                    <Routes>
                        <Route path='/'
                               element={<MainTable
                                   limit={limit}
                                   setLimit={setLimit}
                                   setAddActive={setAddActive}
                                   getData={getData}
                                   transformValues={transformValues}
                                   data={data}
                                   isLoading={isLoading}
                                   isError={isError}
                               />
                               }/>
                        <Route path='coin' element={<CoinPage assetState={assetState} setAssetState={setAssetState} checkIsNumber={checkIsNumber} transformValues={transformValues}/>}>
                            <Route path=':coinId' element={<CoinPage assetState={assetState} setAssetState={setAssetState} checkIsNumber={checkIsNumber} transformValues={transformValues}/>}/>
                        </Route>
                        <Route path='*' element={<NotFoundPge />} />
                    </Routes>
                    <AddWindow
                        addActive={addActive}
                        setAddActive={setAddActive}
                        name={name}
                        price={price}
                        id={id}
                        assetState={assetState}
                        setAssetState={setAssetState}
                        checkIsNumber={checkIsNumber}
                    />
                    <Wallet
                        walletActive={walletActive}
                        setWalletActive={setWalletActive}
                        totalOld={totalOld}
                        assetState={assetState}
                        removeAsset={removeAsset}
                        transformValues={transformValues}
                        getTotalCurrent={getTotalCurrent}
                    />
                </div>}
        </>

  )
}

export default App;