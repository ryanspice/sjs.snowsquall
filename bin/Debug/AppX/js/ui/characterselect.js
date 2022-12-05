"use strict"

var Characterselect = Object.create(null);

Characterselect.prototype = {
	
	name:"selection",
	
	init:function(){
		"use strict"

		this.play = this.graphics.load("interface/play");
		
		this.back = this.graphics.load("interface/back");
		
		this.title = this.graphics.load("interface/arcade-logo");
		
		this.box = this.graphics.load("interface/blackbox");
		
		this.star = this.graphics.load('interface/star');	
		
	//	this.br = this.graphics.load("interface/interfaceBoxred");
	//	this.bg = this.graphics.load("interface/interfaceBoxgreen");
	//	this.bb = this.graphics.load("interface/interfaceBoxblue");
	//	this.bbb = this.graphics.load("interface/interfaceBoxblueborder");
	//	
	//	this.picbg = this.graphics.load("interface/profilePicDefaultBack");
	//	this.picdef = this.graphics.load("interface/profilePicDefault");
	//	this.flags = [];
	//	this.flags[0] = this.graphics.load("interface/profileFlagCan");
		
		this.boards = [];
		
		this.boards[0] = this.graphics.load("interface/gameplay/board_default");
		this.boards[1] = this.graphics.load("interface/gameplay/board_flame");
		this.boards[2] = this.graphics.load("interface/gameplay/board_cheese");
		this.boards[3] = this.graphics.load("interface/gameplay/board_pie");
		this.boards[4] = this.graphics.load("interface/gameplay/board_jack");
		this.boards[5] = this.graphics.load("interface/gameplay/board_white");
		this.boards[6] = this.graphics.load("interface/gameplay/board_suit");
		this.boards[7] = this.graphics.load("interface/gameplay/board_light");
		this.boards[8] = this.graphics.load("interface/gameplay/board_insanity");
		this.boards[9] = this.graphics.load("interface/gameplay/board_black");
		
		this.boarderHead = [];
		
		this.boarderHead[0] = this.graphics.load('character/ski_head');
		this.boarderHead[1] = this.graphics.load('character/main_head_alt');
		this.boarderHead[1] = this.graphics.load('character/girl_head');
		this.boarderHead[2] = this.graphics.load('character/main_head');
		this.boarderHead[3] = this.graphics.load('character/blue_head');
		this.boarderHead[4] = this.graphics.load('character/afro_head');
		
		this.boarderBody = [];
		
		this.boarderBody[0] = this.graphics.load('character/main_body');
		this.boarderBody[1] = this.graphics.load('character/main_body');
		this.boarderBody[2] = this.graphics.load('character/main_body');
		this.boarderBody[3] = this.graphics.load('character/main_body');
		this.boarderBody[4] = this.graphics.load('character/main_body');
		
		this.boarderBoardSelect = Math.floor(Math.random()*this.boards.length);
		
		this.boarderBodySelect = Math.floor(Math.random()*this.boarderBody.length);
		
		this.boarderHeadSelect = Math.floor(Math.random()*this.boarderHead.length);

		this.name = "Customize";
		
		this.CurrentBoard = "B1";
		this.CurrentFlag = "F10";
		this.CurrentChar = "Ski00";
		
		this.MapName = "eh";
		
		this.mapNames = [
			"Original",
			"Beginners Run",
			"Forest Nine",
			"The Bullet",
			"Bills Freezer",
			"Santa's Sleigh",
			"Mountian Mayham",
			"Glacial Path",
			"Black Diamond",
			"Neverest",
			"White Out",
			"Cold Raven",
			"Psychotic Ultimatum"];
		
		this.customstate = "";

		this.mode = "Arcade";
		
		this.xxx = 0;
		this.a = 0;
		this.End = 0;
		this.offset = 0;
		this.offx = 0;
		this.offt = 0;
		this.vel = 0;
		this.amount = 0;
		this.m = 12;
		
		/* Stats */
		
		this.Stats_type = "Board";
		this.Stats_speedStar 	= [4,3,1,2,2,1,1,2,1,2];
		this.Stats_turningStar 	= [4,2,3,2,2,2,2,3,2,2];
		this.Stats_turningStarA 	= [4,2,3,2,2,2,2,3,2,2];
		this.Stats_accelStar 	= [4,1,1,3,2,1,2,2,1,2];
		this.speedStar=this.Stats_speedStar[4];
		this.turningStar=this.Stats_speedStar[4];
		this.accelStar=this.Stats_speedStar[4];
		
		this.PlayerBoardSelect = Math.round(Math.random()*7);
		this.PlayerCharSelect = 1+ Math.round(Math.random()*3);
		
		return true;
		
		/* 	Skins	*/
		
		PlayerSki = new Array();
		PlayerSki[0] = GraphicsController.load('SKI10','character/headSki');
		PlayerSki[1] = GraphicsController.load('SKI20','character/armsSki');
		PlayerSki[2] = GraphicsController.load('SKI30','character/legsSki');
		
		SkiPole = GraphicsController.load('ski','character/ski');
		Question = GraphicsController.load('Question','question');
		
		return true;
	},
	
	returntointro:function (){
		
		var t = 150 / Application.getDelta();
		setTimeout(function(){
			Application.getCurrent().intro.characterselect.a = 0;
			Application.getCurrent().intro.continue = false;
			Application.getCurrent().intro.StartAlpha = 1;
		},t);
		
	},
	
	returntoplay:function (){
		
		var t = 150 / Application.getDelta();
		setTimeout(function(){
			Application.getCurrent().intro.characterselect.a = 0;
			Application.getCurrent().state = Application.getCurrent().states['game'];
			Application.getCurrent().intro.StartAlpha = 1;
		},t);
		
	},
	
	update:function(){
		
		if (this.a<0.9)
			this.a+=0.1*this.app.getDelta();
			if (this.a>1)
				this.a=1;
			if (this.a<0)
				this.a=0;
		
		
		this.xxx+=1*this.app.getDelta();
		if (this.End==1)
			{
			this.a-=Math.floor(2*this.app.getDelta())*0.1;
			
		//	if (this.a<0.1)
		//		App.client.update.state.set(Snow.background,true);
				
			
			}	
		if (this.vel>0.5)
			this.vel*=0.99;
			else
			this.vel = 0;
		if (this.offset<0)
			this.offset=0;
		if (this.offset>275*this.m)
			this.offset=275*this.m;
		if (this.offx>275*this.m)
			this.offx=275*this.m;
		if (this.offx<0)
			this.offx=0;
		return true;
		

		
			
	return true;
	},
	
	draw:function(){
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();
		
		if (this.app.input.pressed)
		{

			var s = this.app.input.dist.x*0.12;
			
			if (s>275)
				s = 275;
				else
					if (s<-275)
						s = -275;

			this.offx-=s;
			
			this.amount-=s;

			if (this.amount>275)
				this.amount = 0,this.offset+=275;
				else
					if (this.amount<-275)
						this.amount = -0,this.offset-=275;

			this.offx-=s;
			
			this.amount-=s;
			
		}
		else
			if (!this.app.input.released)
			{
				if (this.offx>this.offset+Math.round(this.vel*this.app.getDelta()))
					this.offx-=Math.round((this.vel*((-this.offset+this.offx)*0.1)*0.1)*this.app.getDelta()),this.vel+=1*this.app.getDelta();
					else
						if (this.offx<this.offset-Math.round(this.vel*this.app.getDelta()))
							this.offx-=Math.round((this.vel*((-this.offset+this.offx)*0.1)*0.1)*this.app.getDelta()),this.vel+=1*this.app.getDelta();
			}

		if (this.app.input.released)
		{
			if(this.offx-this.offset>60*this.app.getScale()){this.offset+=275;}
				else
					if(this.offx-this.offset<-60*this.app.getScale()){this.offset-=275;}
		}
		
		/* Controls */
		
		this.visuals.image_button(this.title,width*0.5,height*0.21,1,function(){},this.back,1,1,this.a,true); 
		this.visuals.image_button(this.play,width*0.5,height*0.82,1,this.returntoplay,this.back,1,1,this.a,true);
		this.visuals.image_button(this.back,width*0.5,height*0.92,1,this.returntointro,this.back,1,1,this.a,true);
		
		/* Character */
		
		var charCos = Math.cos(this.xxx/50);
		var charCosLess = charCos/20;
		
		if (this.boarderBodySelect!=0)
			this.visuals.image_rotate(this.boards[this.boarderBoardSelect],width*0.21,height*0.440,1,charCos*35+5,1,0,0);
		
		this.visuals.image_rotate(this.boarderBody[this.boarderBodySelect],width*0.2,height*0.4235,1.2,charCos*20+5,1,0,0);
		this.visuals.image_rotate(this.boarderHead[this.boarderHeadSelect],width*0.2,height*0.424,1.2,charCos*5+5,1,0,0);
		
		/* Boards */
		
		var hh = height*0.7;
		
		for(var i=8;i>=0;--i) 
		{
			var a = function(){Application.getCurrent().intro.characterselect.boarderBoardSelect=i};
			
			if (i==this.boarderBoardSelect)
				this.visuals.image_button(this.boards[i],(i*(this.boards[i].width/2+10))-10,hh,1+charCosLess,a,1,1,1,this.a,true);
			else
				this.visuals.image_button(this.boards[i],(i*(this.boards[i].width/2+10))-10,hh,0.9,a,1,1,1,this.a*0.7,true);
			
		}
		
		/* Stasrs */		
		
		var hw = this.app.getWidth()/2;
		var hh = this.app.getHeight()/1.2;
		
		var starw = (this.star.width*1.25)+1;
		for(var b=this.turningStar;b>0;--b)
			this.visuals.image(this.star,-10+(starw*b)+ hw,52+hh/2.45,1,0.5,true);
		for(var b=this.speedStar;b>0;--b)                          
			this.visuals.image(this.star,-10+(starw*b)+ hw,+20+hh/2.45,1,0.5,true);
		for(var b=this.accelStar;b>0;--b)                           
			this.visuals.image(this.star,-10+(starw*b)+ hw,+85+hh/2.45,1,0.5,true);

		var hw = this.app.getWidth()/2;
		var hh = height*0.6;
		
		/* Heads */
		
		for(var b=4;b>0;--b) {
			//if (PlayerCharSelect==b)
			if (this.boarderHeadSelect==b)
				this.visuals.image_button(this.boarderHead[b], -200+ (75*b) + hw,hh,1.15,function(){},this.boarderHead[b],1,1,1,true);
			else
				this.visuals.image_button(this.boarderHead[b], -200+ (75*b) + hw,hh,1.15,function(){Application.getCurrent().intro.characterselect.boarderHeadSelect = b; setStars(Application.getCurrent().intro.characterselect.PlayerBoardSelect); if (b==1) Application.getCurrent().intro.characterselect.Stats_type = "Ski";},this.boarderHead[b],1,1,0.5,1,true); 
		}
			//this.visuals.image_button(this.playerskin[b], 95+ (50*b)-50*(2%b) + hw,270+25*(2%b),1,function(){PlayerCharSelect = b; setStars(PlayerBoardSelect); if (b==1) Stats_type = "Ski";},this.playerskin[b],1,1,1); }
		
			
return true;
		
			
		
		if (PlayerCharSelect!=1)
		{
		App.visuals.image_rotate(PlayerBoardSkin0[PlayerBoardSelect],App.w/1.25,App.h/3.2,1,25);



		for(var b=9;b>0;--b)
			if (PlayerBoardSelect==b)
				App.visuals.image_button(PlayerBoardSkin0[b], -150 + (30*b) + App.w/2,App.h/1.6,1,function(){},PlayerBoardSkin0[b],1,1,1);
				else                                           
				App.visuals.image_button(PlayerBoardSkin0[b], -150 + (30*b) + App.w/2,App.h/1.55,1,function(){PlayerBoardSelect = b;setStars(PlayerBoardSelect);},PlayerBoardSkin0[b],1,1,0.3);

		}
		else
		{
			var ww = PlayerBoardSkin0[PlayerBoardSelect].width;
			var hh = PlayerBoardSkin0[PlayerBoardSelect].height;
			SANDERS +=5*SANDERD;
			var ar = 1;
			var aa = 20;
			var ay = +App.h/3.33;
			var w = 15;
			
			App.visuals.image_rotate(SkiPole,5+App.w/1.25,App.h/3.2,1,20);
			App.visuals.image_rotate(SkiPole,5+App.w/1.25,App.h/3.2,1,10);
			setStars(0);
		}


		for(var b=4;b>0;--b)
			if (PlayerCharSelect==b)
			App.visuals.image_button(PlayerCharacterSkin0[b], -200 + (50*b) + App.w/2,App.h/2.9,1,function(){},PlayerCharacterSkin0[b],1,1,1);
			else                                                                            
			App.visuals.image_button(PlayerCharacterSkin0[b], -200 + (50*b) + App.w/2,App.h/2.9,1,function(){PlayerCharSelect = b; setStars(PlayerBoardSelect); if (b==1) Stats_type = "Ski";},PlayerCharacterSkin0[b],1,1,0.5);
			
		App.visuals.image_button(PlayerCharacterSkin0[0], -200 + (50*5) + App.w/2,App.h/2.9,1,function(){},PlayerCharacterSkin0[0],1,1,0.5);
		App.visuals.image_button(PlayerCharacterSkin0[0], -200 + (50*6) + App.w/2,App.h/2.9,1,function(){},PlayerCharacterSkin0[0],1,1,0.5);
			
		App.visuals.image_rotate(PlayerCharacterSkin0[PlayerCharSelect], App.w/1.25,App.h/3.1,1,15);

		App.visuals.image_button(GraphicsController.getImage('arcadePlay'),App.setWidth/2,App.h-150,1,function(){App.set_state(Game_,true);});	
		App.visuals.image_button(GraphicsController.getImage('arcadeBack'),App.setWidth/2,App.h-50,1,function(){App.set_state(Menu_,false);});	
		
			
			
return true;
		
			
			this.visuals.image_rotate(this.arcadeScore,tt+this.pagePos+width*0.5,+150+this.pagePosY+400-(this.StartAlpha*3)*70,1,1,this.EndFade*1,0,0);
			this.visuals.image_rotate(this.arcadeNewScore,+75+tt+this.pagePos+width*0.5,+125+this.pagePosY+400-(this.StartAlpha*3)*70,0.65,1,this.EndFade*1,0,0);
			for(var i=5;i>0;--i)
			this.visuals.image_rotate(this.GameScore[i],tt+this.pagePos+width*0.5 + this.GameScore[i].width/2*(i-3),+225+this.pagePosY+400-(this.StartAlpha*3)*70,1,1,this.EndFade*1,0,0);
			
			this.visuals.image_rotate(this.arcadeBoard,tt+this.pagePos+width*0.5,+300+this.pagePosY+400-(this.StartAlpha*3)*70,1,1,this.EndFade*1,0,0);
			
			this.visuals.image_rotate(this.boarderBody[this.boarderBodySelect],tt+this.pagePos+width*0.5,+375+this.pagePosY+400-(this.StartAlpha*3)*70,1.33,1,this.EndFade*1,0,0);
			this.select = function(){
				Snow.background.boarderBodySelect = Math.floor(Math.random()*Snow.background.boarderBody.length);
				Snow.background.boarderBodySelect = App.client.Math.Wrap(Snow.background.boarderBodySelect,0,Snow.background.boarderBody.length-1);
				Snow.background.boarderBoardSelect = Math.floor(Math.random()*Snow.background.boarderBoard.length);
				Snow.background.boarderBoardSelect = App.client.Math.Wrap(Snow.background.boarderBoardSelect,0,Snow.background.boarderBoard.length-1);
			};
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
return true;
		
		for(var i=this.m;i>=0;--i) {
			this.offt = 275*i;
			var fu = function(){App.client.update.state.current.offset =App.client.update.state.current.offt;}
			var c = -this.offx+width*0.5 + 275*i;
			var yy = (height*0.75)-Math.sin(c/360)*250;
			var yy2 =yy+65;
			var yy3 =yy-55;
			
			if (this.offt == this.offset) {
			this.visuals.image_button(this.bb,c,yy,1,fu,this.back,1,1,this.a,true);
			this.visuals.image_button(this.bg,c,yy,1,fu,this.back,1,1,this.a*i/this.m,true);
			if (i%4==0)
				if (i!=0)
				this.visuals.image_button(this.br,c,yy,1,fu,this.back,1,1,0.8,true);
			
			
			this.visuals.image_button(this.bbb,c,yy+2,1,fu,this.back,1,1,1,true);
			}
			else
			{
			this.visuals.image_button(this.bb,c,yy,1,fu,this.back,1,1,(this.a)*0.5,true);
			this.visuals.image_button(this.bg,c,yy,1,fu,this.back,1,1,(this.a*i/this.m)*0.5,true);
			if (i%4==0)
				if (i!=0)
				this.visuals.image_button(this.br,c,yy,1,fu,this.back,1,1,0.82*0.5,true);
			this.visuals.image_button(this.bbb,c,yy+2,1,fu,this.back,1,1,this.a*0.5,true);
			}
			this.visuals.text_shadow(5,0,0,"#000000");
			for(var ii=2;ii>=0;--ii){
				this.visuals.image_ext(this.star,-55+c + (25*ii),yy2,1,this.a,true);
				if (ii!==0)                                          
				this.visuals.image_ext(this.star,-55+c - (25*ii),yy2,1,this.a,true);}
			this.visuals.text_ext(this.mapNames[i],c-115,yy3,"#FFFFFF",2,1,0,"Segoe UI bold");
			this.visuals.text_shadow(0,0,0,"#000000");
		}
		
return true;
		
		App.client.Particles.draw(3);
	return true;
	}
};




var setStars = function(num)
{
	var num = num||0;
	Application.getCurrent().intro.characterselect.speedStar=Application.getCurrent().intro.characterselect.Stats_speedStar[num];
	Application.getCurrent().intro.characterselect.turningStar=Application.getCurrent().intro.characterselect.Stats_turningStar[num];
	Application.getCurrent().intro.characterselect.accelStar=Application.getCurrent().intro.characterselect.Stats_accelStar[num];
	//console.log(speedStar + " " + turningStar + " " + accelStar);
}
var SANDERS = 0;
var SANDERD = 1;
	function setMapScore(map,x,y,s,mapn)
	{
		App.visuals.image_button(GraphicsController.getImage(map),x,y, 1,function(){MapName= mapn;MapCurrent = map;});
	}   	                    
	function setBoard(b,x,y)
	{
		App.visuals.image_button(GraphicsController.getImage(b),x,y, 1,function(){CurrentBoard= b;});
	}      
	function setFlag(flag,x,y)
	{
		App.visuals.image_button(GraphicsController.getImage(flag),x,y, 1,function(){ CurrentFlag= flag;});
	}    