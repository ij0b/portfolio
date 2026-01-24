//++V I D E O
function vidplay1() {
    var video = document.getElementById("video1");
    var button = document.getElementById("video1_play");
    if (video.paused) {
	   video.setAttribute("controls",'');
	   document.querySelector('.b1_video-play-c').style.display = 'none';
	   document.querySelector('.b1_video-h').style.display = 'none';
       video.play();
    } else {
       video.pause();
    }
    document.querySelector(".b1_video").addEventListener('ended',function(){
		video.removeAttribute("controls");
		this.src = this.src;
		document.querySelector('.b1_video-play-c').style.display = 'block';
		document.querySelector('.b1_video-h').style.display = 'block';
   });
}

//++B O X
function box(){
	if(document.querySelector('[data-box-bn]') != undefined){
		document.querySelectorAll('[data-box-bn]').forEach(e => {
			e.addEventListener("click", function(){
				var box = this.getAttribute('data-box-bn');
				document.querySelector('[data-box = '+box+']').className += " " + 'act';
				if(document.querySelector('[data-box = '+box+']').classList.contains('boxF')){
					document.body.style.overflow = 'hidden';
				}
				document.querySelectorAll('.box *').forEach(e3 => {
					e3.addEventListener("click", function(e4){
						e4.stopPropagation();
						var c = this.closest('.box');
						if (this.classList.contains('box-td') 
								|| this.classList.contains('box-b') 
								|| this.classList.contains('box-bn')
								|| this.closest('.box-bn') != undefined) {
							c.classList.remove('act');
							document.body.style.overflow = '';
						}
					});
				});
			});
		});
	}	
}

function slt1(){
	document.querySelectorAll('.slt').forEach(function(e1){
		e1.querySelector('.slt-bn-o').addEventListener("click", function(e2){
			var c = this.closest('.slt');
			switch(c.className){
				case 'slt act': 
					c.className = 'slt';
				break
				case 'slt': 
					c.className = 'slt act';
				break
			}
		});
	});	
		
	
	document.querySelectorAll('.slt-t1-o').forEach(e => {
			e.addEventListener("click", function(element){
				element = this;
				var value = element.getAttribute("data-value"); // Считываем значение выбранного элемента
				var src = element.getAttribute("data-src"); // Считываем значение выбранного элемента
				var nodes = element.parentNode.parentNode.childNodes; // Получаем все остальные элементы
				var nodes = element.closest('.slt-in').querySelectorAll('.slt-t1-c');
				var bn = element.closest('.slt').querySelector('.slt-bn');
				var bn_f = element.closest('.slt').querySelector('.slt-td:nth-child(1) .slt-f');
				var c = element.closest('.slt');
				for (var i = 0; i < nodes.length; i++) {
				  /* Отфильтровываем посторонние элементы text и input */
//				  if (nodes[i] instanceof HTMLParagraphElement) {
					/* Добавляем active у выбранного элемента, стирая данный класс у всех остальных */
					if (value == nodes[i].getAttribute("data-value")) nodes[i].className = "slt-t1-c active";
					else nodes[i].className = "slt-t1-c";
//				  }
				}
				document.getElementById("my_select").value = value; // Устанавливаем в hidden-поле выбранное значение
				bn_f.src = src;
				switch(c.className){
					case 'slt act': 
						c.className = 'slt';
					break
					case 'slt': 
						c.className = 'slt act';
					break
				}
			});
	});	
}

function menuTop(){
	let cnr = document.querySelector('.hr1');
	let bn = document.querySelector('.hr1-menu-close');
	let cnrH = 0;
	
	bn.addEventListener('click',function(ev){
		if(!cnr.classList.contains('act')){
			cnrH = cnr.offsetHeight;
			cnr.style.height = cnrH + 'px';
		}
		cnr.classList.toggle('act');
	});
	
	document.addEventListener('click',function(ev){
		if(!ev.target.closest('.hr1') && cnr.classList.contains('act')){
			bn.click();
		}
		if(ev.target.closest('.hr1'))return;
	});
}

