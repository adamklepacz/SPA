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
	//ROZPOCZĘCIE SEKCJI ZMIENNYCH ZAKRESU MODUŁU
	var configMap = {
		anchor_schema_map : {
			chat : {open : true, closed : true}
		},
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
		chat_retract_time    : 450,
		chat_extended_height : 450,
		chat_retract_height  : 15,
		chat_extended_title  : 'Kliknij, aby ukryć',
		chat_retracted_title   : 'Kliknij, aby pokazać'
	},
			stateMap = {
				$container : null,
				anchor_map : {},
				is_chat_retracted : true
			},
			jqueryMap = {},
			copyAnchorMap,
			changeAnchorMap,
			onHashChange,
			setJqueryMap,
			toggleChat,
			onClickChat,
			initModule;
	
	//-------------ZZAKOŃCZENIE SEKCJI ZMIENNYCH ZAKRESU MODUŁU ----------//
	
	//-------------ROZPOCZĘCIE SEKCJI METOD NARZĘDZIOWYCH-----------------//
	copyAnchorMap = function () {
		return $.extend(true, {}, stateMap.anchor_map);
	};
	//-------------ZAKOŃCZENIE SEKCJI METOD NARZĘDZIOWYCH-----------------//
		
	//-------------ROZPOCZĘCIE SEKCJI METOD DOM--------------------------//
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
	
	//Rozpoczęcie metody DOM/toggleChat
	
	//Stan: konfiguruje stateMap.is_chat_retracted:
	// *true - suwak jest zwinięty
	// *false - suwaj jest rozwinięty
	toggleChat = function (do_extend, callback) {
		var px_chat_ht = jqueryMap.$chat.height(),
				is_open = px_chat_ht === configMap.chat_extended_height,
				is_closed = px_chat_ht === configMap.chat_retract_height,
				is_sliding = !is_open && !is_closed;
		
		//Uniknięcie sytuacji jednoczesnego zamykania i otwierania suwaka
		if(is_sliding) { return false; }
		
		//Rozpoczęcie rozwijania suwaka czatu.
		if(do_extend) {
			jqueryMap.$chat.animate(
				{height : configMap.chat_extended_height },
				configMap.chat_extended_time,
				function () {
					jqueryMap.$chat.attr('title', configMap.chat_extended_title);
					stateMap.is_chat_retracted = false;
					if(callback) {callback(jqueryMap.$chat);}
				}
			);
			return true;
		}
		//Zakończenie rozwijania suwaka czatu.
		
		//Rozpoczęcie zwijania suwaka czatu
		jqueryMap.$chat.animate(
			{ height : configMap.chat_retract_height },
			configMap.chat_retract_time,
			function () {
				jqueryMap.$chat.attr('title', configMap.chat_retracted_title);
				stateMap.is_chat_retracted = true;
				if(callback) {callback(jqueryMap.$chat);}
			}
		);
		return true;
		//Zakończenie zawijania suwaka czatu.
	};
	//Koniec metody DOM/toggleChat
	
	//Rozpoczęcie metody DOM/changeAnchorPart/
	//Cel: zmiana części komponentu URI
	//Argumenty:
	//*arg_map - mapa opisująca, która część kotwicy URI została zaaktualizowana
	//Zwraca wartość logiczną(boolean):
	//*true - część kotwicy adresu URI została zaaktualizowana
	//*false - część kotwicy adresu URI nie mogła zostac zaktualizowana
	//Akcja 
	//bieżąca reprezentacja kotiwcy przechowana w stateMap.anchor_map;
	//Ta metoda: 
	//*tworzy kopie tej mapy za pomoca metody copyAnchorMap();
	//*modyfikuje wartości kluczy za pomocą arg_map;
	//*zarządza rozróżnianiem pomiędzy niezależnymi
	// i zależnymi wartościami w kodowaniu
	//*próbuje zmienić adres URI za pomocą uriAnchor;
	//*Zwraca true w przypadku powodzenia, false w przypadku niepowodzenia
	//
	
	changeAnchorMap = function (arg_map) {
		var anchor_map_revise = copyAnchorMap(),
				bool_return = true,
				key_name, 
				key_name_deep;
		
		//Rozpoczęcie wprowadzania zmian w mapie kotwicy
		KEYVAL:
			for(key_name in arg_map) {
				if(arg_map.hasOwnProperty(key_name)) {
					//Przeszukiwanie zależnych kluczy podczas iteracji
					if(key_name.indexOf('_') === 0) {continue KEYVAL;}
					
					//Aktulizacja niezależnej wartości klucza
					anchor_map_revise[key_name] = arg_map[key_name];
					
					//Aktualizacja odpowiadającego klucza zdalnego 
					key_name_deep = '_' + key_name;
					if(arg_map[key_name_deep]) {
						anchor_map_revise[key_name_deep] = arg_map[key_name_deep];
					}
					else {
						delete anchor_map_revise[key_name_deep];
						delete anchor_map_revise['_s' + key_name_deep];
					}
				}
			}
		//Zakończenie wprowadzania zmian w mapie kotwicy
		
		//Rozpoczęcie próby aktualizacji URI
		//przywrócenie poprzedniego w przypadku niepowedzenia
		try {
			$.uriAnchor.setAnchor(anchor_map_revise);
		}
		catch (Error) {
			//Zastąpienie adresu URI stanem obecnym 
			$.uriAnchor.setAnchor(stateMap.anchor_map,null,true);
			bool_return = false;
		}
		//Zakończenie próby aktualizacji URI
		return bool_return;
	};
	//Zakończenie metody DOM//changeAnchorPart/
	
	//-------------ZAKOŃCZENIE SEKCJI METOD DOM--------------------------//
	
	//-------------ROZPOCZĘCIE SEKCJI OBSŁUGI ZDARZEŃ-----------//
	
	//Rozpoczęcie procedury obsługi zdarzeń/onHashChange/
	//Cel: obsługa zdarzenia hashChange
	//Argumenty
	//*event - obiekt zdarzeń jQuery
	//Ustawienia: brak.
	//Zwraca false
	//Akcja:
	//*parsuje komponent kotwicy adresu URI
	//*porównuje zaproponowany stan aplikacji ze stanem bieżącym;
	//*dostosowuje aplikację tylko wtedy kiedy proponowany stan
	//różni się od isniejącego 
	//
	onHashChange = function (e) {
		var anchor_map_previous = copyAnchorMap(),
		anchor_map_proposed,
		_s_chat_previous, 
		_s_chat_proposed,
		s_chat_proposed;
		
		//Próba parsowania kotwicy
		
		
	}; 
	
	
	
	
	
	onClickChat = function (e) {
		if(toggleChat(stateMap.is_chat_retracted)) {
			$.uriAnchor.setAnchor({
				chat : (stateMap.is_chat_retracted ? 'open' : 'closed')		
			});
		}
		return false;
	};
	//-------------ZAKOŃCZENIE SEKCJI OBSŁUGI ZDARZEŃ-----------//
	
	//-------------ROZPOCZĘCIE SEKCJI METOD PUBLICZNYCH------------------//
	//Rozpoczęcie metody publicznej initModule
	initModule = function ($container) {
		//Ładowanie HTML i mapowanie kolekcji jquery.
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap(); 
		
		//Inicjowanie suwaka czatu i wiąznie procedury obsługi kliknięcia
		stateMap.is_chat_retracted = true;
		jqueryMap.$chat
			.attr('title', configMap.chat_retracted_title)
			.click(onClickChat);
		
		//testowanie przełączania.
		//setTimeout(function() {toggleChat(true);},3000);
		//setTimeout(function() {toggleChat(false);}, 8000);
	};
	//Zakończenie metody publicznej initModule
	return {initModule: initModule};
	//------------ZAKOŃCZENIE SEKCJI METOD PUBLICZNYCH-------------------//
}());