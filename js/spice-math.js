clamp = function(x,min,max){
	return x < min ? min : (x > max ? max : x);
};

var math = {
  
    clamp:function(a,b,d){
    
    }
    
};

onmessage = function(e) {
  console.log('Message received from main script: ');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
    
    var data = e.data
    var result = 0;
    console.log(data);
    if (typeof data === 'object')
    {
        switch (data[0])
        {
            case 'clamp':
                var x = data[1];
                var min = data[2];
                var max = data[3];
                
                result = clamp(x,min,max);
                
                break;
                
        }
        
        
    }
    
  postMessage(result);
}
