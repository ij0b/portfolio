import { CatalogCard } from './CatalogCard';
import { useRef, useEffect } from 'react';



export function CatalogList({viewType,pageCurrent,catalogItemN,itemsPerPage,sortV,filterR,filter}){
  let listRef = useRef(new Map());
  let isMount = useRef(true);
  let isPagination = useRef(filter);
//    console.log('CatalogList filterR ', filterR, filter,isPagination.current == filter,isMount);
  
  if(isPagination.current == filter && !isMount.current){
    let page = document.querySelector('.page');
    let catalog = document.querySelector('.catalog-list-pagination-wr');
//    console.log(page);
    let pageH = page.getBoundingClientRect().height;
    page.style.height = pageH + "px";
    catalog.style.display = "none";
  }
  else{
    isMount.current = false;
    isPagination.current = filter;
  }
  
  useEffect(() => {
    if(isPagination.current == filter){
      let page = document.querySelector('.page');
      let catalog = document.querySelector('.catalog-list-pagination-wr');
      catalog.style.display = "block";
      page.style.height = "auto";
    }
  });
   
  if(sortV == "По id"){
    filterR.sort((a,b) => a.id - b.id);
  }  
  if(sortV == "Цена ⬈"){
    filterR.sort((a,b) => a.price - b.price);
  }  
  if(sortV == "Цена ⬊"){
    filterR.sort((a,b) => b.price - a.price);
  }    
  if(sortV == "Алфавит ➡"){
    filterR.sort((a,b) => a.name.localeCompare(b.name));
  }  
  if(sortV == "Алфавит ⬅"){
    filterR.sort((a,b) => b.name.localeCompare(a.name));
  } 
  
  let catalogList = [];
  let idsC = [];
  
//  console.log(catalogItemN);
  for (let id = (pageCurrent-1)*itemsPerPage; id < pageCurrent * itemsPerPage; id++) {
//    console.log('id ',id,pageCurrent);
    if(filterR[id] === undefined)continue;
    let idN = filterR[id]["id"];
    idsC.push(idN);
    listRef.current.set(idN,
      <CatalogCard key={idN} setup={filterR[id]}/>
    );
  }  
  
  for(let entry of listRef.current){
    catalogList.push(
      <div key={entry[0]} 
           className={"catalog-list__td" + (idsC.includes(entry[0]) ? " catalog-list__td_act" : "")}
           style={idsC.includes(entry[0]) ? {"order": idsC.indexOf(entry[0])} : null} 
           k = {entry[0]}>
        {entry[1]}
      </div>
    );
  }
  
  let filterColor;
 
  switch (filter.color.val[0]) { 
    case "Синий": 
      filterColor = " catalog-list_color-blue";
      break;
    case "Зеленый": 
      filterColor = " catalog-list_color-green";
      break;
    case "Желтый": 
      filterColor = " catalog-list_color-yellow";
      break;
    case "Оранжевый": 
      filterColor = " catalog-list_color-orange";
      break;
    case "Фиолетовый": 
      filterColor = " catalog-list_color-purple";
      break;
    case "Красный": 
      filterColor = " catalog-list_color-red";
      break;
    case "Черный": 
      filterColor = " catalog-list_color-black";
      break;
    case "Белый": 
      filterColor = " catalog-list_color-white";
      break;
  }
 
 
 
  return (
    <div className={"catalog-list catalog-list_" + viewType + (filterColor ? filterColor : "")}>
      <div className="catalog-list__t">
        {catalogList}
      </div>
    </div>
  );
}