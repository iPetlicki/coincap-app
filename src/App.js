import CoinPage from "./Pages/CoinPage";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import MainTable from "./Components/MainTable";
import React, {useState} from "react";
import AddWindow from "./Components/ModalWindows/AddWindow";
import Portfolio from "./Components/ModalWindows/Portfolio";

function App() {
    const [limit, setLimit] = useState(10)
    const [addActive, setAddActive] = useState(false)
    const [portfolioActive, setPortfolioActive] = useState(false)
    // const [id, setId] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const getData = (id, name) => {
        setPrice(id)
        setName(name)
    }

    return (
          <div className='App'>
              <Header setPortfolioActive={setPortfolioActive}/>
              <Routes>
                  <Route path='/' element={<MainTable limit={limit} setLimit={setLimit} setActive={setAddActive} getData={getData}/>}/>
                    <Route path='coin' element={<CoinPage />}>
                        <Route path=':coinId' element={<CoinPage />}/>
                    </Route>
              </Routes>
              <AddWindow active={addActive} setActive={setAddActive}  name={name}/>
              <Portfolio portfolioActive={portfolioActive} setPortfolioActive={setPortfolioActive}/>
          </div>
  )
}

export default App;
