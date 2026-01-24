import { useState } from 'react';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { RangeSlider } from './RangeSlider';



export function CatalogFilter({filter,onFilterReset}){
  let [isShow,setIsShow] = useState(false);



  return (
    <div className={"catalog-filter-wr" + (isShow ? " catalog-filter-wr_act" : "")}>
      <svg className="catalog-filter__toggle" viewBox="0 0 64 64" strokeWidth="3" stroke="#fff" 
        onClick={() => setIsShow(prv => !prv)}>
        <line x1="50.69" y1="32" x2="56.32" y2="32"/><line x1="7.68" y1="32" x2="38.69" y2="32"/><line x1="26.54" y1="15.97" x2="56.32" y2="15.97"/><line x1="7.68" y1="15.97" x2="14.56" y2="15.97"/><line x1="35" y1="48.03" x2="56.32" y2="48.03"/><line x1="7.68" y1="48.03" x2="23" y2="48.03"/><circle cx="20.55" cy="15.66" r="6"/><circle cx="44.69" cy="32" r="6"/><circle cx="29" cy="48.03" r="6"/>
      </svg>
      <div className="catalog-filter__close" onClick={ev => setIsShow(false)}>
        <div className="catalog-filter__close-bn"></div>
      </div>
      <div className="catalog-filter-inr">
        <div className="catalog-filter__hdr">
          Фильтр
        </div>
        <form className="catalog-filter" method="get">
          <div className="catalog-filter__c">
            <Select setup={{
              sldH: "Тема",
              vals: ["Все","Поле","Облака","Луч","Водопад","Река","Дождь","Молния","Черно-белая","Планеты","Звезды","Космос","Галактика"],
              sld: filter["themes"]["val"],
              name: "filter-themes",
              onSld: filter["themes"]["onChange"]
            }} />
            <div className="range-slider-wr">
              <div className="catalog-filter__hdr2">
                Цена
              </div>
              <RangeSlider setup={{
                min: 0,
                max: 1720,
                sld: filter["cost"]["val"],
                name: "range-slider-cost",
                onChange: filter["cost"]["onChange"]
              }}/>
            </div>  
            <Toggle setup={{isActP: true}}>
              <div className="catalog-filter__hdr2">
                Метки
              </div>
              <div className="checkbox-wr">
                <Checkbox setup={{
                  hdr: "Новинки",
                  sld: filter["badges"]["val"].includes("Новинки"),
                  nameG: "filter-badges",
                  onChange: filter["badges"]["onChange"]
                }}/>
                 <Checkbox setup={{
                  hdr: "Хит",
                  sld: filter["badges"]["val"].includes("Хит"),
                  nameG: "filter-badges",
                  onChange: filter["badges"]["onChange"]
                }}/>
                <Checkbox setup={{
                  hdr: "Скидки",
                  sld: filter["badges"]["val"].includes("Скидки"),
                  nameG: "filter-badges",
                  onChange: filter["badges"]["onChange"]
                }}/>
              </div>
            </Toggle> 
            <Toggle>
              <div className="catalog-filter__hdr2">
                Цвет
              </div>
              <div className="radio-wr">
                <Radio setup={{
                  hdr: "Без",
                  sld: filter["color"]["val"].includes("Без"),
                  nameG: "filter-color",
                  onChange: filter["color"]["onChange"],
                }}/>
                <Radio setup={{
                  hdr: "Синий",
                  sld: filter["color"]["val"].includes("Синий"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Зеленый",
                  sld: filter["color"]["val"].includes("Зеленый"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                 <Radio setup={{
                  hdr: "Желтый",
                  sld: filter["color"]["val"].includes("Желтый"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Оранжевый",
                  sld: filter["color"]["val"].includes("Оранжевый"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Фиолетовый",
                  sld: filter["color"]["val"].includes("Фиолетовый"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Красный",
                  sld: filter["color"]["val"].includes("Красный"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Черный",
                  sld: filter["color"]["val"].includes("Черный"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
                <Radio setup={{
                  hdr: "Белый",
                  sld: filter["color"]["val"].includes("Белый"),
                  onChange: filter["color"]["onChange"],
                  nameG: "filter-color"
                }}/>
              </div>
            </Toggle>
            <Toggle>
              <div className="catalog-filter__hdr2">
                Расширение
              </div>
              <div className="checkbox-wr">
                <Checkbox setup={{
                  hdr: "jpg",
                  sld: filter["extension"]["val"].includes("jpg"),
                  nameG: "filter-extension",
                  onChange: filter["extension"]["onChange"]
                }}/>
                 <Checkbox setup={{
                  hdr: "png",
                  sld: filter["extension"]["val"].includes("png"),
                  nameG: "filter-extension",
                  onChange: filter["extension"]["onChange"]
                }}/>
                <Checkbox setup={{
                  hdr: "gif",
                  sld: filter["extension"]["val"].includes("gif"),
                  nameG: "filter-extension",
                  onChange: filter["extension"]["onChange"]
                }}/>
              </div>
            </Toggle>
            <div className="catalog__filter-reset" onClick={onFilterReset}>
              Сбросить фильтр
            </div>
          </div>  
        </form>
      </div>
    </div>          
  );
}