
let videostopped=false
function init_smiley() {
  
let DEBUG = true
// Init debuggin text field, video and canvases
var text = document.createElement("P");
text.id = "txt";
text.style.fontSize = "200%";
var video = document.createElement("VIDEO");
video.id = "video";
video.width = 749
video.height = 560
video.autoplay = true;
video.defaultMuted = true;
video.style.position = "absolute";
video.style.top = 0 + "px";
video.style.left = 0 + "px";
if(!DEBUG){
  video.style.left = -window.innerWidth + "px";
}
video.load();
if(/* window.location.hostname=="localhost:4200" */true){
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
  ]).then(startVideo)
} else {
  console.log("here?");
  let subfolder = 'wink-scroll' // change this to the subfolder you've put models folder on your server
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/'+subfolder+'/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/'+subfolder+'/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/'+subfolder+'/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/'+subfolder+'/models')
  ]).then(startVideo)
}

/* function test(){
  console.log("testing");
} */
function startVideo() {
  
  var sUsrAg = navigator.userAgent;
  // if firefox use navigator.mediaDevices.getUserMedia instead of deprecated navigator.getUserMedia
  if (sUsrAg.indexOf("Firefox") > -1) {
    var constraints = { audio: false, video: true, autoPlay:true, playsInline:true, muted:true };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      var video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
        
      };
    })
    .catch(function(err) {
      console.error(err);
    });

  } else {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
  }
}

video.addEventListener('play', () => {
  console.log(video);
  
  console.log("video plays");
  let cooldown="disabled"
    setInterval(async () => {

    // Detect faces with face-api
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    // JUST AN EXTRA FEATURE - Changing Body color based on facial expressions
   
    if(DEBUG && detections.length==1) {
      if(detections[0].expressions.neutral>0.7) {
        document.body.style.backgroundColor = "white";
        console.log("neutral");
      }
      else if(detections[0].expressions.happy>0.7){
        console.log("happy");
        document.body.style.backgroundColor = "blue";
        if (cooldown=="disabled") {
          pageScroll()
          cooldown="enabled"
          console.log("cooldown enabled");
          setTimeout(() => {
            cooldown="disabled"
            console.log("cooldown disabled");

          }, 2000);
        }
      
      }
      else if(detections[0].expressions.sad>0.7){
        document.body.style.backgroundColor = "grey";
        console.log("sad");
        //pageBackScroll()
      }
      else if(detections[0].expressions.angry>0.7){
        console.log("angry");

        document.body.style.backgroundColor = "red";
      }
      else if(detections[0].expressions.disgusted>0.7){
        console.log("disgusted");

        document.body.style.backgroundColor = "green";
      }
      else if(detections[0].expressions.fearful>0.7){
        console.log("fearful");

        document.body.style.backgroundColor = "lightblue";
      }
      else if(detections[0].expressions.surprised>0.7){
        console.log("surprised");

        document.body.style.backgroundColor = "yellow";
      }
    }
  }, 100)
})

}
function stopvideo() {
  videostopped=true
 /*  var constraints = { audio: false, video: true, autoPlay:true, playsInline:true, muted:true };

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    var video = document.querySelector('video');
    console.log(video);
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      video.pause();
      
    };
  }) */
  console.log("video stopped");
  //location.reload()
}

function pageScroll() {
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
  
  let pageheight = parseInt(document.getElementsByClassName("page")[0].style.height.slice(0,-2)) +10
  element.scrollTop += pageheight;
  console.log(pageheight);
/*   for(var i=0; i<document.getElementsByClassName("winkScroll").length|0; i++) { document.getElementsByClassName("winkScroll")[i].scrollTop += 10; }
 */}
function pageBackScroll() {
  let element= document.getElementsByClassName("ng2-pdf-viewer-container")[0]
  let pageheight = parseInt(document.getElementsByClassName("page")[0].style.height.slice(0,-2)) +10

  element.scrollTop -=pageheight;
/*   for(var i=0; i<document.getElementsByClassName("winkScroll").length|0; i++) { document.getElementsByClassName("winkScroll")[i].scrollTop -= 10; }
 */}
function goTop() {
  for(var i=0; i<document.getElementsByClassName("winkScroll").length|0; i++) { document.getElementsByClassName("winkScroll")[i].scrollTop = 0; }
}
