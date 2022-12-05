/* 
	SpiceJS - player 
		
		The player class inherits a game object. Hence the 
		
		var  player = SpiceJS.create(Player.prototype,Player.constructor(Application));
	
		TODO: 
				
			Test Movement
			Adjust for movement modifying vars
			
			
			
			Get Functions for Each public requested input
			Measure Touch/Keyboard sensitivity differences
			Research need for confining cursor 
			
			
*/

"use strict"

var Player = Object.create(null);

Player.prototype = {
	
	init:function(){
		
		/* Cache */
		
		this.x = 0;
		this.y = 150;
		
		this.angleturn = 0;
		this.angle = 0;
		this.lasta = this.angle;
		this.curra = this.angle;
		
		//Vars from character select this.app.getCurrent().intro.characterselect
		
		this.turning = 0.2+0.01;
		this.accel = 1+0.01;
		
		this.speed = 0.1;
		this.maxspeed = 12;
		this.minspeed = 0.1;
		
		this.offY = 0;
		
		this.gravity = 1;
		MapOffY = 0;
		MapOffX = 0;
		this.scale = 0.8;
		
		//Jumping Vars
		
		this.airtrigger = false;
		this.airtimeout = 25;
		this.air = false;
		this.aird = 10;
		
		//Player effects
		
		this.effects = [];
		for (var i = 0; i<26;i++)
			this.effects.push((this.app.create(Object.create(part_boardSnow)).init(100,100,this.angle)));
		
	},
	draw:function(){
		
		/* Cache */
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();
		
		//Vibration
		
		var charCos = Math.cos(this.x/50);
		
		charCos = this.angle*1.45;// - this.aird/10;
		
		if ((this.angle>0.4)||(this.angle<-0.4))
			charCos = this.angle*1.45 +(-this.angle* (this.aird>5?this.aird/5:this.aird/10));
		
		var charCosLess = charCos/20;
		
		//Angle
		
		var a =  -charCos * (180/Math.PI);
		
		//Xpositions
		
		var x = this.app.getCurrent().game.map.x + this.x;
		var map_x = -width + this.app.getCurrent().game.map.x;
		var x_board =  x + map_x;
		var x_body = a/15+x + map_x;
		var x_head = a/15+x + map_x;
		
		//Ypositions
		
		var y =( this.app.getCurrent().game.map.y - this.y);
		var y_board = (a/250+y)+1;// + (charCos*charCos)*5;
		var y_body = y-2;
		var y_head = (a/30+y)-1;
		
		//Character Scale
		
		var scale =this.aird/100+ (this.scale * this.app.getCurrent().game.mapscale);
		
		//Draw Effects
		
		for (var i = 0; i<26;i++)
			this.effects[i].draw();
		
			//	App.visuals.image_rotate2(PlayerBoardShadow,this.airtime+(this.x+MapOffX)+Angle*0.008,-3-this.airtime/2+(this.y+MapOffY)-Angle*0.004,0.5-Angle*0.002,+Angle*0.4,-this.w*1.5,-this.h*2,0.5);
		var img;
		var w;
		var h;
		
		
		img = this.app.getCurrent().intro.characterselect.boards[9];
		w = img.width/2;
		h = img.height/2;
		scale+=+0.005*Math.cos(this.y);
		this.visuals.image_rotate(img,x_board+this.x/100 + this.aird*2,y_board,scale*0.9,a*1 ,0.25,-w,-h,false);
		
		img = this.app.getCurrent().intro.characterselect.boards[this.app.getCurrent().intro.characterselect.boarderBoardSelect];
		w = img.width/2;
		h = img.height/2;
		this.visuals.image_rotate(img,x_board,y_board,scale,a*1,1,-w,-h,false);
		
		
		
		
		img = this.app.getCurrent().game.bshadow;
		w = img.width/2;
		h = img.height/2;
		
		this.visuals.image_rotate(img,w/4+x_board-a*0.08,-h/4+y_board+a*0.1,scale+0.05*Math.cos(this.y),a*0.45,0.5,-w,-h,false);
		
		
		img = this.app.getCurrent().intro.characterselect.boarderBody[this.app.getCurrent().intro.characterselect.boarderBodySelect];
		w = img.width/2;
		h = img.height/2;
		
		this.visuals.image_rotate(img,x_body,y_body,scale+0.2,a,1,-w,-h,false);
		
		
		img = this.app.getCurrent().intro.characterselect.boarderHead[this.app.getCurrent().intro.characterselect.boarderHeadSelect];
		this.visuals.image_rotate(img,x_head,y_head,scale+0.275,a*0.25,1,-w,-h*5,false);
		
		if (this.app.input.getReleased())
		{
			this.airforce += 2;
			
			if ((this.angle>1.4)||(this.angle<-1.4))
				this.angle*=0.9;
		}
		
		
	//	var s = this.speed;
	//	s = this.app.client.Math.Clamp(s,1,2)/5;
	//	s = 1;
	//	this.app.getCurrent().game.mapscale = 1 -s+ MapOffY/-this.y;
//		this.app.getCurrent().game.mapscale = (7-this.speed);
		
	//	this.app.getCurrent().game.mapscale = 1 - this.speed/120;
	//	
	//	this.app.getCurrent().game.mapscale = this.app.client.Math.Clamp(this.app.getCurrent().game.mapscale,0.5,7)
		
		this.targetzoom = 0;
		
	},
	jump:function(){
		
		this.air = true;
		this.aird = this.speed*5;
		
	},
	update:function(){
		
		//cache game size
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();	
		
		
		// temp speed vars to be moved in to this.speed and so on
		
		var speed = 0;
		var speedm = 24;
		
		var ylimit = height*0.2;
		
		var MoveY = 0;
		var MoveX = 0;
		
		// input, -1 left, 1 right; -1 up, 1 down; 0 null;
		
		var xdir =  (this.app.input.getHorizontal().keyboard/3.33 ||  this.app.input.getHorizontal().touch/3.33);
		var ydir =  (this.app.input.getVertical().keyboard ||  this.app.input.getVertical().touch);
			
		
		for (var i = 0; i<26;i++)
			this.effects[i].update();
		
		//First Var Update
		
		this.curra = ((this.lasta - this.angle));
		
		this.lasta = this.angle;
		
		
		this.angleturn = this.app.input.getHorizontal();
		
		this.angle-=xdir*(this.turning/this.app.getScale())*this.app.getDelta();
		
		
		//  a^2/2 = always positive 
		
		var adjust;
		
		adjust = (this.angle*this.angle)*0.05;
		
		//Air Update
		//is in air if timeout>0
		//	commented out is a timeout to test jump
		//	
		//always reduce airtimeout
		//aird is distance frmo ground
		
		if (this.airtimeout<1)
		{
			console.log(this.airtimeout);
			this.airtimeout=75;//,this.air = false,this.aird=this.speed*5;
			//setTimeout(function(){
			//	
			//	//You can trigger this from javascript concsole
			//	Application.getCurrent().game.player.jump();
			//	
			//	},2500);
		}
		this.airtimeout--;
		this.aird*=0.9;
		
		
		
		//Speed
		//ifspeed is smaller than 25 (should be maxspeed)
		// always slowly speed up
		// else
		// slowdown
		if (this.speed<25)
		{
			this.speed+=0.22*(0.10756-adjust*2);
		}
		else
		{
			//if (this.speed>0)
			this.speed-=0.42*(0.10756-adjust*2);
			
		}
		
		//Speed less than 1 biut larger than 0.1 speed multiply speed by accel
		if (this.speed<1)
		if (this.speed>0.1)
		{
			this.speed *= 1+this.accel;
			
			//if (this.y-adjust*10>0)
			//	this.y-=adjust*10;
		}
		
		//Speed limiter
		this.speed = this.app.client.Math.Clamp(this.speed, this.minspeed ,this.maxspeed);
		
		//Input/Angle
		//if pressed
		// and y distance <0
		//	if y touch vector is less than -150
		//  sharp turn increase angle
		if (this.app.input.getPressed())
			if (ydir<0)
			if (this.app.input.dist.y<-150*this.app.getScale())
				this.angle-=(this.angle*this.turning)*ydir;
		
		
		//Angle Limiter
		this.angle =  this.app.client.Math.Clamp(this.angle,-1.5,1.5) *1.01;
		
		//Y
		
		var offy = 0;
		
		offy = 10;
		
		//X 
		
		if ((this.angle<-0.1))
				MoveX = 12*(-this.angle*this.turning);
			else
		if ((this.angle>0.1))
				MoveX = 12*(-this.angle*this.turning);
			else
			MoveX = ((this.angle)*this.turning);
		
		if ((this.angle>1)||(this.angle<-1))
			this.angle*=0.999,MoveX*=1.2;//,this.speed*=0.99;
		
		if ((this.angle>1.5)||(this.angle<-1.5))
			this.angle*=0.999,MoveX*=0.75,MoveY-=3*(1-this.speed/12),this.speed/=this.accel,offy-=MoveY;//,this.y-=0.1*this.speed;
		
		if( (adjust>0.012)||
		 (adjust<-0.012))
		{
		//	MoveY-=2*(1-this.speed/12),this.speed/=this.accel;
			//	offy+=MoveY;
				//offy-=adjust*(this.speed/this.maxspeed)*100;
		}
			//offy-=5*adjust*this.speed,this.speed/=this.accel;
	//	else
	//	if( (adjust<0.01)&&
	//	 (adjust>-0.01))
			//offy-=0.5+adjust*(this.speed/this.maxspeed)*100;
			//offy-=1*(this.speed/this.maxspeed)*200;
		//	offy-=1*(this.speed/this.maxspeed)*200;
	//	if( (adjust>0.012)||
	//	 (adjust<-0.012))
	//		MoveY--;

		//MoveY = this.gravity + (this.accel+this.speed);
		
		
		
		
		
		var s = this.app.getCurrent().game.mapscale;
		if (this.speed>6)
		if (this.speed<12)
		{
		//var speed = this.speed - 6;
		//
		//this.targetzoom=speed/12;
		//
		//if (this.app.getCurrent().game.mapscale > 1-this.targetzoom)
		//	this.app.getCurrent().game.mapscale*=0.999;
		//if (this.app.getCurrent().game.mapscale < this.targetzoom)
				//this.app.getCurrent().game.mapscale/=1.0001;
			
			}
		
		
	//	if (this.app.getCurrent().game.mapscale>0.75)
	//			this.app.getCurrent().game.mapscale =this.aird/20;//,this.speed-=0.0005;
	//	
	//	if( (adjust>0.012)||
	//	   (adjust<-0.012))
	//			this.app.getCurrent().game.mapscale +=0.25*adjust/100,this.speed*=0.995,this.speed-=adjust/100;
	//	//if( (adjust<0.01)&&
	//	// (adjust>-0.01))
	//	//	this.app.getCurrent().game.mapscale *=1.101;
	////	if (this.app.getCurrent().game.mapscale<1.5)
	////			this.app.getCurrent().game.mapscale +=0.0011;
		this.app.getCurrent().game.mapscale = this.app.client.Math.Clamp(this.app.getCurrent().game.mapscale,1,2);
		
		
		
		MoveY+=this.speed;
		
		//this.y +=MoveY;//this.speed * App.delta_speed - (this.drag)* App.delta_speed;
		this.y = -MapOffY;
		MapOffY-=MoveY;
		
		//else
		//if( (adjust<0.01)&&
		// (adjust>-0.01))
		//		this.app.getCurrent().game.mapscale *=1.001;
		//else
		//this.app.getCurrent().game.mapscale =1- 1*((this.y)/MapOffY);// + 0.1 * (-this.speed/12);
		//MoveX/=this.app.getCurrent().game.mapscale;
		
		this.app.getCurrent().game.map.x = MapOffX+(width/2);
		this.app.getCurrent().game.map.y = -MapOffY+(height/5)+offy;
		//this.app.getCurrent().game.map.x =this.app.getCurrent().game.mapscale;
		//this.app.getCurrent().game.map.y =this.app.getCurrent().game.mapscale;
		//this.app.getCurrent().game.map.yoff = -MoveY/100;
		//this.app.getCurrent().game.map.yoff *=0.9;
		
		var diff = Math.round((MapOffY + this.y)/this.app.getHeight());
		console.log(diff);
		
		var ya = 250;
		
		//if (diff<0)
		//	this.y-=diff;
		
//		if (adjust<0.1)
//			if (diff<ya/2)
//			{
//			offy+=4.2*(0.10756-adjust*2);
//			
//			}
//			if (diff<ya)
//			{
//			offy+=4.2*(0.10756-adjust*2);
//			
//			}
//		
//			if (diff<ya/4)
//			{
//				offy +=MoveY/diff;

//			//	if (this.speed>0)
//			//	this.speed-=2.02*(0.10756-adjust*2);
//				this.speed-=0.1;
//			}
		
		
		
		
		this.x = this.app.getCurrent().game.map.x;
		
		MapOffX-=MoveX;
		
		var w = 0.5*this.app.getWidth()/2*this.app.getScale()*this.app.getCurrent().game.mapscale;
		
//	MapOffX=this.app.client.Math.Clamp(MapOffX,-w,w);
		
		var d = this.x/200; 
		
		var l = 80;
		var leftx = this.x-l;
		
		
		
		if (leftx<-w)
		{
			this.angle -= d/8;
			this.speed*=0.9;
		if(this.angle<0.5)
			this.angle-=d,this.speed*=1.05;
			//this.angle += d/4;
		//if(this.angle<-1.4)
		//	this.angle += d;
		//	
		//	
		//	if (this.angle>0)
		//		this.speed*=1.01;
		
//	if (leftx<-l)
	//	this.angle = 1;
//		this.speed*=0.5;
//		
//		MoveX-=leftx/360;
//	if(this.angle<-0)
//		this.angle-=d;//+leftx/200;
//	if(this.angle<3)
//		this.angle-=d/2;//+leftx/200;
		}
		
		d = (200)/(width+this.x-l); 
		leftx = this.x+l;
		if (leftx>width+w)
		{
			this.angle -= d/8;
			this.speed*=0.9;
			if(this.angle>-0.5)
				this.angle-=d,this.speed*=1.05;
		}
		
		
		
		
		
//		if (leftx>width+50)
//		{
//			MoveX+=leftx/360;
//		if(this.angle>0)
//			this.angle+=-leftx/360;
//		}
//		
//		MapOffX-=MoveX;
				 
		
		
		return;
		
//		delete under here eh
		
		var ylimit = height*0.2;
		 var MapSpeed = 1;
		
		
		
		
		var speed = 0;
		var speedm = 24;
		
		//if (this.curra<0)
		//	this.curra =-this.curra;
//		if (ylimit>100)
//			this.y-=(((this.curra/4)*(speed/speedm)/20))*this.app.getScale()*this.app.getDelta();
		
//		var adjust = (this.angle*this.angle)*0.05;
//		
//		if (this.speed>0)
//		this.speed-=adjust/2;
//		MoveY-=adjust*1.01;
//		
//		
//		if (MoveY<0)
//			MoveY = 0;
//		
//		if (adjust<0)
//			adjust = 0;
//		
//		
//		this.y-=adjust*1.2;
		
		//this.y+=adjust;
			
		var MoveY = this.gravity + (this.accel+this.speed);
		
		var adjust = (this.angle*this.angle)*0.05;

		if( (adjust>0.01)||
		 (adjust<-0.01))
			MoveY=0;//MoveY-=5+adjust*this.speed,this.speed/=this.accel;
		else
		if( (adjust<0.01)&&
		 (adjust>-0.01))
			this.y+=0.5+adjust*this.speed;
		
		
	//	if (this.y+MapOffY<ylimit)
	//		this.y+=this.accel*this.app.getDelta();
		//	else
			//if (this.speed<=25)
			//	this.speed+=0.01*this.app.getDelta();
		
//	if (this.speed<-0.15)
//		this.speed = -0.15*this.app.getDelta();
//		else
//	if (this.y+MapOffY<100)
//		this.speed-=0.05*this.app.getDelta();
		if (this.speed<25)
		{
			this.speed+=0.22*(0.10756-adjust*2);
		}
		else
		{
			if (this.speed>0)
			this.speed-=0.42*(0.10756-adjust*2);
			
		}
		
		
		
		
		if (this.speed<1)
		if (this.speed>0.1)
		{
			this.speed *= 1+this.accel;
			
			if (this.y-adjust*10>0)
				this.y-=adjust*10;
		}
		
	//if (adjust>0.1)
	//if (this.speed>15)
	//	this.speed-=11.02*(0.10756-adjust*2);	
				
		
		
		
		
			
		this.speed = this.app.client.Math.Clamp(this.speed, this.minspeed ,this.maxspeed);
		
					var MoveX = 0;
		
		
			if (this.airtime>0)
				this.airtime-=1;
			var h = 0;
			var AngleMod = 0;

			this.angleturn = this.app.input.getHorizontal();
			
//		console.log(this.app.input.getHorizontal().touch);
			var xdir =  (this.app.input.getHorizontal().keyboard/3.33 ||  this.app.input.getHorizontal().touch/3.33);
			var ydir =  (this.app.input.getVertical().keyboard ||  this.app.input.getVertical().touch);
		
		
			this.angle-=xdir*(this.turning/this.app.getScale())*this.app.getDelta();
		
		
		//console.log(this.x);
		
		
		
					var MoveX;
		
					if ((this.angle<-0.1))
						{
							//MoveY-=this.accel*(this.angle);
							MoveX = 12*(-this.angle*this.turning);
						//	this.offY-=this.accel*(this.angle),this.speed-=0.1*this.turning;
							//if (this.angle<-0.105)
								//this.speed*=0.91;
							//{				
								//MoveX = (-this.angle*this.turning)*2.9;
							//	if (this.speed>0)
							//		this.speed-=0.5;
							//	//new SnowFuzz(5);
							//	if ((this.angle<-180))
							//		this.angle = 180; 
							//}
						}
						else
					if ((this.angle>0.1))
						{
							//MoveY-=this.accel*(this.angle);
							MoveX = 12*(-this.angle*this.turning);
							//if (this.angle>0.105)
								//this.speed*=0.91;
						//	this.offY-=this.accel*(-this.angle),this.speed-=0.1*this.turning;
							//MoveX = (Math.sin(this.angle/60)*this.turning)*0.6;
							//this.offY-=this.accel/100*(-this.angle/360),this.speed-=0.001*this.turning;
							//if (this.angle>65)
							//{
							//	if (this.speed>0)
							//		this.speed-=0.5;
							//	//new SnowFuzz(5);
							//	MoveX = (Math.sin(this.angle/60)*this.turning)*0.4;
							//	if (this.angle>1.8)
							//		this.angle = -1.8;
							//}
						}
						else
						MoveX = ((this.angle)*this.turning);
		
					//MoveX*=this.app.getDelta();
		
					//this.x -=MoveX*25;
		

		if ((this.angle>1)||(this.angle<-1))
			this.angle*=0.999,MoveX*=0.99;//,this.speed*=0.99;
		
		if ((this.angle>1.5)||(this.angle<-1.5))
			this.angle*=0.999,MoveX*=0.5;//,this.y-=0.1*this.speed;
		
		if (this.app.input.getPressed())
			if (ydir<0)
			if (this.app.input.dist.y<-150*this.app.getScale())
				this.angle-=(this.angle*this.turning)*ydir;
		
		
		
		
//		this.angle =  this.app.client.Math.Clamp(this.angle,-1.5,1.5) *0.9978;
		this.angle =  this.app.client.Math.Clamp(this.angle,-1.5,1.5) *1.01;
		
		MapOffY-=MoveY;
		
		
		
		
		this.y +=MoveY;//this.speed * App.delta_speed - (this.drag)* App.delta_speed;
		
		
		var ya = 250;
		
		var diff = MapOffY+this.y;
		if (adjust<0.1)
			if (diff<ya/2)
			{
			this.y+=4.2*(0.10756-adjust*2);
			
			}
			if (diff<ya)
			{
			this.y+=4.2*(0.10756-adjust*2);
			
			}
		
			if (diff<ya/4)
			{
				this.y +=MoveY/diff;

			//	if (this.speed>0)
			//	this.speed-=2.02*(0.10756-adjust*2);
				this.speed-=0.1;
			}
							
		
		
		
		
		var d = this.x/360; 
		
		var l = 80;
		var leftx = this.x-l;
		if (leftx<0)
		{
			this.angle += d/4;
		if(this.angle<-1.4)
			this.angle += d;
			
			
		if(this.angle<0.5)
			this.angle+=d,this.speed*=0.99;
			if (this.angle>0)
				this.speed*=1.01;
			
	//	if (leftx<-l)
		//	this.angle = 1;
	//		this.speed*=0.5;
	//		
	//		MoveX-=leftx/360;
	//	if(this.angle<-0)
	//		this.angle-=d;//+leftx/200;
	//	if(this.angle<3)
	//		this.angle-=d/2;//+leftx/200;
		}
		
		if (leftx>width+50)
		{
			MoveX+=leftx/360;
		if(this.angle>0)
			this.angle+=-leftx/360;
		}
		
		MapOffX-=MoveX;
				 
			
		this.speed = this.app.client.Math.Clamp(this.speed, this.minspeed ,this.maxspeed);
		
		//this.app.getCurrent().game.mapscale =1- this.speed/200;
		
		this.app.getCurrent().game.map.x = MapOffX+(width/2);
		this.app.getCurrent().game.map.y = -MapOffY;
		
		this.x = ( - (-this.app.getCurrent().game.map.x))/this.app.getCurrent().game.mapscale;
		
		
		return;
	
	}
	
};


