"use strict";
var Application = SpiceJS.create();

//Application OnLoad
Application.OnLoad = function (self) {

	self.options.set({paths:SB_PATHS});
	
	self.Init("Example SpiceJS", 320, 720);

	self.canvas.setBackground("#FFFFFF");

	self.ext.metatag.metaFavicon("favicon.png");

};

Application.main= {

	name:"Example",

	init:function() {

		this.state = 0;
		
	//	this.app.client.visuals.setBleed(0.9);
		
		this.states = {menu:0,game:1};
		
		(this.intro = this.app.create(Intro.prototype)).init();
		
		(this.game = this.app.create(Game.prototype)).init();
		
	},

	update:function() {

		switch(this.state)
		{
			case 0:
				
				this.intro.update();
			
			break;
			case 1:
				
				this.game.update();
			
			break;
		}
		
	},

	draw:function() {
		
		switch(this.state)
		{
			case 0:
				
				this.intro.draw();
			
			break;
			case 1:
				
				this.game.draw();
			
			break;
		}
		
	}

};