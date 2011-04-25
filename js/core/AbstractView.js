(function(){
	RealtimeMultiplayerGame.AbstractView = function( controller ) {
		this.controller = controller;
	};

	RealtimeMultiplayerGame.AbstractView.prototype = {
		controller: null,
		tick: function() { },
		dealloc: function() { }
	};
})();