export function Checkbox({setup}){
  let {hdr,sld,nameG,onChange} = setup;
  
  
  
  return (
    <label className="checkbox__lbl">
      <div className="checkbox__hdr">{hdr}</div>
      <input  className="checkbox__inp0" type="checkbox" name={nameG} value={hdr}
        checked={sld} onChange={e => onChange(e)}/>
      <div className="checkbox__inp"><div className="checkbox__inp-w">✔</div></div>
    </label>
  );
}