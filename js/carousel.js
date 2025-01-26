// +++C A R O U S E L

function carousel(itemsObjN) {
	let carouselElms = document.querySelectorAll('[data-carousel]');
	let carouselClass;
	let carouselElmClass;
	let partItems;
	let partDots;
	let carouselElmAct;
	let carouselElmCur;
	let carouselElmsAct;
	let itemsActGN;
	let itemsGN;
	let itemsN;	

	function render(elmCarousel){	
		for(let i = 0; i < carouselElms.length; i++){
			if(carouselElms[i].classList.contains('carousel__act')){					
				itemsActGN = Math.ceil((i + 1) / itemsN);
				for(let j = 0; j < itemsN; j++){
					carouselElmsAct.push(itemsActGN * itemsN - itemsN + j);																		
				}
			}
		}			

		if(carouselElmsAct.length == 0){
			for(let j = 0; j < itemsN; j++){
				carouselElmsAct.push(j);																		
			}
		}

		let cloneL = '';
		let cloneR = '';

		for(let i = 0; i < carouselElms.length; i++){
			carouselElmAct = '';
			carouselElmCur = '';
			if(carouselElmsAct.includes(i)){
				carouselElmCur = carouselElmsAct[0] == i ? 'carousel__cur' : '';
				carouselElmAct = 'carousel__act';
			}		
			partItems += '<div class="carousel__item '+ carouselElmAct +' '+ carouselElmCur +'">\n\
										' + carouselElms[i].outerHTML + '\n\
										</div>';
			cloneL += '<div class="carousel__item carousel__item_clone">\n\
								' + carouselElms[i].outerHTML + '\n\
								</div>';
			cloneR = cloneL;
		}

		for(let i = 0; i < itemsGN; i++){
			carouselElmAct = itemsActGN == i + 1 ? 'carousel__act' : '';
			partDots += ' <div class="carousel__dot '+ carouselElmAct +'"></div>\n';
		}

		let html = '<div class="'+ carouselClass +' carousel carousel__new" data-carousel="">\n\
									<div class="carousel__wrapper">\n\
										<div class="carousel__items">\n\
											'+ cloneL + partItems + cloneR + '\n\
										</div>\n\
									</div>\n\
									<div class="carousel__arws">\n\
										<div class="carousel__arw carousel__arw_l">&lt;</div>\n\
										<div class="carousel__arw carousel__arw_r">&gt;</div>\n\
									</div>\n\
									<div class="carousel__dots">\n\
										' + partDots + '\n\
									</div>\n\
								</div>';
								
		elmCarousel.outerHTML = html;	
	}
	
	Object.entries(itemsObjN).forEach(([key,value]) => {
		let media1 = window.matchMedia('(min-width: '+ key +'px)');

		if(media1.matches){
			itemsN = value;
		}
	})

	carouselElms.forEach((elmCarousel) => {
		carouselClass = elmCarousel.getAttribute('data-carousel');
		carouselElmClass = elmCarousel.getAttribute('data-carousel-elm');
		carouselElms = elmCarousel.querySelectorAll('.'+carouselElmClass);
		partItems = '';
		partDots = '';
		carouselElmAct;
		carouselElmCur;
		carouselElmsAct = [];
		itemsGN = Math.ceil(carouselElms.length / itemsN);
	
		render(elmCarousel);		
		elmCarousel = document.querySelector('.carousel__new');
		elmCarousel.classList.remove('carousel__new');

		let wrapper = elmCarousel.querySelector('.carousel__wrapper');
		let wrapperW = wrapper.clientWidth;
		let itemsC = elmCarousel.querySelector('.carousel__items');
		let items = elmCarousel.querySelectorAll('.carousel__item');
		let itemsBase = elmCarousel.querySelectorAll('.carousel__item:not(.carousel__item_clone)');
		let arwL = elmCarousel.querySelector('.carousel__arw_l');	
		let arwR = elmCarousel.querySelector('.carousel__arw_r');	
		let dotsC = elmCarousel.querySelector('.carousel__dots');
		let dots = elmCarousel.querySelectorAll('.carousel__dot');	
		let optAutoplay = false;
		let optInterval = 5000;
		let intervalId;
		let startX,endX;

		let itemW = wrapperW / itemsN;
		let itemsW = items.length * parseFloat(itemW);
		let itemsBaseW = itemsBase.length * parseFloat(itemW);

		items.forEach((elmItem) => {
			elmItem.style.width = itemW + 'px';
		})
		itemsC.style.width = itemsW + 'px';
		let itemActId = Array.prototype.indexOf.call(itemsBase,itemsC.querySelector('.carousel__cur'));
		itemsActGN = Math.ceil((itemActId + 1) / itemsN);
		itemsC.style.transform = 'translate(-'+ (itemsBaseW + (itemsActGN - 1) * itemsN * itemW)+'px,0px)';		

		function autoplay(){
			if(optAutoplay){
				clearInterval(intervalId);
				intervalId = setInterval(() => {
					arwR.click();
				},optInterval)
			}
		}
		autoplay();
		
		function removeAct(){
			dotsC.querySelector('.carousel__act').classList.remove('carousel__act');
			items.forEach((elmItems) => {
				elmItems.classList.remove('carousel__act');
				elmItems.classList.remove('carousel__cur');
			})
		}
	
		function addAct(){
			dots[itemsActGN].classList.add('carousel__act');
			itemsBase[itemsActGN * itemsN].classList.add('carousel__cur');
			
			for(let i = 0; i < itemsN; i++){
				if(itemsBase[itemsActGN * itemsN + i]){
					itemsBase[itemsActGN * itemsN + i].classList.add('carousel__act');
				}				
			}

			itemsC.style.transform = 'translate(-'+ parseFloat(itemsBaseW + itemsActGN * itemsN * itemW) +'px,0)';			
		}

		function arwRClick(){
			autoplay();
			removeAct();
			if(itemsActGN == itemsGN){
				itemsActGN = 0;
			}
			addAct();
			itemsActGN++;
		}

		function arwLClick(){
			autoplay();
			removeAct();
			if(itemsActGN == 1){
				itemsActGN = itemsGN;
			}else{
				itemsActGN--;
			}			
			itemsActGN--;
			addAct();
			itemsActGN++;	
		}

		itemsC.addEventListener('touchstart', function itemsCTouchstart(evItemsC) {
			startX = evItemsC.targetTouches[0].clientX;
		})

		itemsC.addEventListener('touchend', function itemsCTouchend(evItemsC) {
			endX = evItemsC.changedTouches[0].clientX
			if(startX < endX){
				arwR.click();
			}else{
				arwL.click();
			}
		})

		arwL.addEventListener('click', arwLClick);	
		arwR.addEventListener('click', arwRClick);
		
		dots.forEach((elmDot) => {
			elmDot.addEventListener('click', function elmDotClick(evDot) {		
				autoplay();					
				removeAct(items,dotsC);
				itemsActGN = Array.prototype.indexOf.call(dots,evDot.target);
				addAct();
				itemsActGN++
			})
		})
	})
}

// ---C A R O U S E L

document.addEventListener('DOMContentLoaded', () => {
	carousel({'769':3,'479':2,'0':1});
})