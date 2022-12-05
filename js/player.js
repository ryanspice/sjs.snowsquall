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
        
        this.hit = false;
        
		/* Cache */
		
		this.x = 0;
		this.y = 150;
        
		
		this.angleturn = 0;
		this.angle = 0;
		this.last_angle = this.angle;
		this.current_angle = this.angle;
		
		//Vars from character select this.app.getCurrent().intro.characterselect
		
		this.turning = 0.2+0.02;
		this.accel = 1+0.01;
		
		this.speed = 0.1;
		this.maxspeed = 25;
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
		  Application.input.init(null);
        },100);
        
	},
	draw_effects:function(){
        
		for (var i = 0; i<26;i++)
			this.effects[i].draw();
        
    },
	draw:function(){
		
		
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
		
		charCos = this.angle*1.15;// - this.air_distance/10;
		
		if ((this.angle>0.4))
			charCos = this.angle*1.015 +(-this.angle* (this.air_distance>5?this.air_distance/6:this.air_distance/10));
        
		if ((this.angle<-0.4))
			charCos = this.angle*1.015 +(-this.angle* (this.air_distance>5?this.air_distance/6:this.air_distance/10));
		
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
		this.visuals.image_rotate(img,x_body,y_body,scale+0.2,a*0.8,1,-w,-h,false);
		
		//Head Draw 
		
		img = this.app.getCurrent().intro.characterselect.boarderHead[this.app.getCurrent().intro.characterselect.boarderHeadSelect];
		this.visuals.image_rotate(img,x_head,y_head,scale+0.275,a*0.25,1,-w,-h*5,false);
		
		//Mapscale
		
		//	var s = this.speed;
//			s = this.app.client.Math.Clamp(s,1,2);
		//	s = 1;
		//	this.app.getCurrent().game.mapscale = 1 -s+ MapOffY/-this.y;
		//	this.app.getCurrent().game.mapscale = (7-this.speed);
			
		//	this.app.getCurrent().game.mapscale = this.offy*2;
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
		
        if (!this.hit)
		this.angleturn = this.app.input.getHorizontal();
		
        
        if (!this.hit)
		this.angle-=(xdir*this.turning/2.33);//*this.app.getDelta();
		
        
        if (xdir<0)
            if (this.angle<0)
                this.angle*=0.95    ;
        if (xdir>0)
            if (this.angle>0)
                this.angle*=0.95    ;
        
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
			this.speed+=(this.accel/3.14)*(0.10756-adjust*2);
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
        
		this.angle =  this.app.client.Math.Clamp(this.angle,-1.5,1.5);// *1.01;

        
		//X  - horizontal movement, 
        
		var xmov = Math.cos(this.speed/360+10)*-6 + this.accel + this.turning;
		xmov = (((this.speed+this.turning)/this.maxspeed)*(50*this.turning)) + this.accel + this.turning;
        
        
        
		if ((this.angle<-0.15))
				MoveX = xmov*(-this.angle*this.turning),this.angle*=1.01;
			else
		if ((this.angle>0.15))
				MoveX = xmov*(-this.angle*this.turning),this.angle*=1.01;
			else
				MoveX = ((this.angle)*this.turning),this.angle*=0.9;
        
        // Move Camera Offset Y
        
        this.offy-=(this.speed/this.maxspeed)*28;
        
        this.offy*=0.9;
        
		// if angle is too wide, but not that wide, decrease angle, speed up
	
		
		if ((this.angle>-0.65)||(this.angle<-0.65))
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
			
			
		}
		

		


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
        
        
        
        var mapx = MapOffX + ((width*0.5)+this.offx);//(-MapOffX+(width*0.5) + offx) ;
        mapx = this.app.client.Math.Clamp(mapx, -width/this.app.getScale() ,1.5*width/this.app.getScale());
        
		this.app.getCurrent().game.map.x = mapx;
        
        
        
        
        
		this.app.getCurrent().game.map.y = -MapOffY+(height*0.25)+this.offy;
        
        
		
		var w = 0.5*this.app.getWidth()/2*this.app.getScale()*this.app.getCurrent().game.mapscale;
		
		
		
		
		//Scale Clamp
        

									var diff = Math.round((MapOffY + this.y)/this.app.getHeight());
									var ya = 250;



		var d = this.x/200; 
		
		var l = 0;
		var leftx = this.x-l;

		
