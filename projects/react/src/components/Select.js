import { useState, useRef } from 'react';



export function Select({setup}){
  // Базовая настройка на основе prop - setup
  let {sldH,vals,name,sld,onSld} = setup;
  let cName = name ? " slt-" + name : "";
  let [name0,setName] = useState("slt-" + parseInt(Math.random()*1000000) + "-" + parseInt(Math.random()*1000000));
  name = name ? name : name0;
  sld = sld ? sld : vals[0];
  let [sld0,setSld0] = useState(sld); 
  onSld = onSld ? onSld : (() => {
    sld = sld0;
    return function onSld0(elm){
      setSld0(elm);
    };
  })();
  
  let [isAct, setIsAct] = useState(false);
  let sltWRef = useRef(false);
  
  // Расчет max-width на основе val с max width помещенного в клон inn
  if(!sltWRef.current){
    let valMaxW = "";
    for(let i = 0; i < vals.length; i++){
      valMaxW = String(vals[i]).length > String(valMaxW).length 
        ? vals[i] : valMaxW;
    }
    document.querySelector('#root').insertAdjacentHTML("afterBegin", `
      <div class="slt__inn slt__inn_clone" style="position:fixed;top:-9999px;left:-9999px;">
        <div class="slt__sld">
          ${sldH ? `<span class="slt__sld-h">${sldH}</span>` : ''}
          <span class="slt__sld-v" >
            ${valMaxW}
          </span>
        </div>
      </div>
    `);
    sltWRef.current = document.querySelector(".slt__inn_clone").getBoundingClientRect().width;
    document.querySelector(".slt__inn_clone").remove();
  }  
  
  // Списки opts old/new slt добавленные в переменные, для последующей вставки внутри return
  let opts0 = vals.map(opt => 
    <option key={opt} value={opt}>{opt}</option>
  );
  
  let opts1 = vals.map(opt => 
    <div key={opt} className="slt__opt" 
      disabled={sld == opt ? "disabled" : ""}
      data-opt-vl={opt} 
      onClick={sld == opt ? null : e => {
        onSld(e.target.dataset.optVl);
        setIsAct(!isAct);
      }}>
      {opt}
    </div>
  );
  
  
  
  return (
    <div className={"slt" + cName + (isAct ? " slt_act" : "")} style={{"maxWidth":sltWRef.current,"width":"100%"}}>
      <div className="slt__inn">
        <select className="slt__slt0" name={name} value={sld}
          onChange={e => {
            onSld(e.target.value);
          }}>
          {opts0}
        </select>
        <div className="slt__sld"
          onClick={() => setIsAct(!isAct)}>
          {sldH && 
          <span className="slt__sld-h">{sldH}</span>
          }
          <span className="slt__sld-v">
            {sld}
          </span>
        </div>
        {isAct && 
        <div className="slt__menu">
          {opts1}
        </div>
        }
      </div>
    </div>
  );
}