function b2(){
	let tds = document.querySelectorAll('.b2-td');
	let cnr = document.querySelector('.b2-t');
	
	tds.forEach(function(elm,ix){
		let gridTemplateColumnsV = '';
		
		elm.addEventListener('mouseenter',function(ev){
			gridTemplateColumnsV = '';
			for(let i = 0; i < tds.length; i++){
				if(i == ix){
					gridTemplateColumnsV += '1.3406fr ';
				}else{
					gridTemplateColumnsV += '1fr ';
				}
			}
			cnr.classList.add('an-t-grow');
			cnr.classList.remove('an-t-shrink');
			
			if(!elm.classList.contains('an-td-grow')){
				cnr.style.gridTemplateColumns = gridTemplateColumnsV;
				elm.classList.add('an-td-grow');
			}	
			if(elm.classList.contains('an-td-shrink')){
				elm.classList.remove('an-td-shrink');
			}
		});
		
		elm.addEventListener('mouseleave',function(ev){
			cnr.classList.add('an-t-shrink');
			cnr.classList.remove('an-t-grow');
			
			if(!elm.classList.contains('an-td-shrink')){
				elm.className += ' an-td-shrink';
			}	
			if(elm.classList.contains('an-td-grow')){
				elm.classList.remove('an-td-grow');
			}
		});
	})
}

function crl(){
	let cnrs = document.querySelectorAll('.crl');
	let displayElmN;
	if(window.matchMedia("(max-width:767px)").matches){
		displayElmN = 2;
	}else{
		displayElmN = 4;
	}
	window.addEventListener("resize", function(event){
		if(window.matchMedia("(max-width:767px)").matches){
			displayElmN = 2;
		}else{
			displayElmN = 4;
		}	
	});
	let elmIdL = 0;
	let elmIdR = displayElmN - 1;
	
	cnrs.forEach(function(ev){
		let cnr = ev;
		let fM = cnr.querySelector('.crl-m-f');
		let sC = cnr.querySelector('.crl-s-c');
		let arsC = cnr.querySelector('.crl-ars-c');
		let arwL = cnr.querySelector('.crl-arw-l');
		let arwR = cnr.querySelector('.crl-arw-r');
		let arwBln = false;
		let arwBlnL = false;
		let arwBlnR = false;
		let tS = cnr.querySelector('.crl-s-t');
		let tdS = cnr.querySelectorAll('.crl-s-td');
		let fS = cnr.querySelectorAll('.crl-s-f');
		let fSprev = fS[0];
		let fMin = fS[0];
		let fMax = fS[fS.length - 1];
		let srcN;
		fSprev.className += ' act';
		
		if(displayElmN >= fS.length){
			arsC.classList.add('ddn');
		}else{
			arsC.classList.remove('ddn');
		}
		
		tS.style.margin = '0 0 0 0';
		
		arwL.addEventListener('click',function(ev2){
			let prevTd1 = fSprev.closest('.crl-s-td').previousElementSibling;
			if(prevTd1){
				let prev1 = prevTd1.querySelector('.crl-s-f');
				arwBln = true;
				arwBlnL = true;
				prev1.click();
			}else{
				tS.style.margin = '0 0 0 ' + (-tS.offsetWidth + displayElmN * fSprev.closest('.crl-s-td').offsetWidth) + 'px';
				fMin.classList.remove('act');
				elmIdR = fS.length - 1;
				elmIdL = fS.length - displayElmN;
				arwBln = true;
				arwBlnR = true;
				fSprev = fS[fS.length - 2];
				arwR.click();
			}
		});
		
		arwR.addEventListener('click',function(ev2){
			let nextTd1 = fSprev.closest('.crl-s-td').nextElementSibling;
			if(nextTd1){
				let next1 = nextTd1.querySelector('.crl-s-f');
				arwBln = true;
				arwBlnR = true;
				next1.click();
			}else{
				tS.style.margin = '0 0 0 0';
				fMax.classList.remove('act');
				elmIdR = displayElmN - 1;
				elmIdL = 0;
				fSprev = fS[1];
				arwL.click();
			}
		});
		
		fS.forEach(function(ev2,id2){
			ev2.addEventListener('click',function(ev3){
				let trt = ev3.target;
				srcN = trt.src;
				if(fSprev.src == srcN)return;

				fSprev.classList.remove('act');
				fM.classList.remove('hide');
				fM.classList.remove('show');
				fM.classList.add('hide');
				trt.className += ' act';

				if(arwBln){
					let marginL;
					
					if(elmIdR == id2 - 1 && arwBlnR){
						marginL = parseFloat(tS.style.marginLeft) - trt.closest('.crl-s-td').offsetWidth;
						elmIdL++;
						elmIdR++;
					}
					if(elmIdL == id2 + 1 && arwBlnL){
						marginL = parseFloat(tS.style.marginLeft) + trt.closest('.crl-s-td').offsetWidth;
						elmIdL--;
						elmIdR--;
					}
					
					tS.style.margin = '0 0 0 ' + marginL + 'px';
					arwBln = false;
					arwBlnR = false;
					arwBlnL = false;
				}	

				fSprev = trt;
				setTimeout(function(){
					fM.classList.add('show');
					document.querySelector(`[data-box = '${fM.dataset.boxBn}']`).querySelector('.box-f').src = srcN;
					fM.src = srcN;
				},300);
			});
		})
	});
}