//var _Player = Object.create(null);
//_Player.prototype = {
//	id:							{writable:false,configurable:false,enumerable:true},
//	
//	x:							{writable:true,configurable:false,enumerable:true},
//	y:							{writable:true,configurable:false,enumerable:true},
//	type:						{writable:false,configurable:false,enumerable:true},
//	
//	board_speed:				{writable:true,configurable:false,enumerable:false},
//	board_turning:				{writable:true,configurable:false,enumerable:false},
//	board_accel:				{writable:true,configurable:false,enumerable:false},
//	
//	init:					function()
//									{
//									this.retrieveBoardStats();
//									
//									
//									
//									
//									
//									},
//	retrieveBoardStats:		function()
//									{
//										this.board_speed = 		Math.floor(1 + Math.floor((Stats_speedStar[speedStar] * (1.614)		)*100))/100;
//										this.board_turning = 	Math.floor(1 + Math.floor((Stats_turningStar[turningStar] * (1.614)	)*100))/100;
//										this.board_accel = 		Math.floor(1 + Math.floor((Stats_accelStar[accelStar] * (1.614)		)*100))/100;
//										//this.type = =;
//										return {"t":this.type=Stats_type,"S":this.board_speed,"T":this.board_turning,"A":this.board_accel};
//									},
//	setId:					function(id)	
//									{	return this.id = id;										},
//	getId:					function()
//									{	return this.id;												},
//	get:					function()
//									{	return {"id":this.id,"t":this.board_speed,"x":this.x,"y":this.y};	}
//}
//
//var _player = Object.create(_Player.prototype,{
//	id:			{value:0},
//	x:			{value:App.setWidth/2},
//	y:			{value:200},
//	
//	type:			{value:"type"}
//	
//	});
//	
//console.log(_player.toString);
//console.log(_player.setId(1));
////console.log(_player.retrieveBoardStats());
//console.log(_player.get());


