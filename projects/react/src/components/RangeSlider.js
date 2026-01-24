export function RangeSlider({setup}){
  let {min,max,name,sld,onChange} = setup;
  
  function dotF(evt){
    let dot = evt.target;
    let dotW = dot.getBoundingClientRect().width;
    let dotL = dot.getBoundingClientRect().left;
    let slider = dot.closest(".range-slider");
    let sliderW = slider.getBoundingClientRect().width;;
    let sliderL = slider.getBoundingClientRect().left;
    let inpMin = slider.querySelector(".range-slider__inp_min");
    let inpMax = slider.querySelector(".range-slider__inp_max");
    let dotMin = slider.querySelector(".range-slider__dot_min");
    let dotMinL = dotMin.getBoundingClientRect().left;
    let dotMax = slider.querySelector(".range-slider__dot_max");
    let dotMaxL = dotMax.getBoundingClientRect().left;
    let isDotMin = dot.className.includes("range-slider__dot_min");
    let process = dot.closest(".range-slider__process");
    
    let maxM = sliderW - 2*dotW;
    let costR = max;
    let costPx = costR / maxM; // 1720 / 172 = 10р в 1px

    dot.setPointerCapture(evt.pointerId);
    let shift = evt.clientX - dotL;
    dot.onpointermove = function(evt2) {
      let lft = evt2.clientX - sliderL - shift;
      let rgt = sliderW - lft - dotW;
      let shiftRst;
      if(isDotMin){
        if(dotMaxL - sliderL - dotW < lft){
          shiftRst = dotMaxL - sliderL - dotW;
        }else if(lft <= 0){
          shiftRst = 0;
        }else{
          shiftRst = lft;
        }
        process.style.marginLeft = shiftRst  + 'px';
        sld[0] = shiftRst * costPx;
        onChange({elm: inpMin, valC: sld[0]});
      }else{
        if(sliderW - (dotMinL + 2*dotW - sliderL) < rgt){
          shiftRst = sliderW - (dotMinL + 2*dotW - sliderL);
        }else if(rgt <= 0){
          shiftRst = 0;
        }else{
          shiftRst = rgt;
        }
        process.style.marginRight = shiftRst  + 'px';
        sld[1] = costR - shiftRst * costPx;
        onChange({elm: inpMax, valC: sld[1]});
      }
    };
      
    dot.onpointerup = function(evt2) {
      dot.onpointermove = null;
      dot.onpointerup = null;
    };
  }
  
  
  
  return (
    <div className="range-slider">
      <input className="range-slider__inp range-slider__inp_min" type="number" readOnly="readOnly"
        name={name} min={min} max={max} value={sld[0]} onMouseDown={ev => ev.preventDefault()} onInput={ev => onChange({ev: ev})}/>
      <input className="range-slider__inp range-slider__inp_max" type="number" readOnly="readOnly"
        name={name} min={min} max={max} value={sld[1]} onMouseDown={ev => ev.preventDefault()} onChange={ev => onChange({ev: ev})}/>
      <div className="range-slider__rail">
        <div className="range-slider__process" style={sld[0] === min && sld[1] === max ? {margin: 0} : {}}>
          <div className="range-slider__dot range-slider__dot_min"
          onPointerDown={dotF}></div>
          <div className="range-slider__dot range-slider__dot_max"
          onPointerDown={dotF}></div>
        </div>
      </div>
    </div>
  );
}