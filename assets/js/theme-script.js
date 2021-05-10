var countLike = function (elm) {
	let numberLike = parseInt(elm.closest('.card-footer').find('.like .number-luotlike').text());
	if (elm.hasClass('active')) {
		numberLike -= 1;
		elm.removeClass('active');
		elm.closest('.card-footer').find('.like').removeClass('active');
	} else {
		numberLike += 1;
		elm.addClass('active');
		elm.closest('.card-footer').find('.like').addClass('active');
	}
	elm.closest('.card-footer').find('.like .number-luotlike').text(numberLike);
}

function handleTouchMove(ev) {
	if (!$(ev.target).closest('.template-5_header').length) {
		ev.preventDefault();
	}
}

const callMenu = function () {
	if ($('.template-5_header').hasClass('show')) {
		$('.template-5_header').removeClass('show');
		$('body').css("overflow-y", "auto");
		document.removeEventListener('touchmove', handleTouchMove);
	} else {
		$('.template-5_header').addClass('show');
		$('body').css("overflow-y", "hidden");
		document.addEventListener('touchmove', handleTouchMove, {passive: false});
	}
}

var effectMenu = function (elm) {
	if ($('.template-5_header .label-effect.active').length > 0) {
		$('.template-5_header .label-effect.active > a').prop('href', 'javascript:void(0)');
		$('.template-5_header .label-effect.active > a > .content').addClass('current-width');
		$('.template-5_header .label-effect.active').removeClass('active');
	}
	elm.parent().addClass('active');
	elm.find('.content').removeClass('current-width')
	setTimeout(function () {
		elm.prop('href', elm.data('link'));
	}, 200);
}

var effectSearch = function (elm) {
	if ($('.template-5_header .label-effect.active').length > 0) {
		$('.template-5_header .label-effect.active > a').prop('href', 'javascript:void(0)');
		$('.template-5_header .label-effect.active > a > .content').addClass('current-width');
		$('.template-5_header .label-effect.active').removeClass('active');
	}
	
	elm.parents('.col-middle-custom').addClass('active');
	elm.parents('.label-effect_form').addClass('active');
	elm.prev('#search-terms').removeClass('current-width')
	setTimeout(function () {
		elm.prop('type', 'submit');
	}, 200);
}

