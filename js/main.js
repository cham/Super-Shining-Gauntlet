require([
	'Game',
	'lib/dependencyLoader'
],function(
	Game,
	dependencyLoader
){
	'use strict';

	dependencyLoader(function(){

		Game.makeDom();
		
		$('body').append(Game.getDom());
		
	});
});