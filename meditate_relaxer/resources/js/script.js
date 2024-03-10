const app = () =>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');


    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Length
    const outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //change background
    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song);
            song.pause();
            video.pause();
            play.src = "svg/play.svg";
        });
    });
    
    
    //play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });
    

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
        });
        })

    //Pausa and PLay

    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = "svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src = "svg/play.svg";
        }
    };
    

    //Circle Animation
    song.ontimeupdate=() =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //circle
        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //counter
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >=fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = 'svg/pause.svg';
            video.pause();
        }
    };
    };   



app();