
TimeMultiplier = 1;
window.onkeypress= function(){Game_.start();}
treegeneratecount = 0;
treegenerateClearWave = function()
{
mapobjectArray = new Array();
}
treegenerateWave2 = function()
{
	new map_ice(App.w/2,800);  
	new map_ice(App.w/2.2,900);
	new map_water(App.w/2.4,1100);
	new map_jump(App.w/2.4,2100);
}
treegenerateWave1 = function()
{
	for(var i = 15;i>0;--i)
	{
		new map_tree3(0-(1*i*i)+Math.random()*50-50,55*i,true,true);
		new map_tree3(App.w+(1*i*i)+Math.random()*50-50,55*i,true,true);
		
		//new map_orb(App.w/2,500+55*i);
	}
	//new map_tree3(1,Player.y+25);
	//new map_speed(-70,330);
	
}
treegenerateWave0 = function()
{
	//new map_fence(-App.w/2,App.h+100);
	//new map_fence(-App.w/2,App.h+300);
	////new map_fence(-App.w/2,App.h+500);
	////new map_fence(-App.w/2,App.h+700);
	//new map_fence(-App.w/2,App.h+900);
	//new map_fence(-App.w/2,App.h+1100);
	//new map_fence(-App.w/2,App.h+1300);
	//new map_fence(-App.w/2,App.h+1500);
	//
	//
	//new map_fence(App.w+App.w/2,App.h+100);
	//new map_fence(App.w+App.w/2,App.h+300);
	//new map_fence(App.w+App.w/2,App.h+500);
	//new map_fence(App.w+App.w/2,App.h+700);
	//new map_fence(App.w+App.w/2,App.h+900);
	//new map_fence(App.w+App.w/2,App.h+1100);
	//new map_fence(App.w+App.w/2,App.h+1300);
	//new map_fence(App.w+App.w/2,App.h+1500);
	
	
	//new map_tree(0,App.h/2);
	//new map_tree(0+25,App.h/2 + 300);
	//new map_tree(0+50,App.h/2 + 600);
	//new map_tree(0+75,App.h/2 + 800);
	//new map_tree(0,App.h/2 + 0);
	//new map_tree2(25,App.h/2 + 0);
	//new map_tree2(35,App.h/2 + 0);
	//new map_tree2(45,App.h/2 + 0);
	//new map_tree2(55,App.h/2 + 0);
	//new map_tree2(65,App.h/2 + 0);
}

