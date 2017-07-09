$(document).ready(function($) {

	/* Mask for phones */ 
	$('.input_phone').mask('+7 (999) 999-99-99');
	

	/* Tabs */
	$(".services").tabs();

	/* Services height*/
	function setEqualHeight(columns){
		var tallestcolumn = 0;
		columns.each(function(){
			currentHeight = $(this).height();
			if(currentHeight > tallestcolumn){
				tallestcolumn = currentHeight;
			}
		});
		columns.height(tallestcolumn);
	}
	

	$(window).on('resize load', function() {
		setEqualHeight($(".services > .col"));
		var windowWidth = $(window).width()
		if (windowWidth<=1260) {
			var servicesContent = $('.services__content'),
				servicesContentTop = servicesContent.offset().top;
			$('.services__links li').click(function() {
				$('body,html').animate({scrollTop: servicesContentTop - 20}, 500);
			});
		}
	});

	/* Reviews slider */
	$('.reviews__list').slick({
		autoplay: true,
		prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon icon-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon icon-arrow-right"></i></button>',
		responsive: [{
			breakpoint: 1260,
			settings: {
				arrows: false
			}
		}]
	});


	/* Select */
	$('.selector').each(function() {
		var select = $(this).find('select'),
			selectdItem = select.find('option[selected]'),
			selectdItemContent = selectdItem.html();
		$(this).prepend('<p class="selector__text"></p><ul class="selector__list"></ul>');
		var selectP = $(this).find('.selector__text'),
			selectUl = $(this).find('.selector__list');
		if (!(selectdItemContent == undefined)) {
			selectP.html(selectdItemContent);
		} else{
			selectP.html('Выберите элемент списка');
		}
		var i = 1;
		select.find('option').each(function() {
			$(this).attr('data-selector-option', i);
			var html = $(this).html();
			
			if ($(this).attr('selected')) {
				$("<li class='selector__item selector__item_select' data-selector-item='"+ i +"'>" + html + "</li>").appendTo(selectUl);
			} else{
				$("<li class='selector__item' data-selector-item='"+ i +"'>" + html + "</li>").appendTo(selectUl);
			}
			i++;
		});
	});
	$('.selector__text').click(function() {
		var selectorList = $(this).siblings('.selector__list');
		selectorList.toggle();
	});
	$('.selector__item').click(function() {
		var selector = $(this).parents('.selector'),
			selectorP = selector.find('.selector__text'),
			selectorUl = selector.find('.selector__list');
			attr = $(this).attr('data-selector-item'),
			text = $(this).text();
		
		selectorP.html(text);
		selector.find('option').each(function() {
			$(this).removeAttr('selected');
			var thisAttr = $(this).attr('data-selector-option');
			if (thisAttr == attr) {
				$(this).attr('selected', 'selected');
			}
		});
		selector.find('option[data-selector-option='+ attr +']');
		selectorUl.fadeOut(300);
	});


	/* Yandex Map */
	  ymaps.ready(init);
	  var myMap;

	  function init(){
		  myMap = new ymaps.Map ("map", {
			  center: [55.741869, 37.652546],
			  zoom: 17
		  });

		  myMap.controls.remove('searchControl').remove('trafficControl').remove('geolocationControl');

		  myMap.behaviors.disable(['drag', 'scrollZoom']);

		  myPin = new ymaps.GeoObjectCollection({}, {
			iconLayout: 'default#image',
			iconImageHref: 'upload/marker.png',
			iconImageSize: [38, 48]
		  });

		  myPlacemark1 = new ymaps.Placemark([55.741869, 37.652546], {
			balloonContentBody: 'м. Таганская (кольцевая), ул. Нижняя Радищевская 14/2, строение 1, 3 этаж, офис 1'
		  });


		  myPin.add(myPlacemark1);

		  myMap.geoObjects.add(myPin);
	  }

	/* Nav */
	$(".panel__nav, .anchor").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});
	$('.panel__button').click(function() {
		$('.panel__nav').slideToggle(0);
	});
});
