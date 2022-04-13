song= "";
song1 = "";
song2 = "";
scoreLeftwrist = 0;
LeftWristY = 0;
LeftWristX = 0;
RightWristY = 0;
RightWristX = 0;



function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose", gotposes)
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotposes(results){
    if(results.length > 0 ){
        console.log(results);

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is "+scoreLeftwrist);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;

        console.log("Left wrist x is"+LeftWristX+" And left wrist y is"+LeftWristY+": Right wrist x is"+
        RightWristX+"Right wrist y is"+RightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("lime");
    stroke("black")
    if(scoreLeftwrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        numberLeftwristy = Number(LeftWristY);
        removedecimals = floor(numberLeftwristy);
        volume = removedecimals/500;
        document.getElementById("volume").innerHTMl = "Volume is ="+volume;
        song.setVolume(volume)
    }
}

function preload(){
    song = loadSound("Cute.mp3");
    song1 = loadSound("bos.mp3");
    song2 = loadSound("firse.mp3");
}

function play(){
    song.play();
    song.rate(1)
    song.setVolume(0.5)
}