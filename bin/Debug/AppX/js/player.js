/* 
	snow-master/js/player.js
		
		The player class inherits a game object. 
		
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
		
        this.stop_input = false;
        this.stop_time = 0;
        
		/* Cache */
		
		this.x = 0;
		this.y = 150;
		
		this.angleturn = 0;
		this.angle = 0;
		this.last_angle = this.angle;
		this.current_angle = this.angle;
		
		//Vars from character select this.app.getCurrent().intro.characterselect
		
		this.turning = 0.2+0.01;
		this.accel = 1+0.01;
		
		this.speed = 0.1;
		this.maxspeed = 24;
		this.minspeed = 0.1;
		
		this.offY = 0;
		
		this.gravity = 1;
		MapOffY = 0;
		MapOffX = 0;
		this.scale = 0.8;
                
        this.offx = 0;
        this.offy = 0;
        
        
        
        this.view = 1;
		
		//Jumping Vars
		//	trigger air jumping
		//	
		
		this.airtrigger = false;
		this.air_timeout = 25;
		this.air = false;
		this.air_distance = 10;
		
		//Player effects
		this.effects = [];
		
		for (var i = 0; i<26;i++)
			this.effects.push((this.app.create(Object.create(part_boardSnow)).init(100,100,this.angle)));
        
        
        
		setTimeout   (function(){

            if (!Windows)
		Application.input.init();
        },100);
        
	},
	
	draw:function(){
		
		for (var i = 0; i<26;i++)
			this.effects[i].draw();
		
		this.draw_self();
		
		if (this.app.input.getReleased())
		{
			this.airforce += 2;
			
			if ((this.angle>1.4)||(this.angle<-1.4))
				this.angle*=0.9;
		}
		
		this.targetzoom = 0;
		
	},
	
	draw_self:function(){
	
		/* Cache */
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();
		
		//Vibration
		
		var charCos = Math.cos(this.x/50);
		
		charCos = this.angle*1.25;// - this.air_distance/10;
		
		if ((this.angle>0.4)||(this.angle<-0.4))
			charCos = this.angle*1.45 +(-this.angle* (this.air_distance>5?this.air_distance/5:this.air_distance/10));
		
		var charCosLess = charCos/20;
		
		//Angle
		
		var a =  -charCos * (180/Math.PI);
		
        
        if (this.view==1)
		a = -a;
        
		//Xpositions
		
		var x = this.x;
		var map_x = this.app.getCurrent().game.map.x;
		var x_board =  x + map_x;
		var x_body = a/15+x + map_x;
		var x_head = a/15+x + map_x;
		
		//Ypositions
		
		var y =( this.app.getCurrent().game.map.y - this.y);
		var y_board = (a/250+y)+1;// + (charCos*charCos)*5;
		var y_body = y-2;
		var y_head = (a/30+y)-1;
		
		//Character Scale
		
		var scale =this.air_distance/100+ (this.scale * this.app.getCurrent().game.mapscale);
		var img;
		var w;
		var h;
		
		//Board Shadow
		
		img = this.app.getCurrent().intro.characterselect.boards[9];
		w = img.width/2;
		h = img.height/2;
		scale+=+0.005*Math.cos(this.y);
		this.visuals.image_rotate(img,x_board+this.x/100 + this.air_distance*2,y_board,scale*0.9,a*1 ,0.25,-w,-h,false);
		
		//Board Draw
		
		img = this.app.getCurrent().intro.characterselect.boards[this.app.getCurrent().intro.characterselect.boarderBoardSelect];
		w = img.width/2;
		h = img.height/2;
		this.visuals.image_rotate(img,x_board,y_board,scale,a*1,1,-w,-h,false);
		
		//Body Shadow
		
		img = this.app.getCurrent().game.bshadow;
		w = img.width/2;
		h = img.height/2;
		this.visuals.image_rotate(img,w/4+x_board-a*0.08,-h/4+y_board+a*0.1,scale+0.05*Math.cos(this.y),a*0.45,0.5,-w,-h,false);
		
		//Body Draw
		
		img = this.app.getCurrent().intro.characterselect.boarderBody[this.app.getCurrent().intro.characterselect.boarderBodySelect];
		w = img.width/2;
		h = img.height/2;
		this.visuals.image_rotate(img,x_body,y_body,scale+0.2,a,1,-w,-h,false);
		
		//Head Draw 
		
		img = this.app.getCurrent().intro.characterselect.boarderHead[this.app.getCurrent().intro.characterselect.boarderHeadSelect];
		this.visuals.image_rotate(img,x_head,y_head,scale+0.275,a*0.25,1,-w,-h*5,false);
		
		//Mapscale
		
		//	var s = this.speed;
		//	s = this.app.client.Math.Clamp(s,1,2)/5;
		//	s = 1;
		//	this.app.getCurrent().game.mapscale = 1 -s+ MapOffY/-this.y;
		//	this.app.getCurrent().game.mapscale = (7-this.speed);
			
		//	this.app.getCurrent().game.mapscale = 1 - this.speed/120;
		//	this.app.getCurrent().game.mapscale = this.app.client.Math.Clamp(this.app.getCurrent().game.mapscale,0.5,7)
		
	},
	
	jump:function(){
		
		this.air = true;
		this.air_distance = this.speed*5;
		
	},
	
    //Controls character while in air
    
    update_air:function(){
        
		if (this.air_timeout<1)
		{
			console.log(this.air_timeout);
			this.air_timeout=75;
            
            //used to test 
            //,this.air = false,this.air_distance=this.speed*5;
			//setTimeout(function(){
			//	
			//	//You can trigger this from javascript concsole
			//	Application.getCurrent().game.player.jump();
			//	
			//	},2500);
		}
        
		this.air_timeout--;
		this.air_distance*=0.9;
        
    },
    
	update:function(){
		
		// dimensions
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();	
		
		// temp speed vars to be moved in to this.speed and so on
		
		var speed = 0;
		var speedm = 24;
		
		var ylimit = height*0.2;
		
		// input, -1 left, 1 right; -1 up, 1 down; 0 null;
		
		var xdir =  (this.app.input.getHorizontal().keyboard ||  this.app.input.getHorizontal().touch);
		var ydir =  (this.app.input.getVertical().keyboard ||  this.app.input.getVertical().touch);
			
		var MoveY = 0;
		var MoveX = 0;
        
        //Invert input angle
        
        if (this.view==1)
            xdir=-xdir;
        
		//First Var Update
		
		this.current_angle = ((this.last_angle - this.angle));
		
		this.last_angle = this.angle;
		
		this.angleturn = this.app.input.getHorizontal();
		
		this.angle-=(xdir*this.turning/2.33)*this.app.getDelta();
		
        //if (xdir<0)
        //    if (this.angle<0)
        //        this.angle*=0.95    ;
        //if (xdir>0)
        //    if (this.angle>0)
        //        this.angle*=0.95    ;
        
		for (var i = 0; i<26;i++)
			this.effects[i].update();
		
		//Air Update
            //is in air if timeout>0
            //	commented out is a timeout to test jump
            //	
            //always reduce airtimeout
            //aird is distance frmo ground
		
        this.update_air();
        
        
        
		// Amount of angle adjustment
		//  a^2/2 = always positive 
		
		var adjust = (this.angle*this.angle)*0.05;
		
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
        
		//if (this.app.input.getPressed())
			if (ydir<0)
				if (this.app.input.dist.y<-150*this.app.getScale())
					this.angle-=(this.angle*this.turning)*ydir;

		//Angle Limiter
        
		this.angle =  this.app.client.Math.Clamp(this.angle,-1.5,1.5) *1.01;
        
		//X  - horizontal movement, 
		var xmov = Math.cos(this.speed/360+10)*-6 + this.accel + this.turning;
        
		if ((this.angle<-0.15))
				MoveX = xmov*(-this.angle*this.turning),    this.offy-=0,this.angle*=1.01;
			else
		if ((this.angle>0.15))
				MoveX = xmov*(-this.angle*this.turning),    this.offy-=0,this.angle*=1.01;
			else
				MoveX = ((this.angle)*this.turning),this.angle*=0.9;
		

        
		// if angle is too wide, but not that wide, decrease angle, speed up
	
		
		if ((this.angle>-0.75)||(this.angle<-0.75))
			this.angle*=0.999,MoveX*=3.75;this.offy-=this.speed;//,this.speed*=0.99;
		
		// if angle is too wider, and too wide, decrease angle, slow down, decrease Y, decrease map speed
		
		if ((this.angle>1.5)||(this.angle<-1.5))
		{
			
			this.angle*=0.999;
			
            //MoveX*=0.75;
            MoveX*=1.1;
			
            MoveY-=3*(1-this.speed/12);
			
            this.speed/=this.accel;
			
            this.offy-=this.speed/10;
			
            //,this.y-=0.1*this.speed;
			
		}
		
		
		
		
		
		
		
		//Unused

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
						//			this.app.getCurrent().game.mapscale =this.air_distance/20;//,this.speed-=0.0005;
						//	
						//	if( (adjust>0.012)||
						//	   (adjust<-0.012))
						//			this.app.getCurrent().game.mapscale +=0.25*adjust/100,this.speed*=0.995,this.speed-=adjust/100;
						//	//if( (adjust<0.01)&&
						//	// (adjust>-0.01))
						//	//	this.app.getCurrent().game.mapscale *=1.101;
						////	if (this.app.getCurrent().game.mapscale<1.5)
						////			this.app.getCurrent().game.mapscale +=0.0011;
		
		
		
		
		
		
		
		//Scale Clamp
		
		this.app.getCurrent().game.mapscale = this.app.client.Math.Clamp(this.app.getCurrent().game.mapscale,1,2);
		
		
		//MoveY by speed
		
        if (MoveY<0)
            MoveY*=0.1;
        
		MoveY+=this.speed;
		
		//this.y +=MoveY;//this.speed * App.delta_speed - (this.drag)* App.delta_speed;
		//MoveY is supposed to be negative MapOffY and the difference between the two is the camera offset or some sort
				var offy = 0;
		
		offy = 10;
        this.offy += MoveY*0.75;
        
        this.offy*=0.9;
        
		this.y = -MapOffY;
		MapOffY-=MoveY;
		
        //offy = MoveY*0.1;
        
       var offx = -MapOffX*1.5;
       var offx = -this.x;
       this.view = 1;
       
     // if (this.view==0)
    //     offx = 0;
		
        
        //var offx = -this.x; 
        
		
		//MapX and MapY
		
		
		
		
		
		//this.x = this.app.getCurrent().game.map.x*0.19;
		//this.x +=MoveX;
		this.x =-MapOffX;
		
		MapOffX-=MoveX;//*2.5;
        
        
        this.offx += MoveX*1.75;
        
        this.offx*=0.9;
        
        
        
        var mapx = MapOffX + (width*0.5+this.offx);//(-MapOffX+(width*0.5) + offx) ;
        mapx = this.app.client.Math.Clamp(mapx, -width/this.app.getScale() ,width/this.app.getScale());
        
		this.app.getCurrent().game.map.x = mapx;
        
        
        
        
        
		this.app.getCurrent().game.map.y = -MapOffY+(height*0.25)+this.offy;
        
        
		
		var w = 0.5*this.app.getWidth()/2*this.app.getScale()*this.app.getCurrent().game.mapscale;
		
		
		
		
		


		//Unused
									//this.app.getCurrent().game.map.x =this.app.getCurrent().game.mapscale;
									//this.app.getCurrent().game.map.y =this.app.getCurrent().game.mapscale;
									//this.app.getCurrent().game.map.yoff = -MoveY/100;
									//this.app.getCurrent().game.map.yoff *=0.9;

									var diff = Math.round((MapOffY + this.y)/this.app.getHeight());
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




									//	MapOffX=this.app.client.Math.Clamp(MapOffX,-w,w);
		
		
		//The Rest to the return is the side colliding. 
		
		
		var d = this.x/200; 
		
		var l = 80;
		var leftx = this.x-l;
		
		
		
		
		
		
//		Exploding 
		
               //    if (this.angle>0.45)
               //        this.angle-=this.x;
               //    if (this.angle<-0.45)
               //        this.angle-=this.x;
		
		
		
		
		
		if (leftx<-width)
		{
            
            if (this.stop_input)
            {
                
                
                this.stop_time--;
                if (this.stop_time<=0)
                    this.stop_input = false,this.angle = -1.5,MoveX=4;
                
            }
           // else
              //  this.angle-=0.5;
            
            if (leftx<-width*1.75)
                if (this.angle>0.1)
                {
                
//                    this.angle-=0.15;
                    
                    
            if (!this.stop_input)
                 this.angle=-1.5;
                
                
                    if (this.angle>0.1)
                        this.angle+=(leftx-(-width*1.75))/360;
                    
                        
                    if (leftx>-width*2.5)
                    if (this.angle>0.499){
                        this.angle-=(leftx-(-width*1.75))/10,this.offy-=5;
                        
                        
                        this.stop_input = true;
                        if (this.stop_time == 0)
                            this.stop_time = 30;
                    }
                    this.speed*=0.9;
                    
                    
                
                }
                    
            if (leftx<-width*1.2)
                if (this.angle>0)
                    if (this.app.input.getPressed())
                    this.speed*=1.01;
            
            if (leftx<-width)
                if (this.angle>-0.1)
                this.angle-=0.05;
            
			
        //    if (this.angle>-0.15)
           // this.angle-=0.1;
			//this.angle -= d/8;
			//this.speed*=0.9;
		//if(this.angle<0.5)
			//this.angle-=d,this.speed*=1.05;
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
		}else
            
        {
	//	this.stop_input = false;
            
            
        }
		return;
		
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
		
		//if (this.current_angle<0)
		//	this.current_angle =-this.current_angle;
//		if (ylimit>100)
//			this.y-=(((this.current_angle/4)*(speed/speedm)/20))*this.app.getScale()*this.app.getDelta();
		
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
		
		
		
			this.angle-=xdir*(this.turning)*this.app.getDelta();
		
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
	
	},
	
	checkTrees:function (x,y)	{
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
};