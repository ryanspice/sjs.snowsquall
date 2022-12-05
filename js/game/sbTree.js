var sbTree = Object.create({prototype:{

        init:function(x,y){

            this.img = Application.getCurrent().game.bshadow;
            
            this.img2 = Application.getCurrent().game.bshadow;

            this.y = Application.getHeight() + y;
            
            this.del = false;
            
            this.layer = 1;
            
            this.x = -Application.getWidth()*2*Math.random()+Application.getWidth()*2*Math.random();
            
            
            if (Math.random()*1<0.25)
                this.x=-Application.getWidth()*2+Math.random()*100;
            if (Math.random()*1<0.25)
                this.x=Application.getWidth()*2-Math.random()*100;
            
            this.collision = 15;
            
            this.scale = 1;
            
            this.shake = 1;
            
            this.type = "Tree";
            
            this.preventDraw = true;
            
        },

        draw:function(){
            
            
            var x = this.x + getMapPos().x;
            var y = this.y + -getMapPos().y;
            
           // this.visuals.rect(x-5,y-5,10,10,"#000000");
                    this.img = this.game.TreePart[1];
                    this.visuals.image(this.img, 	x-this.img.width/2.5 , y-this.img.height*0.9,1,1,false);
                    this.img = this.game.TreePart[0];
                    this.visuals.image(this.img, 	x-this.img.width/2.5 , y-this.img.height*0.9,1,1,false);
            return;
            
        },

        update:function(){

        }

    }
});
sbTree = Object.create(sbTree.prototype,sbObj.constructor);