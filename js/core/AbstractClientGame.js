/**
File:
	AbstractClientGame.js
Created By:
	Mario Gonzalez
Project:
	RealtimeMultiplayerNodeJS
Abstract:
	This class is the client side base Game controller
Basic Usage:
 	[This class is not instantiated! - below is an example of using this class by extending it]

 	(function(){
		MyGameClass = function() {
			return this;
 		}

		RealtimeMultiplayerGame.extend(MyGameClass, RealtimeMultiplayerGame.AbstractGame, null);
	};
Version:
	1.0
*/
(function(){
	RealtimeMultiplayerGame.AbstractClientGame = function() {
		RealtimeMultiplayerGame.AbstractClientGame.superclass.constructor.call(this);

		this.fieldController.setupView();
		this.setupView();

		return this;
	};

	RealtimeMultiplayerGame.AbstractClientGame.prototype = {
		view										: null,							// View
		nickname									: '',							// User 'nickname'
		clientCharacter								: null,							// Reference to this users character


		// Methods

		setupNetChannel: function() {
			console.log("RealtimeMultiplayerGame.AbstractClientGame.superclass", RealtimeMultiplayerGame.AbstractClientGame.superclass)
			RealtimeMultiplayerGame.AbstractClientGame.superclass.setupNetChannel.call(this);
			this.netChannel = new RealtimeMultiplayerGame.ClientNetChannel( this );
		},

		// as far as the app is concerned, there's no "need" for a view, therefore, if the
		// developer wants to create an implementation for this, then that's their choice.
		setupView: function() { },

		tick: function() {
			RealtimeMultiplayerGame.AbstractClientGame.superclass.tick.call(this);

			// Continuously store information about our input
			if( this.clientCharacter != null )
			{
				var characterStatus = this.clientCharacter.constructEntityDescription();
				var newMessage = this.netChannel.composeCommand( this.config.CMDS.PLAYER_MOVE, characterStatus );

				// create a message with our characters updated information and send it off
				this.netChannel.addMessageToQueue( false, newMessage );
			}

			// Don't update html TOO often
			if( ( this.gameTick % 10 == 0 ) && this.view != null )
				this.view.tick();
						
			this.netChannel.tick();
		},

		renderAtTime: function(t) {
			//
		},

	//	ClientNetChannelDelegate
		/**
		 * ClientNetChannel has connected via socket.io to server for first time
		 * Join the game
		 * @param messageData
		 */
		netChannelDidConnect: function (messageData)
		{
			// Sync time with server
			this.gameClock = messageData.payload.gameClock;
		},

		/**
		 * Called when the user has entered a name, and wants to join the match
		 * @param aNickname
		 */
		joinGame: function(aNickname)
		{
			this.nickname = aNickname;
			// Create a 'join' message and queue it in ClientNetChannel
			this.netChannel.addMessageToQueue( true, RealtimeMultiplayerGame.Constants.CMDS.PLAYER_JOINED, { nickname: this.nickname } );
		},

		/**
		 * Called by NetChannel when it receives a command if it decides not to intercept it.
		 * (for example CMDS.FULL_UPDATE is always intercepted, so it never calls this function, but CMDS.SERVER_MATCH_START is not intercepted so this function triggered)
		 * @param messageData
		 */
		netChannelDidReceiveMessage: function (messageData)
		{
			debugger;
//			this.CMD_TO_FUNCTION[messageData.cmds.cmd].apply(this,[messageData.id, messageData.cmds.data]);
		},

		netChannelDidDisconnect: function (messageData)
		{
			// Tell the view
//			if(this.view && !this.isGameOver) // If the server was never online, then we never had a view to begin with
//				this.view.serverOffline();
		},


		///// Memory
		dealloc: function() {
			if(this.view) this.view.dealloc();
			this.view = null;

			RealtimeMultiplayerGame.AbstractClientGame.superclass.dealloc.call(this);
		}

		///// Accessors
	};


	// Extend RealtimeMultiplayerGame.AbstractGame
	RealtimeMultiplayerGame.extend(RealtimeMultiplayerGame.AbstractClientGame, RealtimeMultiplayerGame.AbstractGame, null);
})()