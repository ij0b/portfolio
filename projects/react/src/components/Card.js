import { img } from '../utils';
import { ModalBox } from './ModalBox';
import { CatalogCard } from './CatalogCard';
import { useState, useRef} from 'react';



export function Card({setup}){
  let {id,goodsN,setIdC} = setup;
  let [imgStatus,setImgStatus] = useState("loading");
  let [isModalBoxAct,setIsModalBoxAct] = useState(false);
  let [tabs,setTabs] = useState(1);
  let listRef = useRef(new Map());
  
  function handleSubmit(){
    setIsModalBoxAct(false);
  }
  
  function handleModalBoxAct(){
    setIsModalBoxAct(true);
  }
  
  function handleImageLoaded(e) {
    setImgStatus("loaded");
  }
  
  let cardList= [];
  let idsC = [];
  
  let idN = goodsN[id]["id"];
  idsC.push(idN);
  listRef.current.set(idN, <>
    <CatalogCard key={idN} setup={goodsN[id]}/>
    <ModalBox isModalBoxAct={isModalBoxAct} setIsModalBoxAct={setIsModalBoxAct}>
      <div className="card__loop" onClick={handleModalBoxAct}></div>
      <div className="card-box">
        <div className="catalog-card__img-wr">
          <div className="catalog-card__img-a">
            <span className={"catalog-card__loader" + (imgStatus == "loaded" ? " opy0" : "")}></span>
            <img className={"catalog-card__img" + (imgStatus == "loaded" ? "" : " opy0")} alt=""
              src={img(goodsN[id]["image"][0],goodsN[id]["image"][1],goodsN[id]["image"][2])} onLoad={handleImageLoaded}/>  
          </div>
        </div> 
      </div>
    </ModalBox> 
  </>);
  
  let listRefN;
  
  for(let entry of listRef.current){
    cardList.push(
      <div key={entry[0]} 
           className={"card" + (idsC.includes(entry[0]) ? " card_act" : "")}
           style={idsC.includes(entry[0]) ? {"order": idsC.indexOf(entry[0])} : null} 
           k = {entry[0]}>
        {entry[1]}
      </div>
    );
  }
  
  
  
  return (
    <main className="main container">
      <h1 className="h1 h1_center">Карточка</h1>
      <div className="card-wr">
        <div className="card__t">
          <div className="card__td">
            <div className="card__btn card__btn_prv"
              onClick={() => setIdC(prv => prv > 0 ? --prv : goodsN.length - 1)}></div>
          </div>
          <div className="card__td">
            {cardList}
          </div>  
          <div className="card__td">
            <div className="card__btn card__btn_nxt"
              onClick={() => setIdC(prv => prv < goodsN.length - 1 ? ++prv : 0)}></div>
          </div>
        </div>
        <div className="tabs">
          <div className="tabs__btns">
            <div className={"tabs__btn" + (tabs == 1 ? " tabs__btn_act" : "")}
            onClick={() => setTabs(1)}>
              Характеристики
            </div>
            <div className={"tabs__btn" + (tabs == 2 ? " tabs__btn_act" : "")}
              onClick={() => setTabs(2)}>
              О картине
            </div>
          </div>
          <div className="tabs__inr">
            <div className={"tabs__tab" + (tabs == 1 ? " tabs__tab_act" : "")}>
              <div className="card__t2">
                <div className="card__tr2">
                  <div className="card__td2">
                    Категории:
                  </div>
                  <div className="card__td2">
                    {
                      goodsN[id]["badges"].length ? [...goodsN[id]["badges"]].map((elm,id) => {
                        return id ? ", " + elm["badgeN"] : elm["badgeN"]
                      })
                      :
                      "---"
                    }
                  </div>
                </div>
                <div className="card__tr2">
                  <div className="card__td2">
                    Тема:
                  </div>
                  <div className="card__td2">
                    {goodsN[id]["themes"].map((elm,id) => id ? ", " + elm : elm)}
                  </div>
                </div>  
                <div className="card__tr2">
                  <div className="card__td2">
                    Расширение:
                  </div>
                  <div className="card__td2">
                    {goodsN[id]["image"][2]}
                  </div>
                </div>
                <div className="card__tr2">
                  <div className="card__td2">
                    Дата:
                  </div>
                  <div className="card__td2">
                    {goodsN[id]["date"]}
                  </div>
                </div>
              </div>
            </div>
            <div className={"tabs__tab" + (tabs == 2 ? " tabs__tab_act" : "")}>
              <div className="card__h">{goodsN[id]["name"]}.</div>
              <div className="card__txt">
                Текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
                текст текст текст текст текст текст текст текст текст
              </div>  
            </div>
          </div>
        </div>
      </div>  
    </main> 
  );
}