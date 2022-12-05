var sbSpeed = Object.create({prototype:{

        init:function(x,y){

            this.y = Application.getHeight() + y;
            
            this.del = false;
            
            this.layer = 0;
            
            this.x = -Application.getWidth()*2*Math.random()+Application.getWidth()*2*Math.random();
            
            this.collision = 25;
            
            this.scale = 1;
            
            this.shake = 1;
            
            this.type = "Speed";
            
            this.preventDraw = true;
            
            
            this.frame = 0;
            
        },

        draw:function(){
            
            
            var x = this.x + getMapPos().x;
            var y = this.y + -getMapPos().y;
            var index = this.frame;
            this.img = this.game.SpeedPart[Math.round(index)];
            this.visuals.image(this.img, 	x-this.img.width/2.5 , y-this.img.height*0.9,1,1,false);
            
            return;
            
        },

        update:function(){

            this.frame+=0.1*this.app.getDelta();
            if (this.frame>3)
                this.frame = 0;
            
        }

    }
});
sbSpeed = Object.create(sbSpeed.prototype,sbObj.constructor);