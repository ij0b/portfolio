export function Pagination({showBtnN,btnN,pageCurrent,onPageCurrent,currentItemId,itemsPerPage}){
  showBtnN = Math.min(btnN,showBtnN);
  let btnsPages = [];
  let dnL, dnR;
  if(pageCurrent <= Math.floor(showBtnN / 2)){
    dnL = 1;
    dnR = showBtnN + 1;
  }else if(pageCurrent >= btnN - Math.floor(showBtnN / 2)){
    dnL = btnN - showBtnN + 1;
    dnR = btnN + 1;
  }else{
    dnL = pageCurrent - Math.floor(showBtnN / 2);
    dnR = pageCurrent + Math.round(showBtnN / 2);
  }
  for (let id = dnL; id < dnR; id++) {
    btnsPages.push(
      <button key={id} 
        className={"pagination__btn pagination__btn_page" + (pageCurrent == id ? " pagination__btn_act" : "")}
        disabled={pageCurrent == id ? "disabled" : ""}
        onClick={() => handleNewCurrentItemIdAndBtnN(id)}>
        {id}
      </button>
    );
  }
  
  function handleNewCurrentItemIdAndBtnN(btnN){
    currentItemId.current = btnN * itemsPerPage - itemsPerPage + 1;
    onPageCurrent(btnN);
  }
  
  
  
  return(
    <div className="pagination">
      <div className="pagination__inner">
        <button className="pagination__btn pagination__btn_first"
          disabled={pageCurrent == 1 ? "disabled" : ""}
          onClick={() => handleNewCurrentItemIdAndBtnN(1)}>
        </button>
        <button className="pagination__btn pagination__btn_prev"
          disabled={pageCurrent == 1 ? "disabled" : ""}
          onClick={() => handleNewCurrentItemIdAndBtnN(pageCurrent - 1)}>
        </button>
        {btnsPages}
        <button className="pagination__btn pagination__btn_next" 
          disabled={pageCurrent == btnN ? "disabled" : ""}
          onClick={() => handleNewCurrentItemIdAndBtnN(pageCurrent + 1)}>
        </button>
        <button className="pagination__btn pagination__btn_last" 
          disabled={pageCurrent == btnN ? "disabled" : ""}
          onClick={() => handleNewCurrentItemIdAndBtnN(btnN)}>
        </button>
      </div>  
    </div>
  );
}