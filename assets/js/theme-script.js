$(document).ready(function () {
	$(document).on("click", ".callModal", function () {
		$('.modal').modal('hide');
		$('#' + $(this).data('modal')).modal('show');
		setTimeout(function () {
			$('body').addClass('modal-open');
		}, 500)
	});
	
	if ($('.template-5_slide .swiper-container').length > 0) {
		const template_5_slide = new Swiper('.template-5_slide .swiper-container', {
			slidesPerView: 3,
			spaceBetween: 15,
			loop: true,
			speed: 500,
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			}
		});
		
		$(".template-5_slide .swiper-container").mouseenter(function () {
			template_5_slide.autoplay.stop();
		});
		
		$(".template-5_slide .swiper-container").mouseleave(function () {
			template_5_slide.autoplay.start();
		});
	}
	
	
	$('.search-area').click(function (e) {
		if ($(this).next('.form-hidden').hasClass('show')) {
			$(this).next('.form-hidden').removeClass('show');
		} else {
			$(this).next('.form-hidden').addClass('show');
		}
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".template-5_header .label-item");
		o.is(e.target) || 0 !== o.has(e.target).length || (
			$(".template-5_header .label-item .form-hidden").removeClass("show"))
	});
});