"use strict";
var Loading = Object.create(null);
Loading.prototype = {
	
	init:function(){
	
		this.x = 0;
		
		this.colours = ["#336633","#663333"];
		
		this.color = this.colours[0];
		
		return this;
	},
	
	draw:function(){
	
		var a = 15;
		var c = 3;
		var d = 6;
		var b = this.x/1080;
		
		for(var i=8;i>=0;--i)
			this.visuals.circle(-7+this.app.getWidth()/2+Math.cos((b+i)*7)*a,this.app.getHeight()/1.5+Math.sin((b+i)*7)*a,c,this.color,0.5-Math.sin(((b+i)*(1*7))+360*(-Math.sin(this.x/1080)*0.1))*0.5);
	
	},
	update:function(){
	
		var delta = this.app.getDelta();
		
		this.color = this.colours[this.app.client.Math.Clamp(Math.round((delta>1.6?1:0)+this.graphics.getErrors()),0,1)];
		
		this.x+=3*delta;
		
	}
	
};