function tabs1(){
	let btnsC = document.querySelector('[data-tabs-btns]');
	let btnsC0 = btnsC.closest('.b7-t1-c');
	let btns = document.querySelectorAll('[data-tabs-btn]');
	let tab = document.querySelector('[data-tabs-f]');
	let tabPrev = tab;
	let srcN;
	
	btns.forEach(function(elm,id){
		if(window.matchMedia("(max-width:767px)").matches){
			elm.addEventListener('click',function(ev2,id2){
				let trt = ev2.target;
				srcN = trt.dataset.tabsBtnF;

				if(btnsC0.classList.contains('show')){
					btnsC0.classList.remove('show');
				}else{
					btnsC0.classList.add('show');
				}
				btns.forEach(function(elm3,id3){
					if(elm3.classList.contains('act')){
						elm3.classList.remove('act');
					}
					if(elm3.classList.contains('b7-td1_1')){
						elm3.classList.add('b7-td1_2');
						elm3.classList.remove('b7-td1_1');
					}
				});
				trt.classList.add('act');
				trt.classList.add('b7-td1_1');
				trt.classList.remove('b7-td1_2');


				if(tabPrev.getAttribute('src') == srcN)return;

				tab.classList.remove('hide');
				tab.classList.remove('show');
				tab.classList.add('hide');
				tabPrev = tab;
				setTimeout(function(){
					tab.classList.add('show');
					tab.src = srcN;
				},300);
			});
		}else{
			elm.addEventListener('mouseenter',function(ev2,id2){
				let trt = ev2.target;
				srcN = trt.dataset.tabsBtnF;

				if(tabPrev.getAttribute('src') == srcN)return;

				btns.forEach(function(elm3,id3){
					if(elm3.classList.contains('hover')){
						elm3.classList.remove('hover');
					}
				});

				trt.classList.add('hover');
				tab.classList.remove('hide');
				tab.classList.remove('show');
				tab.classList.add('hide');
				tabPrev = tab;
				setTimeout(function(){
					tab.classList.add('show');
					tab.src = srcN;
				},300);
			});
		}
		
		
	});
}