//		Exploding 
		
               //    if (this.angle>0.45)
               //        this.angle-=this.x;
               //    if (this.angle<-0.45)
               //        this.angle-=this.x;

		if (leftx<-width*1.1)
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
                 this.angle=0.1;
                    else
                 this.angle*=0.9999;
                
                
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
                    this.speed*=1.001;
            
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
		

		return;
	
	},
	checkHits:function(type,mapo){
        
      
				switch(type)
				{
					case "Jump":
						//console.log('eh');
						//Player.air = true;
					break;
					case "Ice":
						//this.ice = true;
					break;
					case "Water":
						//this.speed *=0.9;
						//new WaterFuzz(5);
						//Player.water = true;
					break;
					case "Fence":
						//Move the character back one step, and the Map Offset;
					//	MapOffY+=(1+this.speed*2)*App.delta_speed;
					//	this.y -=(1+this.speed*2)*App.delta_speed;
					//	var hits = this.speed;
					//	if (vx>0)
					//		this.angle = -15-hits;
					//		else 
					//		if (vx<0)
					//			this.angle = 15+hits;
					//			else
					//			this.angle = -5 + Math.random()*30;
					//	if (Angle>100)
					//		Angle = 100;
					//		else
					//		if (Angle<-100)
					//			Angle = -100;
					//	mapobjectArray[chk].hit=true;
					//	if (this.speed>0)
					//		GlassAlpha += 0.5+this.speed/10;
					//	AngleVel=Angle/2;
					//	if (this.speed>4)
					//		this.speed =hits*0.85;
					break;
					case "Speed":
					//	if (mapobjectArray[chk].speedT>0)
					//		{
					//			mapobjectArray[chk].speedT--;
					//			if (this.speed<20)
					//				this.speed+=this.accel*2;
					//			if (this.speed>1)
					//				GameScore+=this.speed/2;
					//			if (this.speed>20)
					//				GameScore+=this.speed*1.1;
					//		}
					//		else
					//			mapobjectArray[chk].alpha -= 0.1*App.delta_speed;
					break;
					case "Tree":
						//Move the character back one step, and the Map Offset;
						//MapOffY+=(2+this.speed*2)*App.delta_speed;
					//	this.y -=(2+this.speed*2)*App.delta_speed;
					//	var hits = this.speed;
					//	if (vx>0)
					//		this.angle = -(50-hits);
					//		else if (vx<0)
					//		this.angle = +(50-hits);
					//		else
					//		{
					//		this.angle = -80 + Math.random()*80;
					//		if((this.angle>0)&&(this.angle<50))
					//			this.angle==50;
					//		if((this.angle<0)&&(this.angle>-50))
					//			this.angle==-50;
					//		}
					//	if (GameMultiplier>1)
					//		GameMultiplier-=1;
					//	mapobjectArray[chk].hit=true;
					//	
					//	
					//		
					//	if (this.speed>4)
					//		this.speed =hits*0.85;
					//		
					//	if (MapOffY<-100)
					//		if (this.speed>1.5)
					//			GlassAlpha += 0.1+this.speed/100;
//
					//	AngleVel=Angle/2;
						
						
					break;
					case "Orb":
						
					//	if (mapobjectArray[chk].speedT>0)
					//		{
					//			mapobjectArray[chk].speedT--;
					//			GameScore+=25;
					//			
					//		}
					//		else
					//		{
					//			mapobjectArray[chk].alpha = 0.9; 
					//			mapobjectArray[chk].hit = true;
					//		}
					break;
					case "Rock":
						//MapOffY+=(1+this.speed*1.5)*App.delta_speed;
				//		this.y -=(1+this.speed*2)*App.delta_speed;
				//		var hits = this.speed;
				//		if (vx>0)
				//			this.angle = -55;
				//			else if (vx<0)
				//			this.angle = 55;
				//			else
				//			this.angle = -55 + Math.random()*110;
				//		//if (Angle>140)
				//		//	Angle = 140;
				//		//	else
				//		//	if (Angle<-140)
				//		//		Angle = -140;
				//		mapobjectArray[chk].hit=true;
				//		if (this.speed>0)
				//			GlassAlpha += 0.01;
				//		AngleVel=Angle/1.1;
				//		if (this.speed>4)
				//			this.speed =hits*0.75;
						
					break;
					}
				  
        
    },
	checkTrees:function (x,y)	{
        
        var player_dx = null;
        var player_dy = null;
        var x = null;
        var y = null;
        var obj = null;
        var collision = 15;
        var collisionDamage = 0;
        var b, by;

		var hitx = 0;
        this.hit = false;
        
        for (var i = mapobjectArray.length-1; i>0; --i)
        {
            obj = mapobjectArray[i];
            collision = obj.collision;
            x = obj.x + getMapPos().x;
            y = obj.y + -getMapPos().y;
            
            b = ((Math.pow((-this.x) + obj.x,2)));
            by = ((Math.pow((y-(-this.y+10+getMapPos().y)),2)));
            
            player_dx = (obj.x-this.x-5);
            player_dy = (y-(-this.y+10+getMapPos().y));
            
            if (obj.checked)
                continue;
            
            b = Math.sqrt(b);
            by = Math.sqrt(by);
            
            if (b<collision)
            if (by<collision*1.5)
                this.hit = true;
            
            collisionDamage = this.hit;
            
            if (collisionDamage)
                {
                    
                    hitx = player_dx;
                    this.hit = false;
                   
                    switch(obj.type)
                    {
                        case "Snowman":
                            obj.del = true;
                            this.speed/=2;
                        break;
                        case "Ice":
                            this.hit = true;
                            
                            if (this.angle<1)
                            if (this.angle>-1)
                                this.angle+=-0.015+Math.random()*0.03;
                                
                            
                            this.speed*=1.001;

                        break;
                        case "Log":
                             this.angle+=0.1*(this.app.client.Math.Clamp(b,-1,1)*this.app.client.Math.Clamp(obj.x-this.x,-1,1));
                            //console.log('eh');
                            //Player.air = true;
                        break;
                            
                        case "Tree":
                             this.angle+=this.app.client.Math.Clamp(b,-1,1)*this.app.client.Math.Clamp(obj.x-this.x,-1,1);
                            //console.log('eh');
                            //Player.air = true;
                        break;
                        case "Jump":
                            this.jump();
                            //console.log('eh');
                            //Player.air = true;
                        break;
                        case "Speed":
                            this.speed*=1.05;
                        break;
                        case "Flag":
                            this.speed*=0.995;
                            obj.frame = 11;
                            obj.framed = 0;
                        break;
                    }
                    this.checkHits(obj.type,obj);
                }
            
            continue;
        }
        
        
        return;
        
			
				if (nearmiss)
				{
				switch(mapobjectArray[chk].type)
					{
					case "Ice":
						this.hit = true;
                        this.angle*=0.11;
                            
					break;
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
			
		
		//delete chk;
	}
};