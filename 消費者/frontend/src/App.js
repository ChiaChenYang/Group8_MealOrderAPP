import React from 'react'
import Login from './login system/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './login system/Signup'
import Home from './Home'
import Main from './Main';
import Shop from './order process/Shop';
import History from './History';
import Favorite from './others/Favorite'
import Restaurant from './order process/Restaurant'
import Order from './order process/Order'
import Checkout from './order process/Checkout'
import Notify from './component/messenge-component'
import Fee from './others/Fee'
import Shopping from './Shopping'
import OrderState from './order process/OrderState'
import Evaluate from './order process/Evaluate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path='/signup' element={<Signup /> }></Route>
        <Route path="/home" element={<Home />}> </Route>
        <Route path="/restaurant/:id/:dishName/shop" element={<Shop /> }></Route>
        <Route path="/shopping" element={<Shopping /> }></Route>
        <Route path="/history" element={<History /> }></Route>
        <Route path="/main" element={<Main /> }></Route>
        <Route path="/favorite" element={<Favorite /> }></Route>
        <Route path="/orderstate" element={<OrderState /> }></Route>
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/restaurant/:id/:dishName" element={<Order />} />
        <Route path="/restaurant/:id/:dishName/shop/checkout" element={<Checkout />} />
        <Route path="/temp" element={<Notify />} />
        <Route path="/fee" element={<Fee />} />
        <Route path="/evaluation" element={<Evaluate />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App