/*

treegenerate = function()
{

if (!treeinit)
	{
	treegeneratecount = 0;
	treegenerateWave1();
	//if (GameScore>100)
		//treegenerateClearWave();
		treegenerateWave2();
						treeinit = true;
						return;
	}
	else
	{
	if (treegeneratecount<MapTime)
		{
		new map_tree2(Player.x,Player.y+App.h*2);
		treegeneratecount++;
		}
	
	}
////
//TREE GENERATION
////
	// 'TreeLimiter': Float, used as Multiplier.
	// Map objects: new object(x,y);
	// Player is global, Player.speed, Player.speedm, Player.x, Player.y
	// App.setWidth == App.w;
	// App.setHeight == App.h;
	// MapOffX is the offset of the character from the starting position.
	
		var rand = Math.random()*App.setWidth*1.5;
		rand -= Math.random()*App.setWidth*1.5;
		
		
		GameTime++;
		if (GameTime<120)
			return;
			
		//var leng = mapobjectArray.length;
		//if (leng<25*TreeLimiter + (GameTime/480))
		//	{
		//	new map_tree(rand,App.h*2 + Math.random()*400);
		//	}
		
		//if (Math.random()*10*App.delta_speed>9.5*App.delta_speed)
		//		if (Player.speed>1)
		//			if (mapobjectArray.length<50*TreeLimiter)
		//				if(!Pause)
		//				{
        //
		//				//new map_fence(-App.w/2,App.h*1.3);
		//				//
		//				//if (GameScore<25)
		//				//{
		//						if (Math.random()*10<0.8)
		//							new map_tree(rand,App.h*2 + Math.random()*400);
		//				//			
		//				//			
		//				//			
		//				//}
		//				//else
		//				//if (GameScore<50)
		//				//{
		//				//		if (Math.random()*10<1.8)
		//				//			new map_orb(Math.random()*rand,App.h*1.2); 
		//				//		if (Math.random()*10<9.8)
		//				//			new map_tree(rand,App.h*1.3);
		//				//}
		//				//else
		//				//if (GameScore<100)
		//				//{
		//				//	new map_speed(Math.random()*rand,App.h*1.2); 
		//				//}
		//				//else
		//				//if (GameScore<250)
		//				//{
		//				//		new map_speed(Math.random()*rand,App.h*1.2); 
		//				//		new map_tree(rand,App.h*1.3);
		//				//}
		//				//else
		//				//if (GameScore<550)
		//				//{
		//				//		new map_tree(MapOffX,App.h*1.3);
		//				//		new map_tree(Math.random()*rand,App.h*1.3);
		//				//	
		//				//		if (Math.random()*10<1.8)
		//				//			new map_orb(Math.random()*rand,App.h*1.2); 
		//				//}
		//				//
		//				//if (MapOffX>700)
		//				//	if (Math.random()*10<9.5)
		//				//		new map_cliff(700,App.h/1.3);
		//				//else
		//				//if (MapOffX<-700)
		//				//	if (Math.random()*10<9.5)
		//				//		new map_cliff(-700,App.h/1.3);
		//				//		
		//				//		
		//				//if (Player.speed>23.5)
		//				//	TreeLimiter = 1.2;
		//				}
////
//TREE GENERATION END
////
}



					/////////* MAING GAME HUD
					GameScore = Math.round(GameScore);
					var n = GameScore.toString();
					var le = n.length;
						for (var l = 0; l<=le;++l)
							{
							
							var number = n.charAt(l);
							if (number>9)
								number = 0;
								try{
							App.visuals.image(GraphicsController.getImage('Sc'+number),(-50*le)+App.setWidth*0.9+(75*l),App.setHeight*0.1,0.5,1,true);}
								catch(e){}
							}
					PSpeed = Math.round(Player.speed);
					var n = PSpeed.toString();
					var le = n.length;
						for (var l = 0; l<le;++l)
							{
							
							var number = n.charAt(l);
							if (number>9)
								number = 0;
								try{
							App.visuals.image(GraphicsController.getImage('Sc'+number),(-25*le)+App.setWidth*0.1+(50*l),App.setHeight*0.04,0.6,1,true);}
								catch(e){}
							}
					App.visuals.image(GraphicsController.getImage('Sc'+speedStar),  +App.setWidth*0.03,App.setHeight*0.10,0.5,1,true);
					App.visuals.image(GraphicsController.getImage('Sc'+turningStar),+App.setWidth*0.03,App.setHeight*0.15,0.5,1,true);
					App.visuals.image(GraphicsController.getImage('Sc'+accelStar)  ,+App.setWidth*0.03,App.setHeight*0.2,0.5,1,true);
					
					for (var o = GameMultiplier;o>0;--o)
					{
					App.visuals.image(imgOrbArray[2] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[3] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[0] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[4] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[5] ,+App.w*0.1,+32 * o + 45,1,1,true);
					}
					
					//////////ENDMAINGAMEHUD
					}
					//App.visuals.text(Math.round(GameScore),App.setWidth*0.8,60,1,25,1,true);
				App.visuals.image(this.imgGlass,0,0,0.5,GlassAlpha*0.3,true);
				App.visuals.image(this.imgGlass,App.w,App.h/4,0.25,GlassAlpha*0.1,true);
				App.visuals.image(this.imgGlass,App.w/2,App.h*1.1,0.35,GlassAlpha*0.9,true);
				
				App.visuals.text(Math.round(GameTime/60), 15,45,25,1,true);
				App.visuals.text(Math.round(mapobjectArray.length), 15,85,25,1,true);
				App.visuals.text(Math.round(MapTime), 15,125,25,1,true);
				App.visuals.text(Math.round(GameMultiplier), 15,165,25,1,true);
				App.visuals.text(Math.round(MapScore/10), 15,205,25,1,true);



				
				
				
				
				
				
				
				
				
				
				
				
				
				App.visuals.image(GMBottom3,App.w/2,App.h/1.5,0.5,0.2,true);	
				
				App.visuals.image_button(GMBottom,App.setWidth/2,35,2,function(){Pause=!Pause;});	
				App.visuals.image(GMBottom2,App.setWidth/2,App.setHeight-35,2,1,true);	
				
				
					
				if (GameOverEvent)
				{

				}
				//else
				//	App.twitter.hidden = true;

			}
			this._Pause = function()
			{
				if (this.Pause)
					{
						App.visuals._color("#000000");
						App.visuals.rect(-App.setWidth,0, App.setWidth*3,App.setHeight,1,0.5,false);
						
						var posPlaceX = PagePos*2/App.scale+App.setWidth/2;
						var posPlaceY = PagePosY*1.2+(PagePos*0.031*-PagePos*0.031);
						App.visuals.image(GraphicsController.getImage('logo'), posPlaceX,200,1,1,true);
						App.visuals.image(GameMenuPause, posPlaceX,posPlaceY+400,1,1,true);
						App.visuals.image(GameMenuSettings, posPlaceX,posPlaceY+600,1,1,true);
						App.visuals.image(GameMenuReturn, posPlaceX,posPlaceY+1200,1,1,true);
					}
				return true;
			}
			this._GameOver = function()
			{
				GameOverEvent = true;
				GameOverDim +=0.002*App.delta_speed;
				if (GameOverDim>0.5)
					GameOverDim = 0.5;

				App.visuals.image(GraphicsController.getImage('arcadeScore'), App.setWidth/2,App.setHeight*0.40,1,1,true);	
				App.visuals.image_button(GraphicsController.getImage('startplaynow'), App.setWidth/2,App.setHeight*0.7,1,function(){App.set_state(Custom_,true);});	
				App.visuals.image_button(GraphicsController.getImage('arcadeBack'),App.setWidth/1.5,App.setHeight*0.9,1,function(){Player.del = true; App.set_state(Menu_,true);});	
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
			}
			this._GameOverEvent = function()
				{
									
					//App.twitter.hidden = false;
					//App.twitter.style.left = App.setWidth/2 + "px";
					//App.twitter.style.top = App.setHeight*0.6 + "px";
					GameOverEvent = false;
					try {
					var old = readCookie('score') || createCookie('score',GameOverScore,25600);
					OldScore = old;
					
					YourScore = readCookie('score') || 0;
					YourScore = YourScore.toString();
					if (old>YourScore)
						{
						NewScore = true;
						
						}
					}
					catch(e){YourScore = "000";}
				}
				
}
*/
var Game = Object.create(null);
Game.prototype = {
	
	init:function(){
	
		window.onBlur = function () { Pause = true; }
		treeinit = false;
		StartDelay = 100;
		Started = false;
		particlesand = new Array();
		TreeSway = 0;
		TreeSwayAmount =0.75;
		MapSpeed = 0;
		MapSpeedVel = 0.1;
		MapOffX = 0;
		MapOffY = 0;
		Angle = 0;
		AngleVel = 0;
		GameScore = 0;
		GameScoreCounter = 0;
		GameScoreCounterMax = 120;
		Pause = false;
		GameOver = false;
		GameOverScore = 0;
		GameOverEvent = false;
		NewScore = 0;
		OldScore = 0;
		GameMultiplier = 1;
		
		this.mapscale = 1;
		this.main_snow = this.graphics.load('textures/main_snow');
		this.main_mountian = this.graphics.load('textures/main_mountian');
		this.main_mountianl = this.graphics.load('textures/main_mountianl');
		
		
		this.bshadow = this.graphics.load('character/bshadow');
		
		(this.gameover = this.app.create(Gameover.prototype)).init();
		
		(this.player = this.app.create(Player.prototype)).init();
		
		this.map = {x:0};
		this.map.x = 0;
		this.map.y = 0;
		this.map.yoff = 0;
		return;
		/*
		GameTime = 0;
		imgOrbArray = new Array();
		imgOrbArray[0] = GraphicsController.load('gameplay/orb/orb_1')
		imgOrbArray[1] = GraphicsController.load('gameplay/orb/orb_2')
		imgOrbArray[2] = GraphicsController.load('gameplay/orb/orb_3')
		imgOrbArray[3] = GraphicsController.load('gameplay/orb/orb_4')
		imgOrbArray[4] = GraphicsController.load('gameplay/orb/orb_5')
		imgOrbArray[5] = GraphicsController.load('gameplay/orb/orb_6')
		
		
		this.imgGlass = GraphicsController.load('overlay/glass');
		GameOverEvent = false;
		GameOver = false;
		GameTime = 0;
		StartDelay = 100;
		Started = false;
		particlesand = new Array();
		TreeSway = 0;
		TreeSwayAmount =0.75;
		mapobjectArray = new Array();
		TreeLimiter = 1;
		MapSpeed = 0;
		MapSpeedVel = 0.1;
		MapOffX = 0;
		MapOffY = 0;
		Angle = 0;
		AngleVel = 0;
		GameScoreCounter = 0;
		if (!App.mute)
			SoundtrackGo(0);
		GameScore = 0;
		GameOverScore = 0;
		GameOver = false;
		
		
		
		GraphicsController.load('interface/record');
		GraphicsController.load('interface/oldrecord');
		
		
		GraphicsController.load('gameplay/gamemenu/barbottom');
		GraphicsController.load('gameplay/gamemenu/barbottom2');
		GraphicsController.load('gameplay/gamemenu/barshade');
		GraphicsController.load('gameplay/gamemenu/paused');
		GraphicsController.load('gameplay/gamemenu/return');
		GraphicsController.load('gameplay/gamemenu/settings');
		
		GameMenuPause = GraphicsController.getImage('GameMenuPause');
		GameMenuReturn = GraphicsController.getImage('GameMenuReturn');
		GameMenuSettings = GraphicsController.getImage('GameMenuSettings');
		GMBottom = GraphicsController.getImage('gmbottom');
		GMBottom2 = GraphicsController.getImage('gmbottom2');
		GMBottom3 = GraphicsController.getImage('gmbottom3');
		recordOld = GraphicsController.getImage('recordOld');
		recordNew = GraphicsController.getImage('recordNew');
		
		
		BackgroundImage = GraphicsController.load('texture1','back5');
		MountianSideL = GraphicsController.load('MountianSideL','gameplay/snowMountianLL');
		GlassImage = GraphicsController.getImage('glass');
		GlassImage2 = GraphicsController.getImage('glass2');
		GlassAlpha = 0.000000001;
		GameOverDim = 0;
		MapTime = 0;
		MapScore = 0;
		
		this._NewPlayer();
		treegenerate();
		GameScore = 0;
			
		*/
		
	},
	
	update:function(){
	
		this.player.update();
		
		return true;
		if (!Pause)
		{
			if ((!GameOver))
			{
				MapTime = -MapOffY/1152;
				MapScore += MapTime * GameMultiplier;
				if ((!GameOver)&&(!INPUT_up))
				{
					if ((INPUT_dirX<0))
					{
						AngleVel += 35;
					}
					else
					if ((INPUT_dirX<0))
					{
						AngleVel -= 35;
					}
				}
			}
			else
			{
			if(!INPUT_up)
				console.log
			}

			Angle+=((AngleVel*0.9)/App.scale)*App.delta_speed;
			AngleVel*=0.9;
			Angle*=0.95  ;
			BackgroundW = BackgroundImage.width;
			BackgroundH = BackgroundImage.height;
			var Vel = ((Player.speed/Player.speedm));
			var A = ((20)*Vel);
			if (A>A*1.25)
				A = A*1.25;
				
			if (Angle<-A)
				Angle = -A;
				else
			if (Angle>A)
				Angle = +A;
			if (AngleVel>2.5)
				AngleVel = 2.5;
				else
			if (AngleVel<-2.5)
				AngleVel = -2.5;
			if (Player.speed>1)
				{
				GameScoreCounter+=1*App.delta_speed;
				if (GameScoreCounter>GameScoreCounterMax)
					{
					GameScore+=Player.speed;
					GameScoreCounter = 0;
					}
				treegenerate();
				}
			if ((GlassAlpha>0.9)&&(!GameOver))
				{
				GameOver = true;
				GameOverScore = GameScore;
				}
		}
		this.draw();	
		this.updateObj();
		
		
	},
	
	draw:function(){
		
		var y = new Date().getTime()/10;
		
		var width = this.app.getWidth();
		var height = this.app.getHeight();
		
		
		var mapoffx =  0; 
		this.pl = 1;
		
	//	if (this.app.getScaledHeight()>this.app.getScaledWidth())
	//		this.mapscale = 0.7;
		
		var m = this.mapscale;// + 0.5*Math.cos(this.map.x/360);
		
		this.mountian_pos =(-width/2);//+this.main_mountian.width/2;
		
		
		this.mountian_pos2 =width*2.75;
		
	//	this.map.x = MapOffX*2.9;
	//	this.map.x = MapOffX+(width/2*this.app.getCurrent().game.mapscale);
		
		this.visuals.texture(this.main_snow,this.map.x,this.map.y, width, height,this.pl,0,0,0,0,m);
		
		//this.visuals.texture(this.main_mountianl,MapOffX*0.9,-MapOffY, 0, height,this.pl,0,true,this.mountian_pos,97,m);
		//this.visuals.texture(this.main_mountian,MapOffX*0.9,-MapOffY, 0, height,this.pl,0,true,this.mountian_pos2,97,m);
		
		
		this.visuals.texture(this.main_mountianl,this.map.x,this.map.y, 0, height,this.pl,0,true,(this.mountian_pos),0,m);
		this.visuals.texture(this.main_mountian,this.map.x,this.map.y, 0, height,this.pl,0,true,(this.mountian_pos2),0,m);
		
		this.player.draw();
		
		//this.gameover.draw();
		
		//this.visuals.texture(this.main_mountian,mapoffx,y, width, height,this.pl,0,true,this.mountian_pos2,97);
		
		///Here 
		this.visuals.text(this.app.getFps().toFixed(2),35,35,"#000000");
		this.visuals.text(this.player.speed.toFixed(2),35,65,"#000000");
		this.visuals.text((width/2+MapOffX+this.player.x).toFixed(2),35,95,"#000000");
	//	this.visuals.text(this.map.y.toFixed(2),35,125,"#000000");
	//	this.visuals.text(m.toFixed(5),35,155,"#000000");
	//	this.visuals.text(this.mapscale.toFixed(5),35,185,"#000000");
		return true;
	

				Player.update(Angle);
				
				App.visuals._color("#000000");
				
				
				this.drawMapObjects();
				SnowParticleLoop();
				if (GameOver)
					{
					this._GameOver();
					}
				else
					if (Pause)
					{
					this._Pause();
					}
				else
					{
					/////////* MAING GAME HUD
					GameScore = Math.round(GameScore);
					var n = GameScore.toString();
					var le = n.length;
						for (var l = 0; l<=le;++l)
							{
							
							var number = n.charAt(l);
							if (number>9)
								number = 0;
								try{
							App.visuals.image(GraphicsController.getImage('Sc'+number),(-50*le)+App.setWidth*0.9+(75*l),App.setHeight*0.1,0.5,1,true);}
								catch(e){}
							}
					PSpeed = Math.round(Player.speed);
					var n = PSpeed.toString();
					var le = n.length;
						for (var l = 0; l<le;++l)
							{
							
							var number = n.charAt(l);
							if (number>9)
								number = 0;
								try{
							App.visuals.image(GraphicsController.getImage('Sc'+number),(-25*le)+App.setWidth*0.1+(50*l),App.setHeight*0.04,0.6,1,true);}
								catch(e){}
							}
					App.visuals.image(GraphicsController.getImage('Sc'+speedStar),  +App.setWidth*0.03,App.setHeight*0.10,0.5,1,true);
					App.visuals.image(GraphicsController.getImage('Sc'+turningStar),+App.setWidth*0.03,App.setHeight*0.15,0.5,1,true);
					App.visuals.image(GraphicsController.getImage('Sc'+accelStar)  ,+App.setWidth*0.03,App.setHeight*0.2,0.5,1,true);
					
					for (var o = GameMultiplier;o>0;--o)
					{
					App.visuals.image(imgOrbArray[2] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[3] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[0] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[4] ,+App.w*0.1,+32 * o + 45,1,1,true);
					App.visuals.image(imgOrbArray[5] ,+App.w*0.1,+32 * o + 45,1,1,true);
					}
					
					//////////ENDMAINGAMEHUD
					}
					//App.visuals.text(Math.round(GameScore),App.setWidth*0.8,60,1,25,1,true);
				App.visuals.image(this.imgGlass,0,0,0.5,GlassAlpha*0.3,true);
				App.visuals.image(this.imgGlass,App.w,App.h/4,0.25,GlassAlpha*0.1,true);
				App.visuals.image(this.imgGlass,App.w/2,App.h*1.1,0.35,GlassAlpha*0.9,true);
				
				App.visuals.text(Math.round(GameTime/60), 15,45,25,1,true);
				App.visuals.text(Math.round(mapobjectArray.length), 15,85,25,1,true);
				App.visuals.text(Math.round(MapTime), 15,125,25,1,true);
				App.visuals.text(Math.round(GameMultiplier), 15,165,25,1,true);
				App.visuals.text(Math.round(MapScore/10), 15,205,25,1,true);



				
				
				
				
				
				
				
				
				
				
				
				
				
				App.visuals.image(GMBottom3,App.w/2,App.h/1.5,0.5,0.2,true);	
				
				App.visuals.image_button(GMBottom,App.setWidth/2,35,2,function(){Pause=!Pause;});	
				App.visuals.image(GMBottom2,App.setWidth/2,App.setHeight-35,2,1,true);	
				
				
					
				if (GameOverEvent)
				{

				}
				//else
				//	App.twitter.hidden = true;
	
	},
	
};