$(document).ready(function () {
	$('#hamburger .hamburger, .template-5_header > .overlay, #close-navigation').click(function () {
		callMenu();
	});
	
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
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 2,
				},
				991: {
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
	
	$('.action-like').click(function () {
		countLike($(this));
	});
	
	$('.template-5_card-event [data-toggle="collapse"]').click(function (e) {
		$(this).closest('.card-footer').find('.collapse').collapse('toggle');
	});
	
	$('.inputAutoResize').each(function () {
		let elm = $(this);
		elm.on('input', function () {
			elm.css("height", "auto");
			elm.css("height", elm[0].scrollHeight + 'px');
		});
	});
	
	$('.form-inner > input').blur(function () {
		$(this).val() != '' ? $(this).addClass('valid') : $(this).removeClass('valid');
	});
	
	if ($('.template-5_header .label-effect').length) {
		$('.template-5_header .label-effect .content').each(function (e, i) {
			let width_elm = $(i).innerWidth();
			$(i).width(width_elm).addClass('current-width');
		})
	}
	
	$('.template-5_header .label-effect > a').click(function (e) {
		if (!$(this).parent().hasClass('active')) {
			effectMenu($(this));
		}
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".template-5_header .label-effect.active");
		o.is(e.target) || 0 !== o.has(e.target).length ||
		(
			o.find('a').prop('href', 'javascript:void(0)'),
				o.find('a > .content').addClass('current-width'),
				o.removeClass('active')
		)
	});
	
	if ($('.template-5_header .label-effect_form').length) {
		let windowWidth = $(window).width();
		let containerWidth = $('.template-5_header > .container').width();
		$('.template-5_header .label-effect_form .form-control').each(function (e, i) {
			let width_elm = 0;
			if (windowWidth < 576) {
				width_elm = windowWidth - 100 - 110 + 50;
			} else {
				width_elm = $(i).innerWidth();
			}
			$(i).width(width_elm).addClass('current-width');
		})
	}
	
	$('.template-5_header .label-effect_form .call-form').click(function (e) {
		if (!$(this).parents('.label-effect_form').hasClass('active')) {
			effectSearch($(this));
			$('.template-5_header .col-right-custom').hide();
		}
	});
	
	$(document).on("mouseup", function (e) {
		var o = $(".template-5_header .label-effect_form.active");
		var o = $(".template-5_header .label-effect_form.active");
		o.is(e.target) || 0 !== o.has(e.target).length ||
		(
			o.find('#search-button').prop('type', 'button'),
				o.find('#search-terms').addClass('current-width').val(''),
				o.find('#search-result').html(''),
				o.find('#search-button').html('<i class="fal fa-search"></i>'),
				o.find('.form-search').addClass('open'),
				o.closest('.col-middle-custom').removeClass('active'),
				o.removeClass('active'),
				$('.template-5_header .col-right-custom').show()
		)
	});
	
	$(document).on("keyup", '#search-terms', function (e) {
		$(this).closest('.form-search').addClass('open');
		let current_button = $('#search-button');
		current_button.html('<i class="fal fa-spinner fa-spin"></i>');
		let current_elm = $('#search-result');
		setTimeout(function () {
			current_elm.html('');
			let html_render = ` <div class="p-2">
	                                <div class="template-5_heading">
										Bài viết
									</div>
								</div>
								<ul class="list-unstyled mb-0">
							`;
			for (let i = 0; i <= 3; i++) {
				html_render += `
					<li>
						<a href="chi-tiet-bai-viet.html" title="Bài viết ${i} Lý do nên yêu và cưới một cô gái chơi chứng khoán như Mai Phương Thúy">
							<div class="row row-5">
								<div class="col-4">
									<div class="image">
										<img src="assets/images/blog/1.jpg">
									</div>
								</div>
								<div class="col-8">
									<div class="title">
										Bài viết ${i} Lý do nên yêu và cưới một cô gái chơi chứng khoán như Mai Phương Thúy
									</div>
									<div class="desc">
										Hãy yêu và cưới một cô gái chơi chứng khoán vì những lí do sau đây:1. Cô ấy là người yêu tiền và biết dành dụm, thay vì mua 1 thỏi son 400k
									</div>
								</div>
							</div>
						</a>
					</li>
				`;
			}
			html_render += `
							</ul>
							<div class="search-readmore">
								<a href="danh-muc-bai-viet.html">
									Xem thêm các bài viết
								</a>
							</div>
						`;
			current_elm.append(html_render);
			current_button.html('<i class="fal fa-search"></i>');
		}, 1000);
	});
	
	
	if ($('.template-5_return').length > 0) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('.template-5_return').fadeIn();
			} else {
				$('.template-5_return').fadeOut();
			}
		});
		
		$('#return-top').click(function () {
			$("html, body").animate({scrollTop: 0}, 500);
			return false;
		});
	}
	
	if ($("#like-cta").length > 0) {
		$('#like-cta').click(function () {
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}
		});
	}
	
	if ($("#like-in-page").length > 0) {
		$('#like-in-page').click(function () {
			let count = parseInt($(this).find('.number').text());
			if ($(this).hasClass('active')) {
				$(this).find('.number').text(count -= 1);
				$(this).removeClass('active');
			} else {
				$(this).find('.number').text(count += 1);
				$(this).addClass('active');
			}
		});
	}
});


let windowWidth = $(window).width();
if (windowWidth < 992) {
	if ($('.template-5_single').length > 0) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200 && $(this).scrollTop() < $('.template-5_single-content').innerHeight() - 400) {
				$('.template-5_cta').addClass('show');
			} else {
				$('.template-5_cta').removeClass('show');
			}
		});
	}
}