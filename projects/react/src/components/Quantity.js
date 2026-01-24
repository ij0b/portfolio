export function Quantity({quantity,onQuantity,isCart,id}){
  return (
    <>
    {isCart ?
    <div className="quantity">
      <div className="quantity__t">
        <button className="quantity__td quantity__minus" 
          onClick={() => onQuantity(id,quantity > 1 ? --quantity : "")}></button>
        <div className="quantity__td quantity__inp-wr">
          <input className="quantity__inp" type="text" maxLength="3" 
            value={quantity}
            onChange={e => {
              onQuantity(id,parseInt(e.target.value) ? parseInt(e.target.value) : "");
            }}/>
        </div>
        <button className="quantity__td quantity__plus"
          onClick={() => onQuantity(id,++quantity)}></button>
      </div>
    </div>  
    :
    <div className="quantity">
      <div className="quantity__t">
        <button className="quantity__td quantity__minus" 
          onClick={() => onQuantity(quantity => quantity > 1 ? --quantity : "")}></button>
        <div className="quantity__td quantity__inp-wr">
          <input className="quantity__inp" type="text" maxLength="3" 
            value={quantity}
            onChange={e => {
              onQuantity(parseInt(e.target.value) ? parseInt(e.target.value) : "");
            }}/>
        </div>
        <button className="quantity__td quantity__plus"
          onClick={() => onQuantity(quantity => ++quantity)}></button>
      </div>
    </div> 
    }
    </>
  );
}