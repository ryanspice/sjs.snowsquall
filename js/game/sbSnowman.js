var sbSnowman = Object.create({prototype:{

        init:function(x,y){

            this.y = Application.getHeight() + y;
            
            this.del = false;
            
            this.layer = 0;
            
            this.x = -Application.getWidth()*2*Math.random()+Application.getWidth()*2*Math.random();
            
            this.collision = 25;
            
            this.scale = 1;
            
            this.shake = 1;
            
            this.type = "Snowman";
            
            this.preventDraw = true;
            
        },

        draw:function(){
            
            
            var x = this.x + getMapPos().x;
            var y = this.y + -getMapPos().y;
            
            this.img = this.game.snowman;
            this.visuals.image(this.img, 	x-this.img.width/2 , y-this.img.height/2,1,1,false);
            
            return;
            
        },

        update:function(){

        }

    }
});
sbSnowman = Object.create(sbSnowman.prototype,sbObj.constructor);