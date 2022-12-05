var sbFlag01 = Object.create({prototype:{

        init:function(x,y){

            this.y = Application.getHeight() + y;
            
            this.del = false;
            
            this.layer = 1;
            
            this.x = -Application.getWidth()*2*Math.random()+Application.getWidth()*2*Math.random();
            
            this.collision = 25;
            
            this.scale = 1.5;
            
            this.shake = 1;
            
            this.type = "Flag";
            
            this.preventDraw = true;
            
            
            this.frame = 0+Math.random()*10;
            this.framed = 1;
            
        },

        draw:function(){
            
            
            var x = this.x + getMapPos().x;
            var y = this.y + -getMapPos().y;
            var index = this.frame;
            this.img = this.game.Flag01Part[Math.round(index)];
            this.visuals.image_ext(this.img, 	x-this.img.width/2 , y/*-this.img.height/2*/,this.scale,1,true);
            
            return;
            
        },

        update:function(){

            this.frame+=0.5*this.framed*this.app.getDelta();
            if (this.frame>=10)
                this.framed = -1;//,this.frame = 10;
            if (this.frame<0)
                this.framed = 1,this.frame = 0;
            
        }

    }
});
sbFlag01 = Object.create(sbFlag01.prototype,sbObj.constructor);