//+++F U N C T I O N

//+++Q U A N T I T Y
function quantity() {
	if ($('.quantity').length) {
		$(".quantity-nmr").bind("change keyup click", function () {
			if (this.value.length === 1) {
				this.value = this.value.replace(/^0+/g, "");
				this.value = this.value.replace(/[^0-9]/g, "");
				$(this).closest(".quantity").find('.quantity-nmr').attr("value", this.value);
			}
			if (this.value.length === 2 || this.value.length === 3) {
				$(this).attr("value", this.value);
				this.value = this.value.replace(/^0+/g, "");
				this.value = this.value.replace(/[^0-9]/g, "");
			}
			if (typeof $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== 'undefined' && $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== false) {
				cscCost2();
			}
		});
		$(".quantity-nmr").bind("click", function () {
			$(this).select();
		});
		$(".quantity-nmr").blur(function () {
			if (this.value === "") {
				$(this).attr("value", "");
				this.value = this.value.replace(/^0+/g, "");
				this.value = this.value.replace(/[^0-9]/g, "");
				$(this).val('');
			}
		});
		$(".quantity-pls").click(function () {
			var i = parseFloat($(this).closest(".quantity").find('.quantity-nmr').attr("value"));
			if (isNaN(i)) {
				i = 0;
			}
			if (i < 999) {
				$(this).closest(".quantity").find('.quantity-nmr').attr("value", i + 1);
				$(this).closest(".quantity").find('.quantity-nmr').val(i + 1);
			};
			if (typeof $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== 'undefined' && $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== false) {
				cscCost2();
			}
		});
		$(".quantity-mns").click(function () {
			var i = parseFloat($(this).closest(".quantity").find('.quantity-nmr').attr("value"));
			if (i > 0) {
				if (i == 1) {
					$(this).closest(".quantity").find('.quantity-nmr').attr("value", '');
					$(this).closest(".quantity").find('.quantity-nmr').val('');
				} else {
					$(this).closest(".quantity").find('.quantity-nmr').attr("value", i - 1);
					$(this).closest(".quantity").find('.quantity-nmr').val(i - 1);
				}
			};
			if (typeof $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== 'undefined' && $(this).closest('.quantity').find('.quantity-nmr').attr('data-cost') !== false) {
				cscCost2();
			}
		});
	}
}

//+++T O G G L E
function toggle() {
	if ($('[data-toggle-bn]').length && $('[data-toggle-e]').length) {
		$('[data-toggle-bn]').click(function () {
			var e = $(this).data('toggle-bn');
			$('[data-toggle-e =' + e + ']').toggleClass('act');
		});
	}
}

//+++T A B S
function tabs() {
	if ($(".tabs__e").length) {
		$(".tabs__e").click(function () {
			if (!$(this).hasClass("act")) {
				var group = $(this).data("tabs-group");
				var href = $(this).data("tabs-href");
				$("[data-tabs-group = " + group + "]").removeClass("act");
				$("[data-tabs-href = " + href + "]").addClass("act");
			}
		});
	}
}

//+++S E L E C T
function slt() {
	if ($('.slt').length) {
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
					q = 0;
					sld.find("img").attr("src", a.find("img").attr("src"));
					sld.find(".w-s").html($(this).find(".w-s").html());
					sld.append(arw);
					html.click();
					if ($(this).hasClass('es_1')) {
						$('[data-toggle-bn = "csc-inp1-c3"]').prop('checked', true);
						$('[data-toggle-e = "csc-inp1-c3"]').addClass('act');
					}
					if ($(this).hasClass('es_2')) {
						$('[data-toggle-bn = "csc-inp1-c5"]').prop('checked', true);
						$('[data-toggle-e = "csc-inp1-c5"]').addClass('act');
					}
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
}

//+++CSC C O S T
function cscCost(cf) {
	if ($("[data-cost-gr]").length) {
		var total = 0;
		function cscSum() {
			$("[data-cost]").each(function () {
				var gr = $(this).data('cost-gr');
				if (typeof $(this).attr('data-cost-gr1') !== 'undefined' && $(this).attr('data-cost-gr1') !== false) {
					var gr1 = $(this).data('cost-gr1');
					if ($("[data-cost-bn][data-cost-gr1='" + gr1 + "']").prop('checked')) {
						total += $(this).val() * $(this).data('cost');
					}
				} else {
					if ($("[data-cost-bn][data-cost-gr='" + gr + "']").prop('checked')) {
						total += $(this).val() * $(this).data('cost');
					} else if ($("[data-cost][data-cost-bn][data-cost-gr='" + gr + "']")) {
						total += $(this).val() * $(this).data('cost');
					}
				}
			});
			if (cf !== 0) {
				total *= cf;
			}
			$("[data-cost-total]").html(total);
			total = 0;
		}
		$("[data-cost], .csc-inp1, .csc-inp2, .es_3").bind("change keyup click", function () {
			cscSum();
		});
	}
}

//+++CSC C O S T2
function cscCost2() {
	if ($("[data-cost-gr]").length) {
		var total = 0;
		$("[data-cost]").each(function () {
			var gr = $(this).data('cost-gr');
			if ($("[data-cost-bn][data-cost-gr='" + gr + "']").prop('checked')) {
				total += $(this).val() * $(this).data('cost');
			}
		});
		$("[data-cost-total]").html(total);
		total = 0;
	}
}

//---F U N C T I O N S

$(document).ready(function () {
	cscCost(0);
	tabs();
	slt();
	toggle();
	quantity();
})