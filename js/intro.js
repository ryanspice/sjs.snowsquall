"use strict";
var Intro = Object.create(null);
Intro.prototype = {
	init:function()
	{
		
		this.SplashScreen = new Array();
		this.SplashScreen[0] = new Image();
		this.SplashScreen[1] = new Image();
		this.SplashScreen[2] = new Image();
		this.SplashScreen[0] = this.graphics.load('intro/SplashScreen');
		this.SplashScreen[1] = this.graphics.load('intro/spicejsicon');
		this.SplashScreen[2] = this.graphics.load('intro/ryanspice');
		this.StartPhase = 2;
		this.StartAlpha = 2;
		this.Background = this.graphics.load('intro/background');
		this.begin = this.graphics.load('intro/begin');
		
		this.ScoreNumber = new Array();
		this.ScoreNumber[0] = this.graphics.load('interface/score/score_0');
		this.ScoreNumber[1] = this.graphics.load('interface/score/score_1');
		this.ScoreNumber[2] = this.graphics.load('interface/score/score_2');
		this.ScoreNumber[3] = this.graphics.load('interface/score/score_3');
		this.ScoreNumber[4] = this.graphics.load('interface/score/score_4');
		this.ScoreNumber[5] = this.graphics.load('interface/score/score_5');
		this.ScoreNumber[6] = this.graphics.load('interface/score/score_6');
		this.ScoreNumber[7] = this.graphics.load('interface/score/score_7');
		this.ScoreNumber[8] = this.graphics.load('interface/score/score_8');
		this.ScoreNumber[9] = this.graphics.load('interface/score/score_9');
		
		this.xxx=0;
		this.start = false;

		(this.particles = this.app.create(SB_.prototype)).init();
		(this.loading = this.app.create(Loading.prototype)).init();
		(this.statusicons = this.app.create(StatusIco.prototype)).init();
		(this.characterselect = this.app.create(Characterselect.prototype)).init();
		this.continue = false;
		
		return this;
	},
	draw:function()
	{

		if (this.StartPhase==0)
		{
			
			this.visuals.rect_ext(-this.app.getScaledWidth(),0,this.app.getScaledWidth()*3,this.app.getHeight(),1,1,0,"#000000");
			
			if ((this.StartAlpha>100))
				this.visuals.image_ext(this.Background,this.app.getWidth()/2,this.app.getHeight()/2, 1,Math.sin(this.StartAlpha/120),true);
			
			if (this.continue==false)
				this.visuals.image_ext(this.SplashScreen[this.StartPhase],this.app.getWidth()/2,300, 1,Math.sin(this.StartAlpha/120),true);
			
			this.visuals.rect_ext(this.app.getWidth()/2,this.app.getHeight()/2,this.app.getScaledWidth()*2,this.app.getHeight(), 1,Math.sin(this.StartAlpha/60),true,"#FFFFFF");
		
		}
		else
			if (this.continue==false)
			this.visuals.image_ext(this.SplashScreen[this.StartPhase],this.app.getWidth()/2,300, 1,Math.sin(this.StartAlpha/120),1);
			
		this.visuals.rect_gradient(this.app.getWidth()/2,this.app.getHeight()/2,this.Background.width,this.app.getHeight(),1,Math.sin(this.startAlpha/120)*0.9,1,"transparent","#5e5fdf");
		this.visuals.rect_gradient(this.app.getWidth()/2,this.app.getHeight()*0,this.Background.width,this.app.getHeight()*2,1,Math.sin(this.startAlpha/120)*0.9,1,"transparent","#5e5fdf");
		
		if (this.continue == true)
		{
			
			this.characterselect.draw();
		
		}
		else
			if (this.continue==false)
			this.visuals.image_ext(this.SplashScreen[this.StartPhase],this.app.getWidth()/2,300, 1,Math.sin(this.StartAlpha/120),true);
			
			
		if (this.StartPhase==0)
		{
			this.particles._draw();
			
			if (this.graphics.getErrors())
				this.loading.draw();
			else	{
				var a = this.app.client.Math.Clamp(Math.cos(this.xxx/25),0,1);
				if (this.continue==false)
				this.visuals.image_ext(this.begin,this.app.getWidth()/2,500, 1,a,1);
				
				this.app.ext.cursor.set('pointer');
				
				this.statusicons.draw(Math.sin(this.StartAlpha/120)*0.9);
				
			}
		}
			else	{
			
					this.loading.draw();
			}
			
		
		if (this.StartPhase==0)
			if (Math.sin(this.StartAlpha/60)<0.8)
				if (this.app.input.released)
					if (this.continue==false)
						this.continue = true;
			return true;

	},
	update:function(){
		
		for(var i = 0; i<2; i++){
		this.loading.update();
		this.statusicons.update();
		
		if (this.continue == true)
		{
			this.characterselect.update();
			this.particles._update();
		
			return;
		}
		
		if (this.StartPhase==0)
			if (Math.sin(this.StartAlpha/60)<0.8)
				this.particles._update();
		
		
				
				
		if ((this.StartPhase!=0)||(this.StartAlpha<180))
			this.StartAlpha+= Math.round(1 * this.app.getDelta());
		
		this.xxx+=Math.round(1 * this.app.getDelta());
		
		this.ContinueAlpha=Math.sin(this.xxx*0.01);
		
		if ((this.app.input.y>100)&&(this.app.input.y<this.app.getHeight()-100))
			if (this.app.input.released)
				if (this.StartPhase!=0)
					{
						this.StartPhase--;
						this.StartAlpha = 1;
					}
		if (this.StartAlpha==359)
			{
				this.StartAlpha = 1;
				
				if (this.StartPhase==0)
					{
					this.start = true;
					return true;
					}
				
				this.StartPhase--;
			}
		}
		return true;

	}
	
};