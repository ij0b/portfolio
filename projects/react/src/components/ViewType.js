export function ViewType({setup}){
  let {viewType,onViewType} = setup;
  
  
  
  return (
    <div className="view-type">
      <button className={"view-type__btn view-type__btn_tile2"
        + (viewType == "tile2" ? " view-type__btn_act" : "")} 
        disabled={viewType == "tile2" ? "disabled" : ""}
        onClick={() => onViewType("tile2")}>
        <i></i><i></i>
      </button>
      <button className={"view-type__btn view-type__btn_row"
        + (viewType == "row" ? " view-type__btn_act" : "")} 
        disabled={viewType == "row" ? "disabled" : ""}
        onClick={() => onViewType("row")}>
        <i></i><i></i>
      </button>
      <button className={"view-type__btn view-type__btn_tile"
        + (viewType == "tile" ? " view-type__btn_act" : "")} 
        disabled={viewType == "tile" ? "disabled" : ""}
        onClick={() => onViewType("tile")}>
        <i></i><i></i>
      </button>
    </div>    
  );
}