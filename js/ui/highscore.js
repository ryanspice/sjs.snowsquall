
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
var request = createCORSRequest( "get", "./network/ping.php" );
if ( request ){
    // Define a callback function
    request.onload = function(){

        console.log(this)

    };
    // Send request
    request.send();
}
HIGHSCORE_update();



Highscores_ = new highscores_();
function highscores_()
{
	this.name = "HighScores";
	this.start = function()
	{

	};
	this.update = function()
	{
		this.draw();
	};
	this.draw = function()
	{

		INPUT_released = false;
	};
}

window.HIGHSCORE_slots = new Array();
window.HIGHSCORE_array = new Array();
function HIGHSCORE_draw(x,y)
	{
	var pp=+1920*App.scale+PagePos;
	var n = 0;
	//for (var j = 0; j<5;++j)
	//	for (var i = 0; i<6;++i)
	//		App.visuals.image(GraphicsController.getImage('Sc'+j), 350 + (50*i),(-pp*0.051*-pp*0.051)+(150*j)+650,1,1,true);
	try{if (HIGHSCORE_slots[0].score)
		App.offline = false;}catch(e){App.offline=true;}



	if (App.offline)
		return;
	for (var j = 0; j<5;++j)
		{
		if (HIGHSCORE_slots[j])
			{
			var le = HIGHSCORE_slots[j].score.length;

				for (var l = 0; l<le;++l)
					{
					App.visuals.image(GraphicsController.getImage('Sc'+HIGHSCORE_slots[j].score.charAt(l)), 350 + (50*l),(-pp*0.051*-pp*0.051)+(150*j)+650,1,1,true);

					}

			}
		}
	}
function HIGHSCORE_update()
	{
    	var scoreReq;
    	if (window.XMLHttpRequest)
    	  {// code for IE7+, Firefox, Chrome, Opera, Safari
    	  scoreReq=new XMLHttpRequest();
    	  }
    	else
    	  {// code for IE6, IE5
    	  scoreReq=new ActiveXObject("Microsoft.XMLHTTP");
    	  }
    	scoreReq.onreadystatechange=function()
    	  {


              console.log(scoreReq.responseText);
    	  if (scoreReq.readyState==4 && scoreReq.status==200)
    		{
            console.log(scoreReq);
    		console.log(scoreReq.responseText);
    		HIGHSCORE_array = scoreReq.responseText.split(',');
    		HIGHSCORE_fill();

    		}
        }

    try {
	    scoreReq.open("GET","./network/ping.php",true);
	    scoreReq.send();} catch(e){}
	}

//HIGHSCORE_update();



function HIGHSCORE_slot(n,s)
{
this.name = n;
this.score = s;
}

function HIGHSCORE_fill()
{
var s = 0;
var l = HIGHSCORE_array.length;
	for(var i = 0;i<l;i+=2)
	{
		HIGHSCORE_slots.push(new HIGHSCORE_slot(HIGHSCORE_array[i],HIGHSCORE_array[i+1]));
	}
	console.log(HIGHSCORE_slots);
}
