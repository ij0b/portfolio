//++F U N C T I O N

// T A B S
function tabs() {
	if ($(".tabs__e").length) {
		$(".tabs__e").click(function () {
			if (!$(this).hasClass("act")) {
				var group = $(this).data("tabs-group");
				var href = $(this).data("tabs-href");
				$("[data-tabs-group = " + group + "]").removeClass("act");
				$("[data-tabs-href = " + href + "]").addClass("act");
			}
			return false;
		});
	}
}

// Q U A N T I T Y
function qny() {
	if ($('.qny').length) {
		$(".qny .nmr").bind("change keyup click", function () {
			if (this.value.length === 1) {
				this.value = this.value.replace(/^0+/g, "");
				this.value = this.value.replace(/[^0-9]/g, "");
				$(this).closest(".qny").find('.nmr').attr("value", this.value);
			}
			if (this.value.length === 2 || this.value.length === 3) {
				$(this).attr("value", this.value);
				this.value = this.value.replace(/^0+/g, "1");
				this.value = this.value.replace(/[^0-9]/g, "");
			}
		});
		$(".qny .nmr").bind("click", function () {
			$(this).select();
		});
		$(".qny .nmr").blur(function () {
			if (this.value === "") {
				$(this).attr("value", "1");
				this.value = this.value.replace(/^0+/g, "1");
				this.value = this.value.replace(/[^0-9]/g, "1");
				$(this).val(1);
			}
		});
		$(".qny .pls").click(function () {
			var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));
			if (i < 999) {
				$(this).closest(".qny").find('.nmr').attr("value", i + 1);
				$(this).closest(".qny").find('.nmr').val(i + 1);
			};
		});
		$(".qny .mns").click(function () {
			var i = parseFloat($(this).closest(".qny").find('.nmr').attr("value"));
			if (i > 1) {
				$(this).closest(".qny").find('.nmr').attr("value", i - 1);
				$(this).closest(".qny").find('.nmr').val(i - 1);
			};
		});
	}
}

// S E L E C T
function slt() {
	var html = $("html");
	var k = false;
	var lst = false;
	var e = false;
	var sld = false;
	var arw = false;
	var a = false;
	var opt = false;

	$(".slt .sld").click(function (ev) {
		k = $(this).closest(".slt");
		lst = k.find(".d-d");
		e = k.find(".es");
		sld = k.find(".sld");
		arw = k.find("i");
		a = k.find(".act");
		opt = k.find("option");

		ev.stopPropagation();
		lst.toggleClass("ddn");
		arw.toggleClass("cdi");
		arw.toggleClass("cui");

		e.click(function (ev) {
			if (!$(this).hasClass("act") && !$(this).hasClass("sld")) {
				$(this).addClass("act");
				a.removeClass("act");
				a = $(this);
				var q = 0;
				opt.each(function () {
					$(this).attr("selected", false);
					if (a.index() === q) {
						$(this).attr("selected", "selected");
						if (q === 1) {
							k.find("input[name='phone']").mask("+375 (99) 999-99-99");
						} else {
							k.find("input[name='phone']").mask("+7 (999) 999-99-99");
						}
					}
					q++;
				});
				q = 0;
				sld.find("img").attr("src", a.find("img").attr("src"));
				sld.find(".w-s").html($(this).find(".w-s").html());
				sld.append(arw);
				html.click();
			} else {
				ev.stopPropagation();
			}
		});

		html.click(function (ev) {
			lst.addClass("ddn");
			arw.addClass("cdi");
			arw.removeClass("cui");
		});
	});
}



//++B O X
function box() {
	if ($('[data-box-bn]').length) {
		var bln = true;
		$('[data-box-bn]').click(function () {
			var box = $(this).data('box-bn');
			if ($(this).attr('data-box-f') !== undefined) {
				var src = $(this).data('box-f');
				if ($('.box[data-box=' + box + ']').length == 0) {
					$('body').append('<div class="box" data-box="' + box + '"><div class="box-td"><div class="box-b"><div class="box-bn"></div><div class="box-b1"><img class="box-f" src="' + src + '"></div></div></div></div>');
					if ($(this).data('box-h').length) {
						var h = $(this).data('box-h');
						$('.box[data-box=' + box + '] .box-f').before('<div class="box-h">' + h + '</div>');
					}
				} else {
					if ($(this).data('box-h').length) {
						var h = $(this).data('box-h');
						$('.box[data-box=' + box + '] .box-h').html(h);
					}
					$('.box-f').attr('src', src);
				}
			}
			$('[data-box = ' + box + ']').toggleClass('act');

			if (bln) {
				bln = false;
				$('.box *').click(function (ev) {
					ev.stopPropagation();
					if ($(this).hasClass('box-td') || $(this).hasClass('box-b') || $(this).hasClass('box-bn')) {
						$(this).closest('.box').removeClass('act');
					}
				});
			}
		});
	}
}

// F I L T E R - S W I T C H E R
function flr_sw() {
	$("[data-srh-sw]").click(function () {
		var c = $(this).closest("[data-srh-sw-c]");
		var c1 = c.find("[data-srh-sw-c1]");
		if (c.hasClass("cle")) {
			c1.show();
			c1.attr("style", "");
			var c1_h = c1.outerHeight(true);
			c1.css({
				height: 0
			});
			c.toggleClass("cle");
			c1.css({
				height: "auto"
			});
		}
		else {
			c1.hide();
			c.toggleClass("cle");
		}

		c.find("[data-srh-sw]").css({
			top: 3
		});
	});
}

// B A S K E T - R I G H T
function basketRight() {
	$('.hr2-a1_2,.b21-bg,.b21-c .bn1.bn1_1').click(function (e) {
		e.stopPropagation();
		$('.b21-c').toggleClass('act');
	});
}

// S H O W
function show() {
	$('[data-toggle-bn]').click(function () {
		var b = $(this).data('toggle-bn');
		$('[data-toggle-b =' + b + ']').addClass('act');
		$(this).hide();
	});
}

//++D E L E T E
function dle() {
	$('[data-delete-bn]').click(function () {
		var b = $(this).data('delete-bn');
		$('[data-delete-b =' + b + ']').addClass('ddn');
	});
}

function menu() {
	$('.menu-bn').click(function () {
		$('.mn,.fr,.menu').toggleClass('act');
	});
}

//--F U N C T I O N S

$(document).ready(function () {
	menu();
	dle();
	show();
	flr_sw();
	slt();
	qny();
	tabs();

	if ($('.slr').length) {
		$(".slr1").slider({
			range: true,
			min: 500,
			max: 50000,
			values: [500, 50000],
			slide: function (event, ui) {
				$(".slr1_w[data-slr = " + $(this).data("slr") + "]").val(ui.values[0]);
				$(".slr1_w1[data-slr = " + $(this).data("slr") + "]").val(ui.values[1]);
			}
		});
		$(".slr1").each(function () {
			$(".slr1_w[data-slr = " + $(this).data("slr") + "]").val($(this).slider("values", 0));
			$(".slr1_w1[data-slr = " + $(this).data("slr") + "]").val($(this).slider("values", 1));
		});
	}

	if ($('.crl').length) {
		$('.crl2').owlCarousel({
			items: 4,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				900: {
					items: 3
				},
				1188: {
					items: 4
				}
			}
		});
	}

	if ($('[data-phone]').length) {
		$('[data-phone]').mask("+7 9999999999");
	}
})