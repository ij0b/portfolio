// +++S C R O L L B A R

function graphicEditor() {
	
	let sliderC = document.querySelector('.slider-portfolio-c1');
	let sliderAll = document.querySelectorAll('.slider-portfolio');
	

	
	sliderAll.forEach((elmSlider) => {
		let sliderTxtElms = elmSlider.closest('.slider-portfolio-c1').querySelectorAll('.slider__txt');
		let itemsC = elmSlider.querySelector('.slider__items');
		let items = elmSlider.querySelectorAll('.slider__item');
		let itemActId = 0;
		let arwL = elmSlider.querySelector('.slider__arw_l');	
		let arwR = elmSlider.querySelector('.slider__arw_r');	
		// let dotsC = slider.querySelector('.slider__dots');
		let dots = elmSlider.querySelectorAll('.slider__dot');	
		// let optLoop = true;	
		// let optAutoplay = true;
		// let optInterval = 111115000;
		// let intervalId;
		// let startX,endX;

		function getIndexTab(){
			sliderTxtElms[itemActId].classList.remove('slider__act');
			itemActId = Array.prototype.indexOf.call(items,itemsC.querySelector('.slider__act'));
			// console.log('itemActId = ',itemActId);
			sliderTxtElms[itemActId].classList.add('slider__act');
		}

		arwR.addEventListener('click', () => {
			getIndexTab();
		})
		arwL.addEventListener('click', () => {
			getIndexTab();
		})
		dots.forEach((elmDot) => {
			elmDot.addEventListener('click', () => {		
				getIndexTab();
			})
		})
	})
}

// ---S C R O L L B A R

document.addEventListener('DOMContentLoaded', () => {
	graphicEditor();
})