function tabs(){
	let cnrs = document.querySelectorAll('[data-tabs]');
	
	cnrs.forEach(function(elm0,id0){
		let btnsC = elm0.querySelector('[data-tabs-btns]');
		let btnsC0 = btnsC.closest('.b7-t1-c');
		let btns = elm0.querySelectorAll('[data-tabs-btn]');
		let tab = elm0.querySelector('[data-tabs-f]');
		let tabPrev = tab;
		let srcN;

		btns.forEach(function(elm,id){
			if(elm.closest('.b7')){
				if(window.matchMedia("(max-width:767px)").matches){
					elm.addEventListener('click',function(ev2,id2){
						let trt = ev2.target;
						srcN = trt.dataset.tabsBtnF;
						if(btnsC0.classList.contains('show')){
							btnsC0.classList.remove('show');
						}else{
							btnsC0.classList.add('show');
						}
						btns.forEach(function(elm3,id3){
							if(elm3.classList.contains('act')){
								elm3.classList.remove('act');
							}
							if(elm3.classList.contains('b7-td1_1')){
								elm3.classList.add('b7-td1_2');
								elm3.classList.remove('b7-td1_1');
							}
						});
						trt.classList.add('act');
						trt.classList.add('b7-td1_1');
						trt.classList.remove('b7-td1_2');


						if(tabPrev.getAttribute('src') == srcN)return;

						tab.dataset.boxBn = trt.dataset.boxBnHref;
						tab.classList.remove('hide');
						tab.classList.remove('show');
						tab.classList.add('hide');
						tabPrev = tab;
						setTimeout(function(){
							tab.classList.add('show');
							tab.src = srcN;
						},300);
					});
				}else{
					elm.addEventListener('mouseenter',function(ev2,id2){
						let trt = ev2.target;
						srcN = trt.dataset.tabsBtnF;

						if(tabPrev.getAttribute('src') == srcN)return;

						btns.forEach(function(elm3,id3){
							if(elm3.classList.contains('hover')){
								elm3.classList.remove('hover');
							}
						});

						trt.classList.add('hover');
						tab.dataset.boxBn = trt.dataset.boxBnHref;
						tab.classList.remove('hide');
						tab.classList.remove('show');
						tab.classList.add('hide');
						tabPrev = tab;
						setTimeout(function(){
							tab.classList.add('show');
							tab.src = srcN;
						},300);
					});
				}
			}else{
				elm.addEventListener('click',function(ev2,id2){
					let trt = ev2.target;
					srcN = trt.dataset.tabsBtnF;
					btns.forEach(function(elm3,id3){
						if(elm3.classList.contains('act')){
							elm3.classList.remove('act');
						}
					});

					trt.classList.add('act');
				});
			}
		});
	});
}


function slt(){
	let cnrs = document.querySelectorAll('.slt');
	
	cnrs.forEach(function(elm0,id0){

		let cnr = elm0;
		let part = cnr.querySelector('.slt-part');
		let btnA = cnr.querySelector('.slt-n-e.act');
		let btns = cnr.querySelectorAll('.slt-n-e');

		btns.forEach(function(elm,id){
			elm.addEventListener('click',function(ev2,id2){
				let trt = ev2.target.closest('.slt-n-e');
				if(cnr.classList.contains('show')){
					cnr.classList.remove('show');
				}else{
					cnr.classList.add('show');
				}
				btns.forEach(function(elm3,id3){
					if(elm3.classList.contains('act')){
						elm3.classList.remove('act');
					}
				});
				if(part){
					part.innerHTML = trt.querySelector('.slt-n-e-1').textContent;
				}
				if(btnA.innerHTML.trim() == 'Этаж дома' &&
					trt.innerHTML.trim() != btnA.innerHTML.trim()){
					btnA.classList.add('ddn');
				}

				trt.classList.add('act');
			},true);
		});
	});
}



function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}
	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
}



