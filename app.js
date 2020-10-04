//variable declaration
let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

//Initialization of Arrays
dir="music/";
playlist = ["Cartoon-On-_-On","Elektronomia", "Fearless", "Johnning", "Popsicle"];
title=["Cartoon-On-_-On","Elektronomia", "Fearless", "Johnning", "Popsicle"];
artists = ["(feat. Daniel Levi) [NCS Release]","(feat. Daniel Levi) [NCS Release]","(feat. Johnning Levi) [NCS Release]","(feat. Daniel LFZX) [NCS Release]","(feat. Chris Levi) [NCS Release]"]
poster = ["images/ncs1.jpeg","images/ncs2.jpg","images/ncs3.jpg","images/ncs4.jpg","images/ncs5.jpg"]

//Different browser support
ext=".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg";
}

//set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimeText");
playlist_status = document.getElementById("playlist-status");
playlist_artist = document.getElementById("playlist-artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

playlist_index = 0;

//Audio Object
audio = new Audio();
audio.src = dir + playlist[0] + ext; 
audio.loop = false;

//First song Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//Add Event Handling
playbtn.addEventListener("click", playpause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", event =>{
    seeking=true;
    seek(event);
});
seekslider.addEventListener("mousemove", event =>{
    seek(event);
});
seekslider.addEventListener("mouse", function(){
    seeking=false;
});
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", ()=>{
    seektimeupdate();
});
audio.addEventListener("ended", ()=>{
    switchrack();
});
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//Functions
function fetchMusicDetails(){
    //poster image, payse/play image
    $("#playpausebtn img").attr("src", "images/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("image").attr("src", poster[playlist_index]);

    //Title and Artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    //Audio
    audio.src = dir + playlist[playlist_index]+ext;
    audio.play();
}

function playpause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src","images/pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src", "images/play-red.png");
    }
}

function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length -1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}

function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}

function mute(){    
    if(audio.muted){
        audio.muted = false;
        $("#mutebtn img").attr("src","images/speaker.png");
    }else{
        audio.muted = true;
        $("#mutebtn img").attr("src","images/mute.png");
    }
}

function seek(){
    if(audio.duration == 0){
        null;
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function setvolume(){  
    audio.volume = volumeslider.value / 100;
}

function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs < 10){cursecs = "0" + cursecs};
        if(dursecs < 10){dursecs = "0" + dursecs};
        if(curmins < 10){curmins = "0" + curmins};
        if(dursecs < 10){dursecs = "0" + dursecs};
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
    }
}

function switchtrack(){
    if(playlist_index == (playlist.length - 1)){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}

function loop(){
    if(audio.loop){
        audio.loop = false;
        $("#repeat img").attr("src","images/rep.png");
    }else{
        audio.loop = true;
        $("#repeat img").attr("src","images/rep1.png");
    }
}

function getRandomNumber(min, max){
    let step1 = max-min+1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function random(){
    let randomIndex = getRandomNumber(0, playlist.length - 1);
    playlist_index = randomIndex;
    fetchMusicDetails();
}