/*
_Player.prototype = {
	id:			{writable:false,configurable:false,value:0},
	x:			{writable:true,configurable:false,value:0},
	y:			{writable:true,configurable:false,value:0},
	angle:			{writable:true,configurable:false,value:0},
	
	
	
	air:			{writable:true,configurable:false,enumerable:false,value:0},
	airtime:			{writable:true,configurable:false,enumerable:false,value:0},
	
	
	
	update_air: function()
							{
								if (this.air)
								{
								this.airtime =0;
								
								//this.angle=this.airforce/10;
								//if (this.airforce<0)
									this.angle*=1.1;
								//	else
								//	this.angle*=0.9;
									
									if ((this.angle>350)||(this.angle<-350))
										this.angle = 0,this.airforce=0+Math.random()*35,this.air=false;
								}
								return false;
							},
	update: function(a)
							{
							if (this.airtime>0)
								this.airtime-=1;
							if (INPUT_released)
								this.airforce += INPUT_distX;
							var h = 0;
							var AngleMod = 0;
							if (Pause)
								return;
							if (!GameOver)
							{
								this.angleturn = App.key* (App.keyPower*0.76);
								this.angle-=App.key*((this.angleturn)*this.turning/App.scale);
								if (!INPUT_up)
									{	
										if (INPUT.x>INPUT_last.x)
											this.angle-=(((INPUT.x-INPUT_last.x)/50)*this.turning/App.scale);
											else
										if (INPUT.x<INPUT_last.x)                               
											this.angle-=(((INPUT.x-INPUT_last.x)/50)*this.turning/App.scale);
									}
								Angle = this.angle;
								this.angleturn *= 0.9;
							}
							else
								this.speed*=0.9;
								
								
							if (!this.update_air())
								{
							
									this.angle *=0.9978;
										
									if (!this.air)
										if ((this.angle>100)||(this.angle<-100))
											this.angle*=0.925;
											
									if (this.offY<App.h/3)
										this.offY+=this.accel;
										else
									if (this.offY>App.h/2)
										this.offY = App.h/2;
										
									if (this.speed>5)
										this.speed*=0.99;
										else
									if (this.speed<0)
										this.speed *= 0.5;
										else
									if (this.speed<5)
										this.speed+=this.accel/100;
										
										
									var MoveX;
									var MoveY = this.gravity;
									MoveY += this.accel+this.speed;
									
									this.y +=MoveY;
									this.realY =this.y + MapOffY;
									
									if ((this.angle<-45))
										{
											MoveX = (Math.sin(this.angle/60)*this.turning)*0.6;
											this.offY-=this.accel/100*(this.angle/360),this.speed-=0.001*this.turning;
											if (this.angle<-65)
											{				
												if (this.speed>0)
													this.speed-=0.5;
												new SnowFuzz(5);
												MoveX = (Math.sin(this.angle/60)*this.turning)*0.4;
												if ((this.angle<-180))
													this.angle = 180; 
											}
										}
										else
									if ((this.angle>45))
										{
											MoveX = (Math.sin(this.angle/60)*this.turning)*0.6;
											this.offY-=this.accel/100*(-this.angle/360),this.speed-=0.001*this.turning;
											if (this.angle>65)
											{
												if (this.speed>0)
													this.speed-=0.5;
												new SnowFuzz(5);
												MoveX = (Math.sin(this.angle/60)*this.turning)*0.4;
												if (this.angle>180)
													this.angle = -180;
											}
										}
										else
										MoveX = (Math.sin(this.angle/60)*this.turning);
									if (!this.ice)
										{
										if (this.effects.length<100)
											if (!this.water)
												new part_boardSnow(this.x+MapOffX,this.y+MapOffY, Angle*1*App.scale);
										MapOffY = -this.y + this.offY,this.speed+=0.1,this.angle*=1.01,this.x-=2*this.angle/60;
										}
										else
										MapOffY = -this.y + this.offY,this.speed+=0.1,this.ice=false;
									this.x -=MoveX;
									MapOffX = ((App.setWidth)/4 - (this.x*0.5));
									this.checkTrees(this.x,this.y);
								}
							},
	draw: function(){},
	
	
	
	
	
	retrieveBoardStats: 	function () 
									{
									this.board_speed = 	0 + Stats_speedStar[speedStar] * (1.614);
									this.turning = this.board_turning = 1 + Stats_turningStar[turningStar] * (1.614);
									this.board_accel = 	0 + Stats_accelStar[accelStar] * (1.614);
									this.type = Stats_type;
									},
	setId:					function(id)	
									{return this.id.value = id;},
	getId:					function()
									{return this.id.value;}
};
*/
/*



var gamestartDelay = 50;
var trailArray = new Array;
var trailInActive = new Array;
var trailPop = 0;
var createDelay = 2, trailDelay = 0;
var mapobjectArray = new Array;
function player()
{
	MapSpeedP = 1;
	GraphicsController.load('imageCharacter','imageCharacter');
	GraphicsController.load('imageCharacter_legs','imageCharacter_legs');
	GraphicsController.load('imageCharacter_head','imageCharacter_head');
	GraphicsController.load('boardOverlay1','overlay/sc');
	GraphicsController.load('boardOverlay2','overlay/sl');
	GraphicsController.load('boardOverlay3','overlay/sr');
	
	
	PlayerBoardShadow = GraphicsController.load('bshadow','effects/bshadow');
	CharacterBoardSelect = 0;
	//CharacterBoardS = 0;
	//CharacterBoard = new Array();
	//CharacterBoard[0] = PlayerBoardSkin0[1];
	//CharacterBoard[1] = PlayerBoardSkin0[1];
	//CharacterBoard[2] = PlayerBoardSkin0[2];
	//CharacterBoard[3] = PlayerBoardSkin0[3];
	//CharacterBoard[4] = PlayerBoardSkin0[4];
	//CharacterBoard[5] = PlayerBoardSkin0[5];
	//CharacterBoard[6] = PlayerBoardSkin0[6];
	//CharacterBoard[7] = PlayerBoardSkin0[7];
	//CharacterBoard[8] = PlayerBoardSkin0[8];
	//CharacterBoard[9] = PlayerBoardSkin0[9];
	this.setId = function(id) 
	{
		if (this.id = id)
			return true;
			else
			return false;
	}
	this.retrieveBoardStats = function () {
	this.board_speed = 		0 + Stats_speedStar[speedStar] * (1.614);
	this.turning = this.board_turning = 	1 + Stats_turningStar[turningStar] * (1.614);
	this.board_accel = 		0 + Stats_accelStar[accelStar] * (1.614);
	this.type = Stats_type;
	//CharacterBoardS = PlayerBoardSkin0[1]
	}
	this.id = 0;
	this.x = App.setWidth/2;
	this.y = 0;
	
	this.type = "";
	this.layer = 1;
	
	this.hit = 0;
	
	this.ice = false;
	
	
	
	
	
	
	this.kill = false;


	this.life = 100;
	this.boost = 0;

	this.isdead = false;

	this.turning = this.board_turning;
	this.maxspeed = this.board_speed*10;
	this.accel = this.board_accel;
	this.collision = 9999;
	this.speed = this.board_speed;
	this.speed = 1;
	this.speedm = 2;
	this.speedp = 0;
	this.angle = 0;
	this.airb;
	this.airt;
	this.airangle = 0;
	
	this.lastINPUT_distX;
	this.horizontalDirection = 1;
	this.h_dir = 0;
	this.v_dir = 0;
	this.e_ = 0;
	this.set = false;
	this.settype = 0;
	this.mapzoom = 1;
	this.drag = 0.1;

	this.lasta = 0;
	this.curra = 0;
	this.effects = new Array;
	this.imgChar = GraphicsController.getImage('imageCharacter');
	this.imgHead = GraphicsController.getImage('imageCharacter_head');
	this.imgOverlay = GraphicsController.getImage('boardOverlay3');
	this.img = PlayerBoardSkin0[PlayerBoardSelect];
	this.imge = PlayerCharacterSkin0[PlayerCharSelect];
	soundtrackSnd[2].loop = true;
	soundtrackSnd[3].loop = true;
	this.dx = 0;
	PlayerBoardOverlay2 = GraphicsController.getImage('boardOverlay2');
	PlayerBoardOverlay3 = GraphicsController.getImage('boardOverlay3');
	this.realY = 0;
	this.offY = 0;
	this.water = false;
	this.gravity = 1.3;
	

			
	this.reset = function reset()
	{

	
		this.retrieveBoardStats();
		this.set = false;
		this.settype = 0;
		this.setscore = 0;
		this.mapzoom = 1;
		this.kill = false;
		this.x = App.setWidth/2;
		this.y = 200;
		
		this.hit = 0;
		this.life = 100;
		this.boost = 0;
		this.ice = false;
		this.water = false;
		this.isdead = false;
	
		this.maxspeed = this.board_speed+10;
		
		this.speed = 1;
		this.speedm = 55;
		this.accel = 1;
		
		
		
		this.air = false;
		this.airb = false;
		this.airt = 100;
		this.angle = 0;
		this.angleturn = 0;
		this.airangle = 0;
		this.h_dir = 0;
		this.v_dir = 0;
		this.e_ = 0;
		this.map_off_y = 0;
		
		this.fall = false;
		if (PlayerCharSelect==0)
			this.type = "Ski";
			else
			this.type = "Board";
		MapSpeedP = 1;
		
	this.airtime = 0;
	}
	
	
	
	
	this.update = function(a)
	{
	if (this.airtime>0)
		this.airtime-=1;
	if (INPUT_released)
		this.airforce += INPUT_distX;
	var h = 0;
	var AngleMod = 0;
	if (Pause)
		return;

	
	if (!GameOver)
	{
		this.angleturn = App.key* (App.keyPower*0.8);
		this.angle-=App.key*((this.angleturn)*this.turning/App.scale)*App.delta_speed;
		if (!INPUT_up)
			{	
				if (INPUT.x>INPUT_last.x)
					this.angle-=(((INPUT.x-INPUT_last.x)/50)*this.turning/App.scale)*App.delta_speed;
					else
				if (INPUT.x<INPUT_last.x)                               
					this.angle-=(((INPUT.x-INPUT_last.x)/50)*this.turning/App.scale)*App.delta_speed;
			}
		Angle = this.angle;
		this.angleturn *= 0.9;
	}
	else
	{
		this.speed*=0.9;
	}
		
		
	if (this.air)
		{
		
		this.airtime =0;
		
//		this.angle=this.airforce/10;
		//if (this.airforce<0)
			this.angle*=1.1;
		//	else
		//	this.angle*=0.9;
			
			if ((this.angle>350)||(this.angle<-350))
				this.angle = 0,this.airforce=0+Math.random()*35,this.air=false;
				
		}
		else
		{
	
			this.angle *=0.9978;
				
			if (!this.air)
				if ((this.angle>100)||(this.angle<-100))
					this.angle*=0.925;
					
			if (this.offY<App.h/3)
				this.offY+=this.accel;
				else
			if (this.offY>App.h/2)
				this.offY = App.h/2;
				
			if (this.speed>5)
				this.speed*=0.99;
				else
			if (this.speed<0)
				this.speed *= 0.5;
				else
			if (this.speed<5)
				this.speed+=this.accel/100;
				
				
			var MoveX;
			var MoveY = this.gravity;
			MoveY += this.accel+this.speed;
			
			this.y +=MoveY;
			this.realY =this.y + MapOffY;
			
			if ((this.angle<-45))
				{
					MoveX = (Math.sin(this.angle/60)*this.turning)*0.6;
					this.offY-=this.accel/100*(this.angle/360),this.speed-=0.001*this.turning;
					if (this.angle<-65)
					{				
						if (this.speed>0)
							this.speed-=0.5;
						new SnowFuzz(5);
						MoveX = (Math.sin(this.angle/60)*this.turning)*0.4;
						if ((this.angle<-180))
							this.angle = 180; 
					}
				}
				else
			if ((this.angle>45))
				{
					MoveX = (Math.sin(this.angle/60)*this.turning)*0.6;
					this.offY-=this.accel/100*(-this.angle/360),this.speed-=0.001*this.turning;
					if (this.angle>65)
					{
						if (this.speed>0)
							this.speed-=0.5;
						new SnowFuzz(5);
						MoveX = (Math.sin(this.angle/60)*this.turning)*0.4;
						if (this.angle>180)
							this.angle = -180;
					}
				}
				else
				MoveX = (Math.sin(this.angle/60)*this.turning);
			if (!this.ice)
				{
				if (this.effects.length<100)
					if (!this.water)
						new part_boardSnow(this.x+MapOffX,this.y+MapOffY, Angle*1*App.scale);
				MapOffY = -this.y + this.offY,this.speed+=0.1,this.angle*=1.01,this.x-=2*this.angle/60;
				}
				else
				MapOffY = -this.y + this.offY,this.speed+=0.1,this.ice=false;
			this.x -=MoveX;
			MapOffX = ((App.setWidth)/4 - (this.x*0.5));
			this.checkTrees(this.x,this.y);
		}
	}

	this.draw = function draw()
	{           
		for(var i = this.effects.length-1; i>0; --i)
			{
			if (App.particleLimit>0)
				this.effects[i].draw();
				else
				break;
			if (this.effects[i].del)
				{
				if (!this.ice)
					{
					this.effects[i].del = false;
					try{
					this.effects[i].create(this.x,this.y+MapOffY,this.angle);}catch(e){this.effects.splice(i,1);}
					}
				continue;
				}
			}	
			
		if (!this.air)
				App.visuals.image_rotate2(PlayerBoardShadow,this.airtime+(this.x+MapOffX)+Angle*0.004,-3-this.airtime/2+(this.y+MapOffY)-Angle*0.004,0.8-Angle*0.002,-15+Angle*0.4,-this.w*1.5,-this.h*2,0.5);
			else
				App.visuals.image_rotate2(PlayerBoardShadow,this.airtime+(this.x+MapOffX)+Angle*0.008,-3-this.airtime/2+(this.y+MapOffY)-Angle*0.004,0.5-Angle*0.002,+Angle*0.4,-this.w*1.5,-this.h*2,0.5);
		var scale = 0.8;
		this.w = this.img.width/2;
		this.h = this.img.height/2;
		switch(Stats_type)
		{
			case "Board":
			
				var bh = 0;
				if (BIGHEAD)
					var bh = 1.5;
					
				App.visuals.image_rotate2(this.img,this.x+MapOffX,this.y+MapOffY,scale,Angle*1.1,-this.w,-this.h);
				if (Angle<0)
					App.visuals.image_rotate2(PlayerBoardOverlay2,this.x+MapOffX,this.y+MapOffY,scale*1,Angle*1,-this.w,-this.h ,s);
					else
					App.visuals.image_rotate2(this.imgOverlay,this.x+MapOffX,this.y+MapOffY,scale*1,Angle*1,-this.w,-this.h ,s);
					
						this.w = this.imge.width/2;
				this.h = this.imge.height/2;
				if (PlayerCharSelect==2)
					{
					App.visuals.image_rotate2(this.imgChar,this.x+MapOffX,this.y+MapOffY,scale+0.2,Angle*0.95,-this.w,-this.h*1.2);
					App.visuals.image_rotate2(this.imgHead,this.x+MapOffX,this.y+MapOffY,scale+0.2,Angle*0.5,-this.w,-this.h*1.2);
					}
					else
					{
					if (!GameOver)
						App.visuals.image_rotate2(PlayerCharacterSkin0[PlayerCharSelect] ,this.x+MapOffX,this.y+MapOffY,scale*1.1+bh,Angle*0.9,-this.w,-this.h*1.2);
						else
						App.visuals.image_rotate2(PlayerCharacterSkin0[PlayerCharSelect] ,this.x+MapOffX,this.y+MapOffY*1.1,scale*1.1+bh,Angle*0.9,-this.w,-this.h*1.2);
					}
			break;
			case "Ski":
				var aa = Angle;
				if (aa>0)
				{
					App.visuals.image_rotate2(SkiPole, -10+this.x+MapOffX,this.realY ,1,aa*0.9,-SkiPole.width,0,1);	
					if (aa>75)
						aa = 75;
					App.visuals.image_rotate2(SkiPole, 10+this.x+MapOffX,this.realY ,1,aa*0.85,-SkiPole.width, 0,1);	
					aa = Angle;
				}
				else
				{
					App.visuals.image_rotate2(SkiPole, 10+this.x+MapOffX,this.realY ,1,aa*0.9,-SkiPole.width ,0,1);	
					if (aa<-75)
						aa = -75;
					App.visuals.image_rotate2(SkiPole, -10+this.x,this.realY ,1,aa*0.85,-SkiPole.width,0,1);	
					aa = Angle;
				}
				App.visuals.image_rotate2(PlayerSki[2] ,this.x+MapOffX,this.realY,     scale+0.4,Angle*0.8,-SkiPole.width,-PlayerCharacterSkin0[1].height/4,1);
				App.visuals.image_rotate2(PlayerSki[1] ,this.x+MapOffX,this.realY,     scale+0.4,Angle*0.7,-SkiPole.width,-PlayerCharacterSkin0[1].height/4,1);
				App.visuals.image_rotate2(PlayerSki[0] ,this.x+MapOffX,this.realY,     scale+0.4,Angle*0.6,-SkiPole.width,-PlayerCharacterSkin0[1].height/4,1);
			break;
		}
	}
	this.checkTrees = function (x,y)	
	{
		var chk;
		var chkL = mapobjectArray.length;
		var hit = false;
		var nearmiss = false;
		var sx = 30;
		var ss = 2.5;
		
		
		/// Constraining the character.
		if (this.x<-325){
			if (this.angle>0)
				this.angle+=this.angle;}
				else
		if (this.x<-250){
			if (this.angle>0)
				this.angle-=this.angle*0.3;}
				else
		if (this.x<0)
			if (this.angle>0)
				this.angle-=this.angle*0.02;
			
			
			
		if (this.x>App.w+325){
			if (this.angle<0)
				this.angle+=this.angle;}
				else
		if (this.x>App.w+250){
			if (this.angle<0)
				this.angle-=this.angle*0.3;}
				else
		if (this.x>App.w)
			if (this.angle<0)
				this.angle-=this.angle*0.02;
				
		///Looping the Trees
		for(chk=1; chk<chkL;chk++)
		{
			if (!mapobjectArray[chk].type)
				continue;
			vx = this.x - mapobjectArray[chk].x;
			if ((vx>175)||(vx<-175))
				continue;
			vy = this.y - mapobjectArray[chk].y;
			if ((vy>175)||(vy<-175))
				continue;
			sx = mapobjectArray[chk].collision;
			//////
			///		Radial Collisions
			//////
					//b = (Math.pow((this.x) - vx,2) + Math.pow(((this.y+100)) - vy,2));
					//b = mapobjectArray[chk].x;
					//b2 = mapobjectArray[chk].collision;
					//if (b<128)
					//	console.log(Math.sqrt(b));
			//////
			///		Rectangle Collisions
			//////
			
			//App.visuals.arch(mapobjectArray[chk].x,mapobjectArray[chk].y,sx,"#0000FF",360);
			//return;

					var chkdist =  sx*mapobjectArray[chk].scale;
					var chkdist_x = chkdist+1*(Angle*Angle/1800);
					var chkdist_y =-(Angle*Angle/1800)-(chkdist*1);
					
					 

		

			if ((vx>-chkdist_x)&&(vx<chkdist_x)&&(vy>chkdist_y)&&(vy<-chkdist_y))
				ss=3,hit=true;
			else
				{
				chkdist =  sx*mapobjectArray[chk].scale;
				if	((vx>-chkdist*2)&&(vx<chkdist*2)&&(vy>-chkdist/2)&&(vy<chkdist/2))
					ss=4,nearmiss=true;
				}
			if (hit)
				{
				switch(mapobjectArray[chk].type)
					{
					case "Jump":
						//console.log('eh');
						Player.air = true;
					break;
					case "Ice":
						this.ice = true;
					break;
					case "Water":
						this.speed *=0.9;
						new WaterFuzz(5);
						Player.water = true;
					break;
					case "Fence":
						//Move the character back one step, and the Map Offset;
						MapOffY+=(1+this.speed*2)*App.delta_speed;
						this.y -=(1+this.speed*2)*App.delta_speed;
						var hits = this.speed;
						if (vx>0)
							this.angle = -15-hits;
							else 
							if (vx<0)
								this.angle = 15+hits;
								else
								this.angle = -5 + Math.random()*30;
						if (Angle>100)
							Angle = 100;
							else
							if (Angle<-100)
								Angle = -100;
						mapobjectArray[chk].hit=true;
						if (this.speed>0)
							GlassAlpha += 0.5+this.speed/10;
						AngleVel=Angle/2;
						if (this.speed>4)
							this.speed =hits*0.85;
					break;
					case "Speed":
						if (mapobjectArray[chk].speedT>0)
							{
								mapobjectArray[chk].speedT--;
								if (this.speed<20)
									this.speed+=this.accel*2;
								if (this.speed>1)
									GameScore+=this.speed/2;
								if (this.speed>20)
									GameScore+=this.speed*1.1;
							}
							else
								mapobjectArray[chk].alpha -= 0.1*App.delta_speed;
					break;
					case "Tree":
						//Move the character back one step, and the Map Offset;
						//MapOffY+=(2+this.speed*2)*App.delta_speed;
						this.y -=(2+this.speed*2)*App.delta_speed;
						var hits = this.speed;
						if (vx>0)
							this.angle = -(50-hits);
							else if (vx<0)
							this.angle = +(50-hits);
							else
							{
							this.angle = -80 + Math.random()*80;
							if((this.angle>0)&&(this.angle<50))
								this.angle==50;
							if((this.angle<0)&&(this.angle>-50))
								this.angle==-50;
							}
						if (GameMultiplier>1)
							GameMultiplier-=1;
						mapobjectArray[chk].hit=true;
						
						
							
						if (this.speed>4)
							this.speed =hits*0.85;
							
						if (MapOffY<-100)
							if (this.speed>1.5)
								GlassAlpha += 0.1+this.speed/100;

						AngleVel=Angle/2;
						
						
					break;
					case "Orb":
						
						if (mapobjectArray[chk].speedT>0)
							{
								mapobjectArray[chk].speedT--;
								GameScore+=25;
								
							}
							else
							{
								mapobjectArray[chk].alpha = 0.9; 
								mapobjectArray[chk].hit = true;
							}
					break;
					case "Rock":
						//MapOffY+=(1+this.speed*1.5)*App.delta_speed;
						this.y -=(1+this.speed*2)*App.delta_speed;
						var hits = this.speed;
						if (vx>0)
							this.angle = -55;
							else if (vx<0)
							this.angle = 55;
							else
							this.angle = -55 + Math.random()*110;
						//if (Angle>140)
						//	Angle = 140;
						//	else
						//	if (Angle<-140)
						//		Angle = -140;
						mapobjectArray[chk].hit=true;
						if (this.speed>0)
							GlassAlpha += 0.01;
						AngleVel=Angle/1.1;
						if (this.speed>4)
							this.speed =hits*0.75;
						
					break;
					}
				hit = false;
				}
			else 
			{
				if (nearmiss)
				{
				switch(mapobjectArray[chk].type)
					{
					case "Speed":
						if (this.speed<15)
							this.speed+=1;
					break;
					case "Tree":
						if (this.speed>8)
							GameScore+=this.speed/10;
						//if ((chkdist_x>mapobjectArray[chk].collision)||(chkdist_x<-mapobjectArray[chk].collision))
							new Score(10);
					break;
					}
				nearmiss = false;
				}
			}
		}
		//delete chk;
	}
	this.reset();
}

*/



