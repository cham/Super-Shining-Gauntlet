define([
	'Renderer'
],function(
	Renderer
){
	'use strict';

	var renderer = new Renderer();

	return {
		
		$root: $('<div/>'),

		makeDom: function(){
			var that = this;

			_(renderer.getCanvases()).each(function(canvas){
				that.$root.append(canvas.$el);
			});
		},

		getDom: function(){
			return this.$root;
		}
	};

});