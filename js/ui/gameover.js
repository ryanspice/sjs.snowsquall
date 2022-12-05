"use strict"

var Gameover = Object.create(null);

Gameover.prototype = {
	
	name:"gameover",
	
	init:function(){
		
		this.yourscore = this.graphics.load('interface/yourscore');
		this.play = this.app.getCurrent().intro.characterselect.play;
		this.back = this.app.getCurrent().intro.characterselect.back;
		this.a = 0;
		
		this.functions = {
			
			back:function(){
			
				var t = 150 / Application.getDelta();
				setTimeout(function(){
				Application.getCurrent().state = 0;
				},t);
			}
			
		};
		
	},
	
	draw:function(){
	
		
		var hw = this.app.getWidth()/2; 
		var height = this.app.getHeight()/2;
		if (this.a<1)
			this.a+=0.1;
		
		this.visuals.image_centered(this.yourscore, hw ,height*0.30,this.a);	
		
		this.visuals.image_button(this.play, hw ,height*1.35,1,this.functions.back,1,1,1,this.a,1);	
		
		this.visuals.image_button(this.back, hw ,height*1.75,1,this.functions.back,1,1,1,this.a,1);	
		
			//Score
				var n = "1236";
				var le = n.length;
			var newscore = true;
				if (le>10)
					le = 10;
		
				for (var l = 0; l<le;++l)
					{
					var number = n.charAt(l);
					if (number>9)
						number = 0;
					var d = 50;
						l++;
					this.visuals.image_stat(this.app.getCurrent().intro.ScoreNumber[l],-this.app.getCurrent().intro.ScoreNumber[l].width/1.5+(-d*(le/2))+(d*l)+this.app.getWidth()*0.5,height,1,1,true);
						l--;
					}
		
			//New Score
				n = "2236";
				le = n.length;
		
					for (var l = 0; l<le;++l)
						{
						var number = n.charAt(l);
						if (number>9)
							number = 0;
						var d = 50;
							l++;
						this.visuals.image_stat(this.app.getCurrent().intro.ScoreNumber[l],-this.app.getCurrent().intro.ScoreNumber[l].width/1.5+(-d*(le/2))+(d*l)+this.app.getWidth()*0.5,height*0.5,0.9,1,true);
							l--;
						}

		
		return;
				GameOverEvent = true;
				GameOverDim +=0.002*App.delta_speed;
				if (GameOverDim>0.5)
					GameOverDim = 0.5;

				var n = GameOverScore.toString();
				var le = n.length;
				for (var l = 0; l<le;++l)
					{
					var number = n.charAt(l);
					if (number>9)
						number = 0;
					App.visuals.image(GraphicsController.getImage('Sc'+number),(-100*le/2)+App.setWidth*0.65+(100*l),App.setHeight*0.50,2,1,true);
					}
					
				if (NewScore>0)
					{
					var n = OldScore.toString();
					var le = n.length;
					for (var l = 0; l<le;++l)
						{
						
						var number = n.charAt(l);
						if (number>9)
							number = 0;
						App.visuals.image(GraphicsController.getImage('Sc'+number),(-50*le/2)+App.setWidth*0.65+(50*l),App.setHeight*0.30,1,1,true);
						
						}
					
					App.visuals.image(recordNew,App.setWidth*0.65-200,App.setHeight*0.50,1,1,true);
					}
				App.visuals.image(recordOld,App.setWidth*0.65-100,App.setHeight*0.30,1,1,true);
				//ADDD PARTICLES
				if (particlesand.length<this.particleLimit)
					{
					var work = new Particle(null,{x:-App.width*0.65 + (Math.random()*App.width/App.scale),y:0}, {x:Math.random()*App.width,y:App.setHeight/App.scale}, {x:Math.random()*1+0.5,y:Math.random()*0.1+0.1}, "#AAFFFF", false);	
					particlesand.push(work);	
					}
		
	},
	
	update:function(){
	
	}
	
}