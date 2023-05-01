import CoinPage from "./Pages/CoinPage";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import MainTable from "./Components/MainTable";
import React, {useState} from "react";
import AddWindow from "./Components/ModalWindows/AddWindow";
import Wallet from "./Components/ModalWindows/Wallet";

function App() {
    const [limit, setLimit] = useState(10)
    const [addActive, setAddActive] = useState(false)
    const [walletActive, setWalletActive] = useState(false)
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const getData = (price, name, id) => {
        setPrice(price)
        setName(name)
        setId(id)
    }
    const [total, setTotal] = useState('')
    const getTotal = (total) => {
        setTotal(total)
    }
    if (!localStorage.getItem('wallet')) {
        localStorage.setItem('wallet', JSON.stringify([]))
    }
    const [assetState, setAssetState] = useState(JSON.parse(localStorage.getItem('wallet')))
    const removeAsset = (id) => {
        const filteredArr = assetState.filter(item => item.id !== id)
        localStorage.setItem('wallet', JSON.stringify(filteredArr))
        setAssetState(JSON.parse(localStorage.getItem('wallet')))
    }



    return (
          <div className='App'>
              <Header setWalletActive={setWalletActive} total={total}/>
              <Routes>
                  <Route path='/' element={<MainTable limit={limit} setLimit={setLimit} setActive={setAddActive} getData={getData}/>}/>
                    <Route path='coin' element={<CoinPage id={id}/>}>
                        <Route path=':coinId' element={<CoinPage id={id}/>}/>
                    </Route>
              </Routes>
              <AddWindow active={addActive} setActive={setAddActive}  name={name} price={price} id={id} assetState={assetState} setAssetState={setAssetState}/>
              <Wallet walletActive={walletActive} setWalletActive={setWalletActive} getTotal={getTotal} assetState={assetState} removeAsset={removeAsset}/>
          </div>
  )
}

export default App;
