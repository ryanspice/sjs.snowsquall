"use strict";
var SB_Particles = new Array();
var LastX = 0; 
var LastY = 0;
var SB_ = Object.create(null);
	SB_.size = 125;
	SB_.prototype = {
		_draw:function(){
		
			for (var _R=0; _R<SB_.size;++_R)
				SB_Particles[_R].draw(this.visuals);	
			
		},
		_update:function()
		{
		
			for (var _R=0; _R<SB_.size;++_R)
				SB_Particles[_R].update();
			
		},
		init:function()
		{
			var y = 0;
			for (var _R=0; _R<SB_.size;++_R)
			{
				y--;
						SB_Particles[_R] = Object.create(SB_.prototype);
						SB_Particles[_R].x = -this.app.getScaledWidth()/2 + (Math.random()*this.app.getScaledWidth()*2);
						SB_Particles[_R].y = y+Math.random()*30-Math.random()*50;
						SB_Particles[_R].a = 0;
						SB_Particles[_R].r = 360/6;
						SB_Particles[_R].n = 6;
						SB_Particles[_R].rr =(10+Math.random()*15)/SB_Particles[_R].n;
						(Math.random()>0.5)?SB_Particles[_R].dir=1:SB_Particles[_R].dir=-1;
						SB_Particles[_R].pow=Math.random()*200;
						SB_Particles[_R].app=this.app;
						SB_Particles[_R].visuals=this.visuals;

						SB_Particles[_R].delay = Math.random()*25+15+Math.random()*200*Math.round(Math.random()*2);
			}
		
		},
		update:function()
		{
			var w = Application.getWidth();
			var h = Application.getHeight();
			
			//if (!Application.getCurrent().intro.statusicons.toggleParticles)
			if (!Application.toggleParticles)
				return;
			
			if(this.delay<1)
			{
				this.x-=(window.innerWidth/2-Application.input.x)*0.001;
				this.y+=1;this.a+=this.dir*this.pow/2500;
				this.y*=1.005;}else{this.delay--;}
				if((this.y>h*3.25)&&(this.delay<1))
					{
						this.y=0;
						this.x=-w/2+Math.random()*w*2;
						this.y+=0.1;
						this.delay = Math.random()*25;
					}
		},
		draw:function(v)
		{
			//if (!Application.getCurrent().intro.statusicons.toggleParticles)
			if (!Application.toggleParticles)
				return;
			var x = this.x + this.dir*Math.cos(this.y/360)*this.pow;
			var y = this.y;

			v.linestart();
		
			for(var s=0;s<this.n;++s)
				{
					var cos = Math.cos(s+this.a);
					var sin = Math.sin(s+this.a);
					var ysin = Math.sin(this.y/200);

				v.lines(x+cos*this.rr*0.8,y+sin*this.rr*0.8,x+Math.cos(s+this.a*0.8)*this.rr*0.8,y+Math.sin(s+this.a*0.8)*this.rr*0.8,"#EEEEEE",0,1,s);
				v.lines(x+cos*this.rr,y+sin*this.rr,x,y,"#EEEEEE",ysin*0.8,1,s);
				}
			v.lineend();
			v.clean();
		},
		li:function(v,x,y)
			{
			v.line(x,y,LastX,LastY,"FFFFFF",1);
			LastX = x;
			LastY = y;
			}	
	};



