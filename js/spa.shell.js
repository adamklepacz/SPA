/*
 *spa.js
 *moduł głównej przestrzeni nazw
 */

/*jslint browser : true, continue : true,
  devel : true, indent : 2, maxerr :50,
	newcap : true, nomen : true, plusplus: true,
	regexp : true, sloppy : true, vars : false,
	white : true
 */
/*global $, spa */


var spa = (function () { 
	var configMap = {
		main_html: String()
			+'<div id="spa">'
				+'<div class="spa-shell-head">'
					+'<div class="spa-shell-head-logo"></div>'
					+'<div class="spa-shell-head-acct"></div>'
					+'<div class="spa-shell-head-search"></div>'
				+'</div>'
				+'<div class="spa-shell-main">'
					+'<div class="spa-shell-main-nav"></div>'
					+'<div class="spa-shell-main-content"></div>'
				+'</div>'
				+'<div class="spa-shell-foot"></div>'
				+'<div class="spa-shell-chat"></div>'
				+'<div class="spa-shell-modal"></div>'
		+'</div><!-- #spa koniec -->'
	};
	var	stateMap = {$container : null},
			jqueryMap = {},
			setJqueryMap,
			initModule;
	
	//-------------Zakończenie sekcji zmiennych zakresu modułu ----------//
	
	//-------------Rozpoczęcie sekcji metod narzędziowych----------------//
	//-------------Zakończenie sekcji metod narzędziowych----------------//
	
	//-------------Rozpoczęcie sekcji metod DOM--------------------------//
	//Rozpoczęcie metody DOM/setJqueryMap
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = {$container : $container};
	};
	//Zakończenie metody DOM/setJqueryMap
	//-------------Zakończenie sekcji metod DOM--------------------------//
	
	//-------------Rozpoczęcie sekcji procedur obsługi zdarzeń-----------//
	//-------------Zakończenie sekcji procedur obsługi zdarzeń-----------//
	
	//-------------Rozpoczęcie sekcji metod publicznych------------------//
	//Rozpoczęcie metody publicznej initModule
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();
	};
}());