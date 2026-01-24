import Catalog from './components/Catalog';
import { CartHeader } from './components/CartHeader';
import { Cart } from './components/Cart';
import { Card } from './components/Card';
import { goods } from './data/DataInput';
import imgs from './assets/images';
import { img } from './utils';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, createContext, useRef, useEffect } from 'react';
import React from 'react';
export let Context1 = createContext('context1');



export default function App(){
  let goodsNV = JSON.parse(JSON.stringify(goods));
  goodsNV.map(elm => {
    elm.name = elm.name + (elm.image[2] == "gif" ? "-видео" : "") + " № " + elm.id +
      elm.themes.map(elm2 => " " + elm2);
  });
  let goodsN = useRef(goodsNV);
  
  let [cartQ,setCartQ] = useState(0);
  let [cart,setCart] = useState();
  let [isLoadLogo,setIsLoadLogo] = useState(false);
  let [page,setPage] = useState("page_catalog");
  let location = useLocation();
  let [idC,setIdC] = useState(0);
  
  useEffect(() => {
    setIdC(prv => location.state ? location.state["id"] : prv);
  },[location.state])
  
  function handlerCartQ(newCartQ,productObj){
    setCartQ(prv => prv + (newCartQ ? newCartQ : 0));
    if(cart){
      setCart(prv => {return ({
        ...prv, 
        [productObj["id"]] : {
          ...productObj,
          "quantity": (prv[productObj["id"]] ? prv[productObj["id"]].quantity : 0) + productObj["quantity"]
        }
      })});
    }else{
      setCart({[productObj["id"]] : productObj});
    }
  }

  function handleRemoveCartElm(id){
    setCart(prv => {return (
      Object.fromEntries(Object.entries(prv).filter(([k,v]) => k != id))
    )});
    setCartQ(prv => prv - cart[id].quantity);
  }

  function isLoadLogoF(){
    setTimeout(()=>{
      setIsLoadLogo(" logo_animate-1");
    },5000);
  }
  
  
  
  return (
    <Context1 value={{handlerCartQ}}>
      <div className={"page " + page}>
        <header className="header">
          <div className="logo-wr">
            <Link className="logo-a" to='/' onClick={() => setPage("page_catalog")}>
              <div className={"logo" + (isLoadLogo ? isLoadLogo : "")} onLoad={isLoadLogoF}
                style={{backgroundImage: "url("+ img("14","assets/images/goods","gif") +")"}}>
                <img className="logo-img logo-img_1" src={imgs.logo1} alt="Логотип test-store-1"/>
                <img className="logo-img logo-img_2" src={imgs.logo2} alt="Логотип test-store-1"/>
              </div>
            </Link>
          </div>  

          <nav className="menu">
            <Link className={"menu__li" + (['/', '/catalog'].includes(location.pathname) ? " active" : "")} to="catalog"
              onClick={() => setPage("page_catalog")}>Каталог</Link>
            <Link className={"menu__li" + (['/card'].includes(location.pathname) ? " active" : "")} to="card"
              onClick={() => setPage("page_card")}>Карточка</Link>
            <Link className={"menu__li" + (['/cart'].includes(location.pathname) ? " active" : "")} to="cart"
              onClick={() => setPage("page_cart")}>Корзина</Link>
          </nav>   

          <CartHeader setup={{cart:cart,cartQ:cartQ,onRemoveCartElm:handleRemoveCartElm}}/>
        </header>
        
        <Routes>
          <Route path="/" element={<Catalog goodsN={goodsN.current}/>}/>
          <Route path="/catalog" element={<Catalog goodsN={goodsN.current}/>}/>
          <Route path="/card" element={
            <Card setup={{
              id: idC,
              goodsN: goodsN.current,
              setIdC: setIdC
            }}/>
          }/>
          <Route path="/cart" element={
            <Cart setup={{
              cart:cart,
              cartQ:cartQ,
              onRemoveCartElm:handleRemoveCartElm,
              setCart:setCart,
              setCartQ:setCartQ,
              setPage:setPage
            }}/>
          }/>
        </Routes>  
      </div>
    </Context1>
  )
}