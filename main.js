song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,300);

    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotPoses);
}
function modelloaded()
{
console.log('PoseNet is Initialized');
}
function preload(){
song = loadSound("music.mp3");
}
function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("score of left wrist="+scoreLeftWrist+",score of right wrist="+scoreRightWrist);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftWristX="+leftWristX+",leftwristY="+leftWristY);
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightWristX="+rightWristX+",rightwristY="+rightWristY);
}
}

function draw(){
    image(video,0,0,500,400);
    fill("#FF000");
    stroke("#FF000");
    if(scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberLeftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }
if(scoreRightWrist>0.2)
{
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0&&rightWristX<100)
    {
    document.getElementById("speed").innerHTML="Speed=0.5x";
    song.rate(0.5);
    }
    else if(rightWristY>100&&rightWristX<=200)
    {
    document.getElementById("speed").innerHTML="Speed=1x";
    song.rate(1);
    }
    else if(rightWristY>200&&rightWristX<=300)
    {
    document.getElementById("speed").innerHTML="Speed=1.5x";
    song.rate(1.5);
    }
    else if(rightWristY>300&&rightWristX<=400)
    {
    document.getElementById("speed").innerHTML="Speed=2x";
    song.rate(2);
    }
    else if(rightWristY>400&&rightWristX<=500)
    {
    document.getElementById("speed").innerHTML="Speed=2.5x";
    song.rate(2.5);
    }
}
}
function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}

