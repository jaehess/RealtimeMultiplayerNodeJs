(function(){
	DemoApp.namespace("DemoApp.View");

	DemoApp.View.GameView = function( controller ) {
		DemoApp.View.GameView.superclass.constructor.call( this, controller );
	};

	DemoApp.View.GameView.prototype = {
		tick: function() {
			// DemoApp.View.GameView.superclass.tick.call( this );
			// console.log( this.controller.getGameClock() );
		}
	};

	RealtimeMultiplayerGame.extend(DemoApp.View.GameView, RealtimeMultiplayerGame.AbstractView, null);
})();