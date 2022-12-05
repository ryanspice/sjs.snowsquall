var sbObj = Object.create({
    constructor:{

        _init:{value:function(x,y){

                this.app = Application;
                this.visuals = this.app.client.visuals;
                this.game = Application.getCurrent().game;
            
                this.checked = false;
            
                this.type = "undefined";
            
                if ((x)&&(y))
                {
                this.x = x;
                this.y = y;
                }
            
                this.scale = 1;
                this.alpha = 1;
            
                this.preventDraw = true;
                    
                this.init(x,y);
            
                mapobjectArray.push(this);
        
             }
        },
        
        _respawn:{value:function(){
                
            
                this.y +=1000+Math.random()*200;
                this.init(this.x,this.y);
                
                this.del = false;   
                this.checked = false;
            
            }
        },
        
        _update:{value:function(){

                this.y-=MapSpeed;
                if (this.y<0)
                  this.del = true;
            
                if (this.hit)
                    this.hit = false;
            
                if (this.del)
                    this._respawn();
            
                if (this.y-getMapPos().y<10*Application.getScale())
                    this.del = true;
            
            
            if (this.game.player)
                if (this.y-getMapPos().y<this.game.map.y+10-this.game.player.y)
                    this.layer = 0;
            
                this.update();
            
            }
        },
        
        _draw:{value:function(){
            
                var x = this.x + getMapPos().x;
                var y = this.y + -getMapPos().y;
                
                this.draw();
            
                if (this.preventDraw==true)
                    return;
            
                this.visuals.image(this.img, 	x , y,1,1,true);

            }
        }
        
    }
});