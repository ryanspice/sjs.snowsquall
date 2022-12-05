/*
var Audio = Object.create(null);
Audio.prototype = {
	
		init:function(){
			
			this.track = 'BenTinson-AmbientElectroHouse1.mp3';	
			
            
            console.log(this);
            
            
		},
	
	
};

*/

//var isAudioContextSupported = function () {
//    // This feature is still prefixed in Safari
//    window.AudioContext = window.AudioContext || window.webkitAudioContext;
//    if(window.AudioContext){
//        return true;
//    }
//    else {
//        return false;
//    }
//};
//
//var audioCtx;
//if(isAudioContextSupported()) {
//    audioCtx = new window.AudioContext();
//}

//var AudioContext = window.AudioContext || window.webkitAudioContext;
//var audioContext = new AudioContext();
//
//var micGain = audioContext.createGain(); 
//var sourceMix = audioContext.createGain();
//var visualizerInput = audioContext.createGain(); 
//var outputGain = audioContext.createGain();
//var dynComp = audioContext.createDynamicsCompressor();
//sourceMic = audioContext.createMediaStreamSource('audio/BenTinson-AmbientElectroHouse1.mp3');
//var request = new XMLHttpRequest();
//request.open("GET", 'audio/BenTinson-AmbientElectroHouse1.mp3', true);
//request.responseType = "arraybuffer";
//
//var loader = this;
//
//request.onload = function() {
//    loader.context.decodeAudioData(
//        request.response,
//        function(buffer) {
//            if (!buffer) {
//                console.log('error decoding file data: ' + url);
//                return;
//            }
//            loader.bufferList[index] = buffer;
//            if (++loader.loadCount === loader.urlList.length){
//                loader.onload(loader.bufferList);
//            }
//        },
//        function(error) {
//            console.error('decodeAudioData error', error);
//        }
//    );
//};
//
//var sourceNode = audioCtx.createBufferSource();
//sourceNode.connect(audioCtx.destination);
//sourceNode.start(0);
//sourceNode.stop();