import { Select } from './Select';
import { CatalogList } from './CatalogList';
import { CatalogFilter } from './CatalogFilter';
import { Pagination } from './Pagination';
import { ViewType } from './ViewType';
import { useState, useRef } from 'react';



export default function Catalog({goodsN}){
  let [themeV,setThemeV] = useState("Поле");
  let [sortV,setSortV] = useState("По id");
  let [viewType,setViewType] = useState("tile");
  
  let filter0 = {
    "themes": {
      "val":"Все",
      "ids":null,
      "onChange": (sld) => {
        let ids = sld == "Все" ? goodsN : goodsN.filter(goodsNE => {
          if(goodsNE.themes.includes(sld.toLowerCase())) return true;
        });
        
        setFilter(prv => ({
          ...prv, 
          "themes": {
            ...prv.themes, 
            "val": sld,
            "ids": ids
          }
        }));
        setPageCurrent(1);
        currentItemId.current = 1;
      }
    },
    
    "color": {
      "val":["Без"],
      "ids":null,
      "onChange": (e) => {
        setFilter(prv => ({
          ...prv, 
          "color": {
            ...prv.color, 
            "val": [e.target.value],
          }
        }));
      }
    },
    
    "cost": {
      "val":[0,1720],
      "ids":null,
      "onChange": (ops) => {
        let sld;
        let isMin;
        if(ops.ev){
          sld = +ops.ev.target.value;
          isMin = ops.ev.target.className.includes("range-slider__inp_min") ? true : false;
        }else{
          sld = ops.valC;
          isMin = ops.elm.className.includes("range-slider__inp_min") ? true : false;
        }
      
        function valF(prv){
          isMin ? prv[0] = sld : prv[1] = sld;
          return prv;
        }
        
        function idsF(prv){
          let rst;
          
          rst = goodsN.filter(goodsNE => {
            if(isMin){
              return +goodsNE.price >= sld && +goodsNE.price <= prv.cost.val[1];
            }else{
              return +goodsNE.price >= prv.cost.val[0] && +goodsNE.price <= sld;
            }
          });
          return rst;
        }
        
        setFilter(prv => ({
          ...prv, 
          "cost": {
            ...prv.cost, 
            "val": valF([...prv.cost.val]),
            "ids": idsF(prv)
          }
        }));
        
        setPageCurrent(1);
        currentItemId.current = 1;
      }
    },
    
    "extension": {
      "val":[],
      "ids":null,
      "onChange": (e) => {
        e = e.target ? e.target : e; 
        let sld = e.value;
        let badgeType;
        if(sld == "jpg")badgeType = "jpg";
        if(sld == "png")badgeType = "png";
        if(sld == "gif")badgeType = "gif";
        let idsC = goodsN.filter(goodsNE => {
          let isFound = false;
          goodsNE.image.filter(elm3 => {
            if(elm3 == badgeType) isFound = true;
          });
          if(isFound) return true;
        });
        
        if(e.checked){
          setFilter(prv => {return ({
            ...prv, 
            "extension": {
              ...prv.extension, 
              "val": [...prv.extension.val,sld],
              "ids": prv.extension.ids !== null ? [...prv.extension.ids,...idsC] : idsC
            }
          })});
        }else{
          setFilter(prv => {
            let ar = [];
            let arR = [];
            return ({
            ...prv, 
            "extension": {
              ...prv.extension, 
              "val": prv.extension.val.filter(elm => elm !== sld),
              "ids": prv.extension.ids !== null ? (
                  arR = prv.extension.ids.filter(elm => {
                    if(idsC.map(elm2 => elm2.id).includes(elm.id)){
                      return ar.includes(elm.id) ?  true : (ar.push(elm.id), false);
                    }
                    return true;
                  }),
                  arR.length == 0 ? null : arR
                )
                : null
            }
          })});
        }
        setPageCurrent(1);
        currentItemId.current = 1;
      }
    },
    
    "badges": {
      "val":[],
      "ids":null,
      "onChange": (e) => {
        e = e.target ? e.target : e; 
        let sld = e.value;
        let badgeType;
        if(sld == "Новинки")badgeType = "purple";
        if(sld == "Хит")badgeType = "red";
        if(sld == "Скидки")badgeType = "orange";
        let idsC = goodsN.filter(goodsNE => {
          let isFound = false;
          goodsNE.badges.filter(elm3 => {
            if(elm3.color == badgeType) isFound = true;
          });
          if(isFound) return true;
        });
        
        if(e.checked){
          setFilter(prv => {return ({
            ...prv, 
            "badges": {
              ...prv.badges, 
              "val": [...prv.badges.val,sld],
              "ids": prv.badges.ids !== null ? [...prv.badges.ids,...idsC] : idsC
            }
          })});
        }else{
          setFilter(prv => {
            let ar = [];
            let arR = [];
            return ({
            ...prv, 
            "badges": {
              ...prv.badges, 
              "val": prv.badges.val.filter(elm => elm !== sld),
              "ids": prv.badges.ids !== null ? (
                  arR = prv.badges.ids.filter(elm => {
                    if(idsC.map(elm2 => elm2.id).includes(elm.id)){
                      return ar.includes(elm.id) ?  true : (ar.push(elm.id), false);
                    }
                    return true;
                  }),
                  arR.length == 0 ? null : arR
                )
                : null
            }
          })});
        }
        setPageCurrent(1);
        currentItemId.current = 1;
      }
    },
  }
  let [filter,setFilter] = useState(filter0);
    
  function filterF(){
    let idsR = goodsN;
    Object.keys(filter).forEach(filterKE => {
      let ids = filter[filterKE]["ids"];
      if(ids === null) return;
      idsR = idsR.filter(idsRE => {
        return ids.map(elm => elm.id).includes(idsRE["id"])
      });
    });
    return idsR;
  }
  let filterR = filterF();
  
  function handlerFilterReset(){
    setFilter(filter0);
    setPageCurrent(1);
    currentItemId.current = 1;
  }


  
  let catalogItemN = filterR.length;
  let [pageCurrent,setPageCurrent] = useState(1);
  let [itemsPerPage,setItemsPerPage] = useState(6);
  let nItemsLastPage = catalogItemN % itemsPerPage;
  let btnN = Math.ceil(catalogItemN / itemsPerPage);

  function handlerSortV(newSortV){
    setSortV(newSortV);
  }

  function handlerViewType(newViewType){
    setViewType(newViewType);
  }

  let currentItemId = useRef((pageCurrent - 1) * itemsPerPage + 1);
  function handleItemsPerPage(newItemsPerPage){
    let newPageCurrent = Math.ceil(currentItemId.current / newItemsPerPage);
    setPageCurrent(newPageCurrent);
    setItemsPerPage(newItemsPerPage);
  }
  
  function handlePageCurrent(newPageCurrent){
    setPageCurrent(newPageCurrent);
  }
  
  
  
  return (
    <>
      <aside className="aside">
        <nav>
          <div className="catalog-menu"></div>
        </nav> 
        <search>
          <CatalogFilter filter={filter} onFilterReset={handlerFilterReset} />
        </search>
      </aside>
      
      <main className="main">
        <h1 className="h1">Каталог</h1>
        
        <div className="info">
          72 файла, формат = jpg/png/gif, размер&nbsp;=&nbsp;389&nbsp;Мб
        </div>
        
        <div className="sort-view">
            <Select setup={{
              vals: [1,3,6,9,18],
              sldH: "Показывать по",
              name: "sort-quntity-page",
              sld: itemsPerPage,
              onSld: handleItemsPerPage,
            }} />
            <Select setup={{
              vals: ["По id","Цена ⬈","Цена ⬊","Алфавит ➡","Алфавит ⬅"],
              sldH: "",
              name: "sort-grow-cost",
              sld: sortV,
              onSld: handlerSortV,
            }} />
            <ViewType setup={{
              viewType: viewType,
              onViewType: handlerViewType,
            }} />
        </div>  
        
        <div className={"catalog-list-pagination-wr" + (filterR.length === 0 ? " catalog-list-pagination-wr__hide" : "")}>
          <CatalogList
          viewType={viewType}
          pageCurrent={pageCurrent} 
          catalogItemN={catalogItemN} 
          itemsPerPage={itemsPerPage}
          sortV={sortV}
          filterR={filterR}
          goodsN={goodsN}
          filter={filter}
          />
        {filterR.length > 0 &&
        <Pagination 
          showBtnN="5" 
          btnN={btnN}
          pageCurrent={pageCurrent}
          onPageCurrent={handlePageCurrent} 
          currentItemId={currentItemId}
          itemsPerPage={itemsPerPage} />
        }
        </div>
        {filterR.length === 0 &&
        <>
        <div className="catalog__empty-result">
          Ничего не найдено
        </div>
        <div className="catalog__filter-reset catalog__filter-reset_1" onClick={handlerFilterReset}>
          Сбросить фильтр
        </div>
        </>
        }
      </main>
    </>
  )
}