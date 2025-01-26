// +++T A B S

function tabs() {
	// +++Ядро табов
	document.querySelectorAll('[data-tabs *= " btn-"]').forEach((elmBn) => {
		elmBn.addEventListener('click', () => {
			let attrV = elmBn.getAttribute('data-tabs');
			let attrArr = attrV.split(' ');
			let group = attrArr[0];
			let idTab = attrArr[1].split('btn-')[1];
			let panelNew = document.querySelector('[data-tabs = "'+ group +' panel-'+ idTab +'"]');
			let btnNew = document.querySelector('[data-tabs = "'+ group +' btn-'+ idTab +'"]');
			let elmsAct = document.querySelectorAll('[data-tabs ^= "'+ group +'"].tabs__act');

			elmsAct.forEach((elmAct) => {
				elmAct.classList.remove('tabs__act');
			})

			btnNew.classList.add('tabs__act');
			panelNew.classList.add('tabs__act');
			window.dispatchEvent(new Event('resize'));
		});
	})
	// ---Ядро табов

	// Если при настройки табов забыли назначить вкладку активной, автоматически назначает первую.
	function addActiveTab(){
		let groupPrev = '';
		document.querySelectorAll('[data-tabs *= " btn-"]').forEach((elmBn) => {
			let attrV = elmBn.getAttribute('data-tabs');
			let attrArr = attrV.split(' ');
			let group = attrArr[0];			

			if(groupPrev == group) return;
			groupPrev = group;

			let elmsAct = document.querySelectorAll('[data-tabs ^= "'+ group +'"].tabs__act');
			if(elmsAct.length == 0){
				document.querySelector('[data-tabs ^= "'+ group + ' btn-"]').classList.add('tabs__act');
				document.querySelector('[data-tabs ^= "'+ group + ' panel-"]').classList.add('tabs__act');
			}
		});	
	}
	addActiveTab();
}

// ---T A B S

document.addEventListener('DOMContentLoaded', () => {
	tabs();
})