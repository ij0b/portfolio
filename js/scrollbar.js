// +++S C R O L L B A R

function scrollbar() {

	let scrollbarElms = document.querySelectorAll('[data-scrollbar]');

	function render(){	
		scrollbarElms.forEach((elmScrollbar) => {	
			let scrollbarElmClass = elmScrollbar.getAttribute('data-scrollbar');
			let content = elmScrollbar.cloneNode(true);
			let html = '<div class="'+ scrollbarElmClass +' scrollbar__container" data-scrollbar="">\n\
										<div class="scrollbar__track scrollbar__track_y">\n\
											<div class="scrollbar__handle scrollbar__handle_y"></div>\n\
										</div>\n\
										<div class="scrollbar__track scrollbar__track_x">\n\
											<div class="scrollbar__handle scrollbar__handle_x"></div>\n\
										</div>\n\
										<div class="scrollbar__viewport">\n\
											<div class="scrollbar__content">\n\
											' + content.innerHTML + '\n\
											</div>\n\
										</div>\n\
									</div>';
			elmScrollbar.outerHTML = html;	
		})
	}
	render();
	
	scrollbarElms = document.querySelectorAll('[data-scrollbar]');

	scrollbarElms.forEach((elmScrollbar) => {		
		let trackY = elmScrollbar.querySelector('.scrollbar__track_y');
		let trackX = elmScrollbar.querySelector('.scrollbar__track_x');
		let handleY = elmScrollbar.querySelector('.scrollbar__handle_y');
		let handleX = elmScrollbar.querySelector('.scrollbar__handle_x');
		let viewport = elmScrollbar.querySelector('.scrollbar__viewport');	
		let content = elmScrollbar.querySelector('.scrollbar__content');
		let trackYY0, trackXX0, 
				trackYH, trackXW, handleYH, handleXW,
				handleYY0, handleXX0;	

		function trackXYBln(){
			let handleMinSize = 20;
			let handleCoefSize = 1;
			let viewportMaxH = getComputedStyle(viewport).maxHeight;	
			let contentClientWidth = content.clientWidth;
			let contentClientHeight = content.clientHeight;			
			let contentScrollWidth = content.scrollWidth;
			let contentScrollHeight = content.scrollHeight;
			let contentDifWidths = contentScrollWidth - contentClientWidth;
			let contentDifHeights = contentScrollHeight - parseInt(viewportMaxH);
			let trackYBln = contentDifHeights > 0 ? true : false;
			let trackXBln = contentDifWidths > 0 ? true : false;

			if(trackYBln == false && trackXBln == false){
				elmScrollbar.classList.remove('scrollbar__act');
				trackY.classList.remove('scrollbar__act');
				content.classList.remove('scrollbar__content_y');
				trackX.classList.remove('scrollbar__act');
				content.classList.remove('scrollbar__content_x');
				return;
			}
			if(trackYBln){
				viewport.style.height = getComputedStyle(viewport).maxHeight;
				elmScrollbar.classList.add('scrollbar__act');
				content.classList.add('scrollbar__content_y');
				trackY.classList.add('scrollbar__act');
			}else{
				content.classList.remove('scrollbar__content_y');
				trackY.classList.remove('scrollbar__act');
			}
			if(trackXBln){
				viewport.style.height = getComputedStyle(viewport).height;
				elmScrollbar.classList.add('scrollbar__act');
				content.classList.add('scrollbar__content_x');
				trackX.classList.add('scrollbar__act');	
			}else{
				content.classList.remove('scrollbar__content_x');
				trackX.classList.remove('scrollbar__act');
			}
	
			contentClientWidth = content.clientWidth;
			contentClientHeight = content.clientHeight;	
			
			if(trackYBln){
				handleY.style.height = contentClientHeight / contentScrollHeight * 100 * handleCoefSize + "%";
				if(handleY.clientHeight < handleMinSize){
					handleY.style.height = handleMinSize + "px";
				}
				handleYH = handleY.clientHeight;
				trackYH = trackY.clientHeight;				
			}
			if(trackXBln){
				handleX.style.width = contentClientWidth / contentScrollWidth * 100 * handleCoefSize + "%";
				if(handleX.clientWidth < handleMinSize){
					handleX.style.width = handleMinSize + "px";
				}
				handleXW = handleX.clientWidth;
				trackXW = trackX.clientWidth;
			}
		}
		trackXYBln();

		window.addEventListener('resize', () => {
			trackXYBln();
		})
		
		let shiftX, shiftY;
		let handleYMousedownBln = false;
		let handleXMousedownBln = false;

		handleY.addEventListener('mousedown',(evHandleY) => {
			evHandleY.preventDefault();
			if(evHandleY.button != 0) return;
			
			handleYMousedownBln = true;
			trackYY0 = trackY.getBoundingClientRect().top + window.pageYOffset;
			shiftY = evHandleY.clientY - handleY.getBoundingClientRect().top;
		})

		handleX.addEventListener('mousedown',(evHandleX) => {
			evHandleX.preventDefault();
			if(evHandleX.button != 0) return;

			handleXMousedownBln = true;
			trackXX0 = trackX.getBoundingClientRect().left + window.pageXOffset;
			shiftX = evHandleX.clientX - handleX.getBoundingClientRect().left;
		})

		document.addEventListener('mouseup', (evHandle) => {
			if(evHandle.button != 0) return;
			
			if(handleYMousedownBln){
				handleYMousedownBln = false;
			}
			if(handleXMousedownBln){
				handleXMousedownBln = false;
			}
		})

		document.addEventListener('mousemove', (evHandle) => {
			if(handleYMousedownBln){
				handleYY0 = evHandle.pageY - shiftY;
				let trackY1pxScrollHpx = (content.scrollHeight) / trackYH;
				
				if(handleYY0 - trackYY0 <= 0){
					handleY.style.top = 0;
					content.scrollTop = 0;
				}else if(handleYY0 - trackYY0  < trackYH - handleYH){
					handleY.style.top = handleYY0 - trackYY0 + "px";
					content.scrollTop = trackY1pxScrollHpx * (handleYY0 - trackYY0);
				}else{
					handleY.style.top = trackYH - handleYH + "px";
					content.scrollTop = content.scrollHeight - content.clientHeight;
				}
			}	

			if(handleXMousedownBln){
				handleXX0 = evHandle.pageX - shiftX;
				let trackX1pxScrollWpx = (content.scrollWidth) / trackXW;
				
				if(handleXX0 - trackXX0 <= 0){
					handleX.style.left = 0;
					content.scrollLeft = 0;
				}else if(handleXX0 - trackXX0  < trackXW - handleXW){
					handleX.style.left = handleXX0 - trackXX0 + "px";
					content.scrollLeft = trackX1pxScrollWpx * (handleXX0 - trackXX0);
				}else{
					handleX.style.left = trackXW - handleXW + "px";
					content.scrollLeft = content.scrollWidth - content.clientWidth;
				}
			}
		})

		content.addEventListener('scroll', () => {
			if(handleYMousedownBln || handleXMousedownBln) return;
			
			contentScrollTop = 0;
			handleY.style.top = (content.scrollTop / (content.scrollHeight - content.clientHeight)) * 
				(trackYH - handleYH) * 100 / trackYH  + '%';
			handleX.style.left = (content.scrollLeft / (content.scrollWidth - content.clientWidth)) * 
				(trackXW - handleXW) * 100 / trackXW  + '%';
		})
	})
}

// ---S C R O L L B A R

document.addEventListener('DOMContentLoaded', () => {
	document.fonts.ready.then(() => {
		scrollbar();
	})
})