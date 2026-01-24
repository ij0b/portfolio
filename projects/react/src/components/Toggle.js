import { useState } from 'react';



export function Toggle(props){
  let {children,setup} = props;
  let {isActP} = setup ? setup : false;
  let [btnH,content] = children;
  let [isAct,setIsAct] = useState(isActP);
  
  
  
  return (
    <>
      <div className={"toggle__btn" + (isAct ? " toggle__btn_act" : "")} onClick={()=>setIsAct(!isAct)}>
        {btnH}
      </div>
      <div className={"toggle__content" + (isAct ? " toggle__content_act" : "")}>
        {content}
      </div>
    </>          
  )
}