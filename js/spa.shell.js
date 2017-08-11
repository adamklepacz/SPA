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
		+'</div><!-- #spa koniec -->',
		chat_extended_time   : 1000,
		chat_retract_time    : 300,
		chat_extended_height : 450,
		chat_retract_height  : 15
	},
			stateMap = {$container : null},
			jqueryMap = {},
			setJqueryMap,
			toggleChat,
			initModule;
	
	//-------------ZZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH ----------//
	
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH----------------//
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH----------------//
	
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH--------------------------//
	//Rozpoczęcie metody DOM/setJqueryMap
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = {
			$container : $container,
			$chat: $container.find('.spa-shell-chat')
		};
	};
	//Zakończenie metody DOM/setJqueryMap
	
	//Rozpoczęcie metody DOM/toggleChat
	//Cel:wysuwanie i chowanie suwaka czatu.
	//Argumenty:
	// *do_extend - jeśli prawda (true), wysuwa suwak, jeśli fałsz(false), chowa
	// *callback - opcjonalna funkcja zwrotna do wykonywania na zakończenie animacji
	//Ustawienia
	// *chat_extend_time, chat_retract_time
	// *chat_extend_height, chat_retract_height,
	//Zwraca wartość logiczną(boolean):
	// *true - animacja suwaka aktywowana
	// *false - animacja suwaka niaktywowana
	//
	
	toggleChat = function (do_extend, callback) {
		var px_chat_ht = jqueryMap.$chat.heigth(),
				is_open = px_chat_ht === configMap.chat_extended_height,
				is_closed = px_chat_ht === configMap.chat_retract_height,
				is_sliding = !is_open && !is_closed;
		
				if(is_sliding) { return false; }
	};
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH--------------------------//
	
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH-----------//
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH-----------//
	
	//-------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH------------------//
	//Rozpoczęcie metody publicznej initModule
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();
	};
	//Zakończenie metody publicznej initModule
	return {initModule: initModule};
	//------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH-------------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH//
}());