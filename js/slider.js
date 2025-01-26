// +++S L I D E R

function slider() {

	let sliderElms = document.querySelectorAll('[data-slider]');

	function render(){	
		sliderElms.forEach((elmSlider) => {	
			let sliderClass = elmSlider.getAttribute('data-slider');
			let sliderElmClass = elmSlider.getAttribute('data-slider-elm');
			let sliderElms = elmSlider.querySelectorAll('.'+sliderElmClass);
			let partItems = '';
			let partDots = '';
			let sliderElmAct;

			for(let i = 0; i < sliderElms.length; i++){
				sliderElmAct = '';
				if(sliderElms[i].classList.contains('slider__act')){
					sliderElms[i].classList.remove('slider__act');
					sliderElmAct = 'slider__act';
				}
				partDots += ' <div class="slider__dot '+ sliderElmAct +'"></div>\n';
				partItems += '<div class="slider__item '+ sliderElmAct +'">';
				partItems += sliderElms[i].outerHTML;
				partItems += '</div>';
			}

			let html = '<div class="'+ sliderClass +' slider" data-slider="">\n\
										<div class="slider__wrapper">\n\
											<div class="slider__items">\n\
												' + partItems + '\n\
											</div>\n\
											<div class="slider__arws">\n\
												<div class="slider__arw slider__arw_l">&lt;</div>\n\
												<div class="slider__arw slider__arw_r">&gt;</div>\n\
											</div>\n\
											<div class="slider__dots">\n\
												' + partDots + '\n\
											</div>\n\
										</div>\n\
									</div>';
									
			elmSlider.outerHTML = html;	
		})
	}
	render();

	sliderElms = document.querySelectorAll('[data-slider]');

	sliderElms.forEach((elmSlider) => {
		let itemsC = elmSlider.querySelector('.slider__items');
		let items = elmSlider.querySelectorAll('.slider__item');
		let itemActId = 0;
		let arwL = elmSlider.querySelector('.slider__arw_l');	
		let arwR = elmSlider.querySelector('.slider__arw_r');	
		let dotsC = elmSlider.querySelector('.slider__dots');
		let dots = elmSlider.querySelectorAll('.slider__dot');	
		let optLoop = true;	
		let optAutoplay = true;
		let optInterval = 111115000;
		let intervalId;
		let startX,endX;
		
		itemActId = Array.prototype.indexOf.call(items,itemsC.querySelector('.slider__act'));

		itemsC.addEventListener('touchstart', (evItemsC) => {
			startX = evItemsC.targetTouches[0].clientX;
		})

		itemsC.addEventListener('touchend', (evItemsC) => {
			endX = evItemsC.changedTouches[0].clientX
			if(startX < endX){
				arwR.click();
			}else{
				arwL.click();
			}
		})

		arwL.addEventListener('click', () => {
			autoplay();
			if(itemActId - 1 > -1){
				items[itemActId].classList.remove('slider__act');
				dots[itemActId].classList.remove('slider__act');
				--itemActId;
				items[itemActId].classList.add('slider__act');
				dots[itemActId].classList.add('slider__act');
			}else if(optLoop){
				items[itemActId].classList.remove('slider__act');
				dots[itemActId].classList.remove('slider__act');
				itemActId = items.length - 1;
				items[itemActId].classList.add('slider__act');				
				dots[itemActId].classList.add('slider__act');
			}
		})

		arwR.addEventListener('click', () => {
			autoplay();
			if(itemActId + 1 < items.length){
				items[itemActId].classList.remove('slider__act');
				dots[itemActId].classList.remove('slider__act');
				++itemActId;
				items[itemActId].classList.add('slider__act');
				dots[itemActId].classList.add('slider__act');
			}else if(optLoop){
				items[itemActId].classList.remove('slider__act');
				dots[itemActId].classList.remove('slider__act');
				itemActId = 0;
				items[itemActId].classList.add('slider__act');				
				dots[itemActId].classList.add('slider__act');
			}
		})

		dots.forEach((elmDot) => {
			elmDot.addEventListener('click', () => {		
					autoplay();					
					itemsC.querySelector('.slider__act').classList.remove('slider__act');
					dotsC.querySelector('.slider__act').classList.remove('slider__act');					
					itemActId = Array.prototype.indexOf.call(dots,elmDot);
					items[itemActId].classList.add('slider__act');
					dots[itemActId].classList.add('slider__act');
			})
		})

		

		function autoplay(){
			if(optAutoplay){
				clearInterval(intervalId);
				intervalId = setInterval(() => {
					arwR.click();
				},optInterval)
			}
		}
		autoplay();		
	})
}

// ---S L I D E R

document.addEventListener('DOMContentLoaded', () => {
	slider();
})