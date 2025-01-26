function uc(id,navb){
	// t m b, l c r, p c(a) n, h w, e,
	// t - top m - middle b - bottom,
	// l - left c - center r - right
	// p - prev a - act(current) n - next
	// h - height w - width
	// k - base_container t - this e - element

	var k = $(id);
	var ovw = k.find(".ovw");
	var lst = k.find(".kc");
	var e = k.find(".ec");
	var en = k.find(".ec").length;
	var ars = k.find(".ars");
	var nav = k.find(".nav");

	var a = k.find(".kc .act");
	var p = a;
	var n = a;

	var an = a.index()+1;
	var q = 1;
	var j = 1;
	var s = 1;
	var max = 1;
	var sum = 0;
	var suma = 0;

	var prv = k.find(".prv");
	var nxt = k.find(".nxt");

	var ae = [];
	var ar = [];

	if(navb){
		k.find(".ovw").append('<div class="nav"></div>');
		e.each(function(){
			if(j===1){
				k.find(".nav").append('<div class="rnd act"></div>');
			}
			else
			{
				k.find(".nav").append('<div class="rnd"></div>');
			}
			$(this).css("background-image","url("+$(this).find("img").attr("src")+")");
			j++;
		});
		j = 1;
		k.find(".rnd").each(function(){
			ar[j] = $(this);
			j++;
		});
		j = 1;
	}
	if(k.hasClass("crl")){
		e.each(function(){
			suma = suma + $(this).outerWidth(true);
			if(suma > ovw.outerWidth(true)){
				s++;
			}
		});
		if(s>1){s--;}else{ars.hide();}
	}

	e.each(function(){
		ae[j] = $(this);
		max = j;
		j++;
	});
	j = 1;

	if(k.hasClass("fade")){
		e.css("opacity",0);
		e.first().css({
			"opacity": 1
		});
	}
	k.find(".pscc").click(function(){
		if(k.find(".fancybox").length){
			k.find(".pmcc .fancybox").addClass("dn");
			k.find(".pmcc .fancybox:nth-child("+($(this).closest(".ec").index()+2)+")").removeClass("dn");
		}
		else{
			k.find(".pmc").attr("src",$(this).find(".psc").attr("src"));
		}
		lst.find(".ec").removeClass("try");
		$(this).closest(".ec").addClass("try");
		return false;
	});

	var x = 0;
	var px = 0;
	var time = 0;
	var tbl = true;
	var prs = false;
	ovw.mousedown(function(ev){
		if(e.length>1){
			prs = true;
			if(k.hasClass("slr")){
				e.css("cursor","e-resize");
			}
			else{
				ovw.css("cursor","e-resize");
			}
			px = ev.pageX;
			return false;
		}
	});
	$("html").mouseup(function(ev){
		prs = false;
//		if(k.hasClass("slr")){
//			e.css("cursor","");
//		}
//		else{
//			ovw.css("cursor","");
//		}
		//return false;
	});
	ovw.on("mousemove", function(ev){
		if(prs && (e.length>1)){
			x = ev.pageX;
			if(px>x && tbl){
				tbl = false;
				time = setTimeout(function(){
					nxt.click();
					tbl = true;
				},10);
			}
			if(px<x && tbl){
				tbl = false;
				time = setTimeout(function(){
					prv.click();
					tbl = true;
				},10);
			}
			px = x;
			return ev.stopPropagation();
		}
	});

	ovw.on("touchstart", function(ev){
		if((e.length>1)){
			px = ev.originalEvent.touches[0].pageX;
		}
	});
	ovw.on("touchmove", function(ev){
		if((e.length>1)){
			x = ev.originalEvent.touches[0].pageX;
			if(px>x && tbl){
				tbl = false;
				time = setTimeout(function(){
					nxt.click();
					tbl = true;
				},10);
			}
			if(px<x && tbl){
				tbl = false;
				time = setTimeout(function(){
					prv.click();
					tbl = true;
				},10);
			}
			px = x;
			return ev.stopPropagation();
		}
	});



	var bln = true;
	k.find(".arw,.rnd").click(function(){
		if($(this).hasClass("arw") && bln){
			if($(this).hasClass("nxt")){
				if((k.hasClass("crl") && (e.last().offset().left >= ovw.offset().left + ovw.width() - e.width() + 10))
					|| (k.hasClass("slr") && !(e.last().hasClass("act")))
				){
					if(k.hasClass("shift")){
						sum = parseFloat(lst.css("margin-left")) - e.outerWidth(true) + 0.01;
						k.find(".act").removeClass("act").next(".ec").addClass("act");
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});
					}

					if(k.hasClass("fade")){
						k.find(".ec.act").animate({
							"opacity":0
						},500,function(){bln = true;});
						k.find(".ec.act").next().animate({
							"opacity":1
						},500,function(){bln = true;});
						k.find(".act").removeClass("act").next().addClass("act");
					}
				}
				else
				{
					// Krutka
					sum = 0;
					lst.animate({
						"margin-left":sum
					},500,function(){bln = true;});
					if(k.hasClass("fade")){
						k.find(".ec.act").animate({
							"opacity":0
						},500,function(){bln = true;});
						k.find(".ec").first().animate({
							"opacity":1
						},500,function(){bln = true;});
					}

					k.find(".act").removeClass("act");
					k.find(".ec").first().addClass("act");
					k.find(".rnd").first().addClass("act");
				}
			}

			if($(this).hasClass("prv")){

//				if((k.hasClass("crl") && e.first().offset().left < 0)
				if((k.hasClass("crl") && parseFloat(lst.css("margin-left")) < 0)
			    || (k.hasClass("slr") && !(e.first().hasClass("act")))
				){
					if(k.hasClass("shift")){
						sum = parseFloat(lst.css("margin-left")) - (-e.outerWidth(true));
						console.log(parseFloat(lst.css("margin-left")) - (-e.outerWidth(true)));
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});
					}

					if(k.hasClass("fade")){
						k.find(".ec.act").animate({
							"opacity":0
						},500,function(){bln = true;});
						k.find(".ec.act").prev().animate({
							"opacity":1
						},500,function(){bln = true;});
					}

					k.find(".act").removeClass("act").prev().addClass("act");
				}
				else
				{
					// Krutka
					var q1 = 0;
					var q2 = 0;
					//sum = mr+1;

					if(k.hasClass("crl")){
						sum = 0;
						if(e.css("float") === "none"){
							k.find(".ech").each(function(){
								sum = sum - $(this).outerWidth(true)+10;
								if(-ovw.width() > sum){
									q1++;
								}
							});
							sum = -q1*e.outerWidth(true)+0.1;
						}
						else
						{
							e.each(function(){
								sum = sum - $(this).outerWidth(true);
								if(-ovw.width() > sum){
									q1++;

								}
								else{q2++;}
							});
							sum = - q1*e.outerWidth(true)+0.1;
						}
						lst.animate({
							"margin-left":sum
						},500,function(){bln = true;});

					}

					if(k.hasClass("fade")){
						k.find(".ec.act").animate({
							"opacity":0
						},500,function(){bln = true;});
						k.find(".ec").last().animate({
							"opacity":1
						},500,function(){bln = true;});
					}

					k.find(".act").removeClass("act");
					k.find(".ec").last().addClass("act");
					k.find(".rnd").last().addClass("act");
				}
			}
		}
		if($(this).hasClass("rnd") && navb){
			k.find(".rnd.act").removeClass("act");
			$(this).addClass("act");
			k.find(".ec.act").animate({
				"opacity":0
			},500,function(){bln = true;});
			k.find(".ec.act").removeClass("act");
			k.find(".ec:nth-child("+($(this).index()+1)+")").addClass("act");
			k.find(".ec.act").last().animate({
				"opacity":1
			},500,function(){bln = true;});
		}

		bln = false;
	});

	// A U T O P L A Y
	function autoplay(){
		if((k.hasClass("crl") && (e.last().offset().left >= ovw.offset().left + ovw.width() - e.width() + 10))
			|| (k.hasClass("slr") && !(e.last().hasClass("act")))
		){
			if(k.hasClass("shift")){
				sum = parseFloat(lst.css("margin-left")) - e.outerWidth(true) + 0.01;
				k.find(".act").removeClass("act").next(".ec").addClass("act");
				lst.animate({
					"margin-left":sum
				},500,function(){bln = true;});
			}

			if(k.hasClass("fade")){
				k.find(".ec.act").animate({
					"opacity":0
				},500,function(){bln = true;});
				k.find(".ec.act").next().animate({
					"opacity":1
				},500,function(){bln = true;});
				k.find(".act").removeClass("act").next().addClass("act");
			}
		}
		else
		{
			// Krutka
			sum = 0;
			lst.animate({
				"margin-left":sum
			},500,function(){bln = true;});
			if(k.hasClass("fade")){
				k.find(".ec.act").animate({
					"opacity":0
				},500,function(){bln = true;});
				k.find(".ec").first().animate({
					"opacity":1
				},500,function(){bln = true;});
			}

			k.find(".act").removeClass("act");
			k.find(".ec").first().addClass("act");
			k.find(".rnd").first().addClass("act");
		}
	}

	if(e.length == 1){
		ars.hide();
		k.find(".nav").hide();
	}
	if(e.length > 1){
		ovw.css("cursor","e-resize");
	}
	if(k.hasClass("ply") && (e.length > 1)){
		var idp = setInterval(function(){autoplay();},7000);
		ovw.hover(
			function(){
				clearInterval(idp);
			},
			function(){
				idp = setInterval(function(){autoplay();},7000);
			});
		$(window).resize(function(){
			clearInterval(idp);
			idp =setTimeout(function(){
				idp = setInterval(function(){autoplay();},7000);
			},500);
		});
	}
}