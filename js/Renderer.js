define(function(){
	'use strict';

	function indexExists(arr,a,b){
		return arr[a] && arr[a][b];
	}

	var Renderer = function(){
		this.tiledims = [24,24];
		this.canvases = {
				background: this.makeFullScreenCanvas(),
				middle: this.makeFullScreenCanvas(),
				foreground: this.makeFullScreenCanvas()
			};

		this.listenForResize();
	};

	Renderer.prototype.getCanvases = function(){
		return this.canvases;
	};

	Renderer.prototype.matchWindowSize = function(canvas){
		var w = $(window).width(),
			h = $(window).height();

		canvas.$el
			.attr('width',w)
			.attr('height',h)
			.css({width:w,height:h});

		canvas.w = w;
		canvas.h = h;

		return canvas;
	};

	Renderer.prototype.makeFullScreenCanvas = function(){
		var $c = $('<canvas class="fullscreencanvas"/>'),
			canvas = {
				$el: $c,
				ctx: $c.get(0).getContext('2d'),
				tiles: [
					['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
					['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
					['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
					[null,null,null,null,null,'0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
					['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0']
				],
				w: 0,
				h: 0
			};

		return this.matchWindowSize(canvas);
	};

	Renderer.prototype.listenForResize = function(){
		var that = this;

		$(window).resize(
			_.throttle(function(){

				_(that.canvases).each(function(canvas){
					that.matchWindowSize(canvas);
				});
				that.render(true);

			},500)
		);
	};

	Renderer.prototype.renderBackground = function(clean){
		var that = this,
			bgcanvas = this.canvases.background,
			bgctx = bgcanvas.ctx,
			tiles = bgcanvas.tiles,
			bgw = bgcanvas.w,
			bgh = bgcanvas.h,
			tilew = this.tiledims[0],
			tileh = this.tiledims[1],
			numcols = ((bgw / tilew) + 0.5) | 0,
			numrows = ((bgh / tileh) + 0.5) | 0;

		if(clean){
			bgctx.clearRect(0,0,this.canvases.background);

			_(numrows).times(function(i){
				_(numcols).times(function(j){
					if(indexExists(tiles,i,j)){
						bgctx.strokeRect(tilew*j,tileh*i,tilew,tileh);
					}else{
						bgctx.fillRect(tilew*j,tileh*i,tilew,tileh);
					}
				});
			});
		}
	};

	Renderer.prototype.render = function(clean){
		this.renderBackground(clean);
	};

	return Renderer;

});