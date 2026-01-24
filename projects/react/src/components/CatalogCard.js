import { useState, useContext } from 'react';
import { Quantity } from './Quantity';
import { img } from '../utils';
import { Context1 } from '../App';
import { Link } from 'react-router-dom';



export function CatalogCard({setup}){
  let {id,name,price,image,badges} = setup;
  let [imgStatus,setImgStatus] = useState("loading");
  let [quantity,setQuantity] = useState("");
  let {handlerCartQ} = useContext(Context1);
  
  let badges9 = badges.map((elm,elmId) => {
    return elm["badgeN"].map((elm2,elm2Id) => {
      return (
        <div key={elm2Id} className={"catalog-card__bage catalog-card__bage_" + elm["color"]}>
          {elm2}
        </div>
      );
    });  
  });
  
  function handleImageLoaded(e) {
    setImgStatus("loaded");
  }
  
  function handlerQuantity(elm) {
    setQuantity(elm);
  }
  
  let cardSrc = img(image[0],image[1],image[2]);
  
  
  
  return (
    <div className={"catalog-card"} >
      <div className="catalog-card__img-wr">
        <div className="catalog-card__badges">
          {badges9}
        </div>
        <Link to='../card' state={{"id":id-1}}>
          <div className="catalog-card__img-a">
            <span className={"catalog-card__loader" + (imgStatus == "loaded" ? " opy0" : "")}></span>
            <img className={"catalog-card__img" + (imgStatus == "loaded" ? "" : " opy0")} alt=""
              src={cardSrc} onLoad={handleImageLoaded}/>  
          </div>
        </Link>  
      </div>  
      <h2 className="catalog-card__h">        
        <Link className="catalog-card__h-a" to='../card' state={{"id":id-1}}>
          <span className="catalog-card__h-w">
            {name}
          </span>  
        </Link>  
        <span className="catalog-card__ellipsis-wr"><span className="catalog-card__ellipsis"></span></span>
      </h2>
      <div className="catalog-card__price">
        {price} р
      </div>
      <div className="catalog-card__btn-wr">
        <button className="catalog-card__btn"
          onClick={()=>{
            let quantityN = quantity ? quantity : 1;
            setQuantity(quantityN);
            handlerCartQ(quantityN,{...setup,"cardSrc":cardSrc,"quantity":quantityN});
          }}>
          В корзину
        </button>
      </div>  
      <Quantity quantity={quantity} onQuantity={handlerQuantity}/>
    </div>
  );
}