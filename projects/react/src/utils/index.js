export function img(n,pth,ext) {
  pth = pth ? pth + "/" : "assets/images/goods/";
  ext = "." + (ext ? ext : "jpg");
  let r;
  try{
    r = require(`../${pth}${n}${ext}`);
  }catch(error){}
  return r;
}

window.clg = function clg(vls) {
  if (arguments.length === 2) {
    vls = [];
    [...arguments][1][[...arguments][0]] = [...arguments][0];
    vls.push([...arguments][1]);
    vls = vls[0];
  }
  let vlsAr = [];
  let mes = "";
  Object.keys(vls).forEach(k => {
    let value = vls[k];
    mes += `%c${k}:  %c${vls[k]}.  `;
  });
  let r = [];
  for (let i = 0; i < Object.keys(vls).length * 2; i++) {
    if (i % 2) {
      r.push("color:#0b0");
    } else {
      r.push("color:#a7f;font-weight:700;padding:0 0 0 5px");
    }
  }
  mes = [mes].concat(r);
} 