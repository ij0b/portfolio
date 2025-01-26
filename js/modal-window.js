// +++M O D A L _ W I N D O W

function modalWindow() {

	let container;
	let close;
	let inner;
	let groupAct;
	let groupElmAct;
	let arws;

	function render(){
		let html = '<div class="modal-window">\n\
									<div class="modal-window__arw modal-window__arw_l">&lt;</div>\n\
									<div class="modal-window__arw modal-window__arw_r">&gt;</div>\n\
									<div class="modal-window__t">\n\
										<div class="modal-window__td">\n\
											<div class="modal-window__wrapper">\n\
												<div class="modal-window__close">x</div>\n\
												<div class="modal-window__inner">\n\
													\n\
												</div>\n\
											</div>\n\
										</div>\n\
									</div>\n\
								</div>';
		document.body.insertAdjacentHTML('beforeend',html);

		document.querySelectorAll('[data-modal-window-content]').forEach((elmContent) => {
			if(elmContent.hasAttribute('data-modal-window-group')){				
				let groupSelector = elmContent.getAttribute('data-modal-window-group');
				let groupElms = elmContent.querySelectorAll(groupSelector);

				groupElms.forEach((elmGroup) => {
					elmGroup.setAttribute('data-modal-window-group-elm','');
				})
			}

			document.querySelector('.modal-window__inner').append(elmContent);
		})
		
		arws = document.querySelectorAll('.modal-window__arw');
		container = document.querySelector('.modal-window');	
		inner = container.querySelector('.modal-window__wrapper');
		close = container.querySelector('.modal-window__close');
		
		close.addEventListener('click', () => {
			[container, ...container.querySelectorAll('.modal-window__act')].forEach( (elmAct) => {
				elmAct.classList.remove('modal-window__act');
			})
		})

		container.addEventListener('click', () => {
			close.click();
		})
		
		inner.addEventListener('click', (evInner) => {
			evInner.stopPropagation();
		})
	}
	render();

	function oneElm(){
		document.querySelectorAll('[data-modal-window-a]').forEach((elmA) => {
			if(elmA.hasAttribute('data-modal-window-group')) return;
	
			elmA.addEventListener('click', (evA) => {
				evA.preventDefault();				
				arws.forEach((elmArw) => {
					elmArw.classList.remove('modal-window__act');
				})

				let anchor = elmA.getAttribute('data-modal-window-a');
				let content = document.querySelector('[data-modal-window-content = "'+ anchor + '"]');
	
				container.classList.add('modal-window__act');
				content.classList.add('modal-window__act');		
			})
		})
	}
	oneElm();

	function manyElms(){
		document.querySelectorAll('[data-modal-window-group][data-modal-window-a]').forEach((elmGroupC) => {
			let groupSelector = elmGroupC.getAttribute('data-modal-window-group');
			let groupAnchor = elmGroupC.getAttribute('data-modal-window-a');
			let groupContent = document.querySelector('[data-modal-window-content = ' + groupAnchor + ']');

			elmGroupC.querySelectorAll('[data-modal-window-href]').forEach((elmHref) => {
				elmHref.addEventListener('click', (evHref) => {
					evHref.preventDefault();
					arws.forEach((elmArw) => {
						elmArw.classList.add('modal-window__act');
					})

					let anchor = elmHref.getAttribute('data-modal-window-href');
					let groupElm;

					if(groupSelector == 'img'){
						groupElm = groupContent.querySelector('[src = "'+ anchor + '"]');
					}else if(/^[.]/.test(groupSelector)){
						groupElm = groupContent.querySelector(groupSelector + ':nth-child('+ anchor + ')');
					}
		
					container.classList.add('modal-window__act');
					groupContent.classList.add('modal-window__act');
					groupAct = groupContent;
					groupElm.classList.add('modal-window__act');
					groupElmAct = groupElm;
				})
			})
		})

		let groupElmActId = 0;
		
		document.querySelectorAll('.modal-window__arw').forEach((elmArw) => {
			elmArw.addEventListener('click', (evArw) => {
				evArw.stopPropagation();
				let groupElms = groupAct.querySelectorAll('[data-modal-window-group-elm]');
				groupElmActId = +Array.from(groupElms).indexOf(groupElmAct);

				if(elmArw.classList.contains('modal-window__arw_l')){
					groupElmActId = groupElmActId > 0 ? --groupElmActId : groupElms.length - 1;
				}
				if(elmArw.classList.contains('modal-window__arw_r')){
					groupElmActId = groupElmActId < groupElms.length - 1 ? ++groupElmActId : 0;
				}

				groupElmAct.classList.remove('modal-window__act');
				groupElms[groupElmActId].classList.add('modal-window__act');
				groupElmAct = groupElms[groupElmActId];
			})
		})
	}
	manyElms();	
}

// ---M O D A L _ W I N D O W

document.addEventListener('DOMContentLoaded', () => {
	modalWindow();
})