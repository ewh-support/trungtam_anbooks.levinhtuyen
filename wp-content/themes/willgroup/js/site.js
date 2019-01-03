jQuery(function($) {
	
	/*--------------------
	Site nav
	--------------------*/
	$('.site-nav li.menu-item-has-children').on('click', function() {
		$(this).children('.sub-menu').slideToggle();
	});
	$('.site-nav li.menu-item-has-children > a').on('click', function(e) {
		e.stopPropagation();
	});
	
	/*--------------------
	Site slider
	--------------------*/
	$('.site-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		dots: true,
		arrows: false,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 4000,
	});
	
	/*--------------------
	Home partners
	--------------------*/
	$('.home-partners').slick({
		slidesToScroll: 1,
		slidesToShow: 6,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 0,
		variableWidth: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
	});
	
	/*--------------------
	Home readers
	--------------------*/
	$('.home-readers').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 600,
		dots: true,
		arrows: false
	});
	
	$('[data-rated]').each(function() {
		$(this).barrating({
			theme: 'fontawesome-stars-o',
			initialRating: $(this).data('rated'),
			readonly: true
		});
	});
	
	/**
	 * Open facebook chat
	 */
	$('.floating-nav .facebook a').on('click', function() {
		$(this).parent().toggleClass('active');
	});
	
	/**
	 * Fancybox
	 */
	$('[data-fancybox]').fancybox();
	
	/*--------------------
	scroll top
	--------------------*/
	if( $(window).scrollTop() > 200 ) {
		$('.scroll-top').slideDown(200);
	} else {
		$('.scroll-top').slideUp(200);
	}
	$(window).scroll(function() {
		if( $(window).scrollTop() > 200 ) {
			$('.scroll-top').slideDown(200);
		} else {
			$('.scroll-top').slideUp(200);
		}
	});
	$('.scroll-top').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ 
			scrollTop: '0', 
		}, 400);
	});	
});

jQuery(function($) {
	$('.form-contact').on('submit', function(e) {
		e.preventDefault();	
		var $this = $(this);
		$this.find('.btn').append(' <i class="fa fa-circle-o-notch fa-spin icon"></i>');
		$this.find('.alert').remove();
		$.ajax({
			type: 'POST',
			url: ajax.ajax_url,
			data: $this.serialize(),
			success: function( data, textStatus, jqXHR ) {
				$this.find('.btn').find('.icon').remove();
				if( data.status == true ) {
					$this.find('.form-control').val('');
					$this.append('<p class="alert alert-success">' + data.message + '</p>');
				} else {
					$this.append('<p class="alert alert-danger">' + data.message + '</p>');
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				alert( errorThrown );
			}
		});
	});
	
	$('[data-toggle="modal"]').on('hidden.bs.modal', function (e) {
		$(this).find('.form-result').remove();
	});
});