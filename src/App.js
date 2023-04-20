import CoinPage from "./Pages/CoinPage";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header";
import MainTable from "./Components/MainTable";
import {useState} from "react";



function App() {
    const [limit, setLimit] = useState(10)
    return (
          <div className='App'>
              <Header />
              <Routes>
                  <Route path='/' element={<MainTable limit={limit} setLimit={setLimit} />}/>
                    <Route path='coin' element={<CoinPage />}>
                        <Route path=':coinId' element={<CoinPage />}/>
                    </Route>
              </Routes>
          </div>
  )
}

export default App;
