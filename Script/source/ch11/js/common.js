(function(win, $){
	var $html = $("html");
	var deviceSize = {
		pc:1009,
		tablet:801,
		mobile:800
	};

	function scrollShowHide(status){
		$html.css({"overflow-y":status});
		return $html.width();
	}

	var sc_w1 = scrollShowHide("hidden"),
		sc_w2 = scrollShowHide("scroll"),
		sc_w3 = sc_w1-sc_w2;

	if(sc_w3>0){
		deviceSize.pc = deviceSize.pc-sc_w3;
		deviceSize.tablet = deviceSize.tablet-sc_w3;
		deviceSize.mobile = deviceSize.mobile-sc_w3;
	}

	$(win).on("resize",function(){
		var w_size = $(win).width();
		if(w_size>=deviceSize.pc && !$("html").hasClass("pc")){
			$html.removeClass("mobile tablet").addClass("pc");
			scrollShowHide("scroll");
			console.log("w_size: "+ w_size);

		} else if(w_size<deviceSize.pc && w_size>=deviceSize.tablet
				 && !$("html").hasClass("tablet")){
					$html.removeClass("mobile pc").addClass("tablet");
					scrollShowHide("scroll");
					console.log("w_size: "+ w_size);

		} else if(w_size<=deviceSize.mobile && !$html.hasClass("mobile")){
			$html.removeClass("tablet pc").addClass("mobile");
			var menu_pos = parseInt($(".mobile-menu-wrap").css("left"));
			
			if(menu_pos>=0){
				scrollShowHide("hidden");
			}

		}
	});

	$(function(){
		$(win).trigger("resize");

		$(document).on("mouseover focus",".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a", gnbPlay);

		$(document).on("click",".mobile #gnb>ul>li:not(.no-sub)>a", gnbPlay);
					
			function gnbPlay() {
				var $ts = $(this);

					if($("html").hasClass("mobile")) {
						$(".mobile #gnb>ul>li>a").removeClass("on");
						$("#gnb ul ul:visible").slideUp();

						if($ts.next().is(":hidden")) {
							$ts.addClass("on");
							$ts.next().stop(true,true).slideDown();
							}

						} else {
							$("#gnb ul ul:visible").slideUp(0);
							$ts.next().stop(true,true).slideDown(0);
						}
					}

					$(document).on("mouseleave",".pc #gnb, .tablet #gnb", gnbleave);
					
					function gnbleave() {
						$("#gnb ul ul:visible").slideUp(0);
						$("#gnb>ul>li>a").removeClass("on");
					}

					$(".mobile-menu-open button").on("click", function() {
						$(".mobile-menu-wrap").animate({"left":0}, 0);
						scrollShowHide("hidden");
					});

					$(".mobile-menu-close button").on("click", function() {
						$(".mobile-menu-wrap").animate({"left":"-1000px"}, 0);
						scrollShowHide("scroll");
						gnbleave();
					});
	});
	
}(window, jQuery)); // IIFE: 즉시 실행 함수표현 - 함수실행, $키워드 충돌방지, 키워드 압축


