"use strict";
var StatusIco = Object.create(null);
StatusIco.prototype = {
	
	init:function(){
		
		this.StatusIcon = [];
		this.StatusIcon[0] = this.graphics.load('interface/iconoffline');
		this.StatusIcon[1] = this.graphics.load('interface/iconp');
		this.StatusIcon[2] = this.graphics.load('interface/iconvolume');
		this.StatusIconX = this.graphics.load('interface/iconx');
		Application.toggleParticles = true;
		Application.toggleConnect = false;
		Application.toggleSound = false;
		this.StatusFunction = [this.Fsound,this.Fparticles,this.Fconnect];
		
		return this;
	},
	Fsound:function(){
		Application.toggleSound=!Application.toggleSound;
	},
	Fparticles:function(){
		Application.toggleParticles=!Application.toggleParticles;
	},
	Fconnect:function(){
		Application.toggleConnect=!Application.toggleConnect;
	},
	
	draw:function(al){
		var a = al*0.9;
		Application.toggleConnect = this.graphics.getErrors();
		this.StatusIconXl = [!Application.toggleSound,!Application.toggleParticles,!Application.toggleConnect];
	//	this.StatusIconXI.reverse();
		
		
		//this.StatusFunction = [(this.toggleSound?this.toggleSound=false:this.toggleSound=true),(this.toggleParticles?this.toggleParticles=false:this.toggleParticles=true),(Application.mute?Application.mute=false:Application.mute=true)];
		for(var i=2;i>=0;--i){
		this.visuals.image_button(this.StatusIcon[i],this.app.getWidth()/2-this.StatusIcon[i].width/4-this.StatusIcon[i].width/4*i,	55	,0.48,this.StatusFunction[i],this.StatusIcon[i],1,1,a,true);
			
		this.visuals.image_button(this.StatusIconX,this.app.getWidth()/2-this.StatusIcon[i].width/4-this.StatusIcon[i].width/4*i,	55	,0.48,function(){},this.StatusIcon[i],1,1,this.StatusIconXl[i]*0.7,true);
		//this.StatusIconXl[i]==false?this.visuals.image_button(this.StatusIconX,this.app.getWidth()/2-this.StatusIcon[i].width/4-this.StatusIcon[i].width/4*i,	55	,0.5,this.StatusIconXl[i],this.StatusIcon[i],1,1,a,true):null;
		}
	},
	update:function(){
	
		
	}
	
};