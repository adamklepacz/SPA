/*jslint           browser	: true, continue	: true,
		devel		: true, indent	: 2,       maxerr	:	50,
		newcap	: true, nomen		: true,  plusplus	: true,
		regexp  : true, sloppy  : true,      vars :	true,
		white		: true
*/
/*global jQuery*/
/*global $*/

//moduł/spa
//zapewnia funkcjonalnośc suwaka czatu
var spa = (function () {
	"use strict";
	//zmienne zakresu modułu
	var
		//ustawienie stałych
		configMap = {
			extended_height : 434,
			extended_title : 'Kliknij, aby ukryć',
			retracted_height : 16,
			retracted_title: 'Kliknij aby pokazać',
			template_html : '<div class="spa-slider"></div>'
		},
		//deklarowanie wszystkich pozostałych zmiennych zakresu modułu
		$chatSlider,
		toggleSlider, onClickSlider, initModule;

	//metoda DOM/toggleSlider/
	//zmienna wysokość suwaka
	toggleSlider = function () {
		var
			slider_height = $chatSlider.height();

		//rozwijania suwaka jeśli jest ukryty
		if (slider_height === configMap.retracted_height) {
			$chatSlider
				.animate({	height : configMap.extended_height	})
				.attr('title', configMap.extended_title);
			return true;
		} else if (slider_height === configMap.extended_height) {  //zwijanie suwaka jeśli jest pokazany
			$chatSlider
				.animate({height : configMap.retracted_height})
				.attr('title', configMap.retracted_title);
			return true;
		}
		//nie podajemy żadnej akcji jeżeli suwak jest w trakcie zmiany statusu
		return false;
	};

	//procedura obsługi zdarzeń /onClickSlider
	//odbiera zdarzenie kliknięcia i wywołuje metodę toggleSlider
	onClickSlider = function (e) {
		toggleSlider();
		return false;
	};

	//metoda publiczna /initModule/
	//ustawia stan początkowy i dostarcza funckję
	initModule = function ($container) {
		//renderowanie html
		$container.html(configMap.template_html);
		$chatSlider = $container.find('.spa-slider');
		//incijowanie wysokości oraz tytułu suwaka
		//wiązanie zdarzenia kliknięcia przez użytkownika do procedury obsługi zdarzeń.
		$chatSlider
			.attr('title', configMap.retracted_title)
			.click(onClickSlider);

		return true;
	};

	return {initModule : initModule};
}(jQuery));

//uruchomienie aplikacji SPA, kiedy gotowy jest DOM
$().ready(
	function () {
		"use strict";
		spa.initModule(jQuery('#spa'));
	}
);