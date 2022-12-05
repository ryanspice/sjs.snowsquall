var sbIce = Object.create({prototype:{

        init:function(x,y){

            this.y = Application.getHeight() + y;
            
            this.del = false;
            
            this.layer = 0;
            
            this.x = -Application.getWidth()*2*Math.random()+Application.getWidth()*2*Math.random();
            
            this.collision = 65;
            
            this.scale = 1;
            
            this.shake = 1;
            
            this.type = "Ice";
            
            this.preventDraw = true;
            
        },

        draw:function(){
            
            
            var x = this.x + getMapPos().x;
            var y = this.y + -getMapPos().y;
            
            this.img = this.game.ice_rocks;
            this.visuals.image(this.img, 	x-this.img.width/2 , y-this.img.height/2,1,1,false);
            
            this.img = this.game.ice
            this.visuals.image(this.img, 	x-this.img.width/2 , y-this.img.height/2,1,1,false);
            
            return;
            
        },

        update:function(){

        }

    }
});
sbIce = Object.create(sbIce.prototype,sbObj.constructor);