function rslr(){
	let cnrs = document.querySelectorAll('.rslr');
	cnrs.forEach(function(elm){
		let cnr = elm;
		let rslr1 = cnr.querySelector(".rslr-1");
		let rslr2 = cnr.querySelector(".rslr-2");
		let range1 = cnr.querySelector('.rslr-range1');
		let range2 = cnr.querySelector('.rslr-range2');
		let track = cnr.querySelector(".rslr-track");
		let max = cnr.querySelector(".rslr-1").max;
		let min = cnr.querySelector(".rslr-1").min;
		let minGap = min;
		minGap = 0;
		    
		slideOne();	
		slideTwo();
		
		rslr1.addEventListener("input", function() {
			slideOne();
		});
		rslr2.addEventListener("input", function() {
			slideTwo();
		});
		
		function slideOne(){
			if(parseInt(rslr2.value) - parseInt(rslr1.value) <= minGap){
				rslr1.value = parseInt(rslr2.value) - minGap;
			}
			range1.textContent = rslr1.value;
			fillColor();
		}
		function slideTwo(){
			if(parseInt(rslr2.value) - parseInt(rslr1.value) <= minGap){
				rslr2.value = parseInt(rslr1.value) + minGap;
			}
			range2.textContent = rslr2.value;
			fillColor();
		}
		function fillColor(){
			percent1 = ((rslr1.value - min) / (max - min)) * 100;
			percent2 = ((rslr2.value - min) / (max - min)) * 100;
			let shift1 = (percent1 / 100) * 24;
			let shift2 = (percent2 / 100) * 24;
			range1.style.left = `calc(${percent1}% - ${shift1}px)`;
			range2.style.left = `calc(${percent2}% - ${shift2}px)`;
			track.style.background = `linear-gradient(to right, #474747 ${percent1}% , #fff ${percent1}% , #fff ${percent2}%, #474747 ${percent2}%)`;
		}	
	})
}

function formR(){
	let reset = document.querySelector('.b3-bn1');
	reset.addEventListener('click',function(ev,id){
		let cnr = ev.target.closest('.b3').querySelector('.slt');
		let sltE = cnr.querySelector('.slt-n-e.ddn');
		let bns = cnr.querySelectorAll('.slt-n-e');
		bns.forEach(function(elm2,id2){
			if(id2 == 0){
				sltE?.classList.add('act');
				sltE?.classList.remove('ddn');
			}else{
				elm2.classList.remove('act');
			}
		})
		 
		let rslrs = document.querySelectorAll('.rslr');
		rslrs.forEach(function(elm2,id2){
			let rslr1 = elm2.querySelector('.rslr-1');
			rslr1.value = rslr1.min;
			rslr1.setAttribute('value',rslr1.min);
			let rslr2 = elm2.querySelector('.rslr-2');
			rslr2.addEventListener('input',function(ev3,id3){});
			rslr2.value = rslr2.max;
			rslr2.setAttribute('value',rslr1.max);
		});
		rslr();
	});
}



function an(){
	let aWlr = document.querySelectorAll('.a-w-lr0');
	let coords;
	let windowHeight;
	
	function isVisible(elem) {
		coords = elem.getBoundingClientRect();
		windowHeight = document.documentElement.clientHeight;
		let topVisible = coords.top > 0 && coords.top < windowHeight;

		return topVisible;
	}	
	
	setTimeout(function(){
		aWlr.forEach(function(elm){
			isVisible(elm);
			if(coords.top < windowHeight){
				elm.classList.add('a-w-lr');
			}
		});
	},0);

	let sclB = true;

	window.addEventListener('scroll',function(ev){
		aWlr.forEach(function(elm){
		   if(isVisible(elm)){
			   elm.classList.add('a-w-lr');
		   }else if(coords.top > windowHeight){
			   elm.classList.remove('a-w-lr');
		   }
		});
	});
}


document.addEventListener("DOMContentLoaded", function(event){
	an();
	formR();
	slt();
	tabs();
	crl();
	b2();
	menuTop();
	box();
})

window.addEventListener("DOMContentLoaded", function() {
	rslr();
	// (29) 188-55-98 (__) ___ __ __
	// maskPhone('селектор элементов', 'маска, если маску не передать то будет работать стандартная +7 (___) ___-__-__');
	maskPhone('.tel','(__) ___ __ __');
})

window.addEventListener("resize", function(event){
	if(window.matchMedia("(min-width:481px)").matches){
		let cnr = document.querySelector('.hr1');
		cnr.classList.remove('act');
		cnr.style = 0;
	}
})