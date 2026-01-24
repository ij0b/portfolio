export function Radio({setup}){
  let {hdr,sld,nameG,onChange} = setup;
  
  
  
  return (
    <label className="radio__lbl">
      <div className="radio__hdr">{hdr}</div>
      <input className="radio__inp0" type="radio" value={hdr} name={nameG} 
       checked={sld} onChange={e => onChange(e)}/>
      <div className="radio__inp"><div className="radio__inp-w">✔</div></div>
    </label>
  );
}