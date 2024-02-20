
let songList=document.getElementById('song-list')
let progress=document.getElementById('progress')
let playBtn=document.getElementById('play-btn')
let leftBtn=document.getElementById('left-btn')
let rightBtn=document.getElementById('right-btn')

// Array of songs
let songs = [
    {
        name:'song1',
        id:1
    },
    {
        name:'song2',
        id:2
    },
    {
        name:'song3',
        id:3
    },
    {
        name:'song4',
        id:4
    }
]

let audio =new Audio('./song1.mp3')

// show the songlist in UI
for(let song of songs){
    let li=document.createElement('li');
    li.innerText=song.name;
    li.setAttribute('id',song.id);
    li.classList.add('song-item');
    songList.append(li);
}

//when clicked on play change icon and play song
playBtn.addEventListener('click' , ()=>{
    audio.paused ? audio.play() : audio.pause();
    if(playBtn.children[0].classList.contains('fa-play')){
        playBtn.children[0].classList.remove('fa-play')
        playBtn.children[0].classList.add('fa-pause')
    }
    else{
        playBtn.children[0].classList.remove('fa-pause')
        playBtn.children[0].classList.add('fa-play')
    }
})

//change progress bar according to music played
audio.addEventListener('timeupdate' , function(){
    let currentProgress = audio.currentTime * 100 / audio.duration;
    progress.value = currentProgress;
})

//change music played according to progress bar
progress.addEventListener('change' , function(){
    let updatedTime = audio.duration * progress.value / 100;
    audio.currentTime = updatedTime;
})

//change songs according to item selected on playlist
songList.addEventListener('click' , function(event){
    let songId = event.target.getAttribute('id');
    audio.src = `./song${songId}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.add('fa-pause');
    playBtn.children[0].classList.remove('fa-play');
})

//change to prev song using leftbtn
leftBtn.addEventListener('click', function(event){
    let currsongURL = audio.src;
    let currsongId;
    for(let song of songs){
        if(audio.src.includes(`${song.name}`)){
            currsongId = song.id;
            break;
        }
    }
    let nextsongId=currsongId-1;
    if(nextsongId===0){
        nextsongId=songs.length;
    }
    audio.src = `./song${nextsongId}.mp3`;
    audio.currentTime = 0;
    audio.play();
})

//change to right song using rightbtn
rightBtn.addEventListener('click', function(event){
    let currsongURL = audio.src;
    let currsongId;
    for(let song of songs){
        if(audio.src.includes(`${song.name}`)){
            currsongId = song.id;
            break;
        }
    }
    let nextsongId=currsongId+1;
    if(nextsongId===songs.length+1){
        nextsongId=1;
    }
    audio.src = `./song${nextsongId}.mp3`;
    audio.currentTime = 0;
    audio.play();
})
