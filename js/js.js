function htmlEscaping(){
	let codeTags = document.querySelectorAll('.code__text');
	codeTags.forEach((elmCodeTag) => {
		let code = elmCodeTag.innerHTML;
		code = code.replace(/</g,'&lt;');
		code = code.replace(/>/g,'&gt;');
		elmCodeTag.innerHTML = '';
		elmCodeTag.insertAdjacentHTML('afterbegin',code);
	})
}

document.addEventListener('DOMContentLoaded', function () {
	htmlEscaping();
})
/*
            1          1.5           2           2.5         3        */
// pk - 597 x 336 | 896 х 504 | 1194 x 672 | 1496 x 840
// p -  269 x 366 | 404 x 549 | 538 x 732  | 673 x 915 | 807 х 1098
// p -  274 x 371 | 404 x 549 | 538 x 732  | 673 x 915 | 807 х 1098
// m -  177 x 295 | 266 x 443 | 354 x 590  | 443 x 738 | 531 х 885