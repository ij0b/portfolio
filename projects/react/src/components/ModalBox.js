export function ModalBox({isModalBoxAct,setIsModalBoxAct,children}){
  return (<>
    {children.filter((elm,id) => id === 0)}
    <div className={"modal-box-wr" + (isModalBoxAct ? " modal-box-wr_act" : "")} 
      onClick={evt => setIsModalBoxAct(false)}>
      <div className="modal-box__close" onClick={() => setIsModalBoxAct(false)}>
        <div className="modal-box__close-bn"></div>
      </div>
      <div className="modal-box" onClick={evt => evt.stopPropagation()}>
        {children.filter((elm,id) => id === 1)}
      </div>
    </div>
  </>);
}