var part_boardSnow = 
{
	create:function(x,y,angle)
	{
		this.yy = -Math.random()*3;
		this.y = (y - (30*this.app.getScale()) - (Math.random()*40*this.app.getScale()));
		
		this.x = x + Math.random()*4- Math.random()*4;
	//	this.y = y;
		this.velx = 0;
		this.vely = 0;
		this.dir=-1+Math.random()*1;
		this.t = Math.round(1+Math.random()*9);
		this.tt = 500-Math.random()*100;
		
		//this.tt = 25+Math.random()*5;
		
		this.del = false;
		
		this.angle = angle;
		this.alpha = 0.5+angle/15;
		this.image = this.graphics.load('effects/snow/sc');
				this.image2 = this.graphics.load('effects/snow/effect_snow_1');		
		this.restore = true;
		
		
		
		
		
		this.x+=1*this.angle*this.app.getScale();
		this.y-=(this.angle*this.angle);
		this.fuzz = false;
		this.scale = 0.2;
		
			//this.yy-=this.app.getCurrent().game.player.speed/2;
			//this.yy=-this.app.getCurrent().game.player.speed*1.5;
		if (Math.sqrt((this.angle*this.angle)>-0.1+Math.random()*1.4))
			{
			//this.fuzz = true;
				
				var ta = 0;
				if ((this.angle>-0.1)&&(this.angle<0.1))
					ta = (1 - Math.round(Math.random()*1)) + this.angle*55;
			//	console.log(this.angle);
			this.x +=ta * (-30+Math.random()*60);
			this.y +=+Math.random()*10;
			this.scale += 0.1 + Math.random()*1;
				this.alpha = 1.01;
		//		
			this.yy = -Math.random()*5;
		}
	},
	draw:function(){
		
			//this.visuals.rect_centered(this.x+MapOffX,this.y,25,25,"#FFFFFF");	
			//this.visuals.rect_ext(this.x+MapOffX,this.y+MapOffY,25,35,1,1,1,"#FFFFFF");	
		var a = 0.75+Math.sqrt((this.angle*this.angle))*0.15;
		//a = 1;
		var x = (this.x+MapOffX);
		var y = (this.y+MapOffY);
		if (y<-40*this.app.getScale())
			this.del = true;
		//x =  ((MapOffX*this.app.getCurrent().game.mapscale)/2 - (-this.x*0.9*this.app.getScale()));
		//x =  ((this.x*this.app.getCurrent().game.mapscale)/2 - (-MapOffX*0.9*this.app.getScale()));
				//this.visuals.image_rotate(this.image,this.x+MapOffX,this.y+MapOffY+this.image.height/2.8,1,0.75*-this.angle*57.2957795,a*2,-this.image.width/2,-this.image.height/2);
			
		if (this.fuzz)
			this.visuals.image_rotate(this.image2,this.x+MapOffX,y+this.image.height/2,a+this.scale,110,a/2,-this.image.width/2,-this.image.height/2);
			else
				this.visuals.image_rotate(this.image,x,y+this.image.height/2,this.scale,0.75*-this.angle*57.2957795,a*this.alpha,-this.image.width/2,-this.image.height/2);
			
		
		
	},
	update:function()
	{
		if (this.scale<1)
			this.scale+=0.01;
		
		var MapSpeed = 1;
		if (this.del){
			//this.x = ((this.x)/2 - (-MapOffX*this.app.getScale()));
			this.del = false;
			this.y = this.app.getCurrent().game.map.y;
			this.x = this.app.getCurrent().game.player.x+MapOffX	;

			this.create(this.x,this.y,this.app.getCurrent().game.player.angle);
			
		}
		this.t-=1;
		this.tt-=this.t*this.app.getDelta();
		//if (this.t<0.01)
			//this.t =  Math.round(1+Math.random()*9);
			
		if (this.tt<0)
			this.del = true;
		
		this.yy = this.app.client.Math.Clamp(this.yy,0,0);
		this.tt-=this.t*this.app.getDelta();
		this.t-=0.01;
		if (this.t<0.1)
			this.t =  Math.round(1+Math.random()*9);
			
		if (this.tt<0)
			this.del = true;
		
		if (this.fuzz){
			
			this.y+=this.yy;
			
			
			//if (this.angle>0.8)
			//	this.velx+=1.1;
			//	else
			//if (this.angle<0.8)
			//	this.velx-=1.1;
		}
		
		var MapSpeed = 1;
		//if (this.yy<0)
		//this.yy+=0.1;		
		this.vely = -this.app.getCurrent().game.player.speed;
		
		
		//App.visuals.image_rotate2(this.image,MapOffX+this.x,this.y+MapOffY+this.image.height/1.8,1,0.5+this.angle,-this.image.width/2,-this.image.height/2,1);
		this.y-=this.yy;
		this.yy*=0.9;
		this.xx*=0.9;
		return;
	},
	init:function(x,y,angle){
		
		
		this.create(x,y,angle);
		
		return this;
	}
}