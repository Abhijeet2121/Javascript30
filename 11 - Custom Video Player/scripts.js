const player = document.querySelector('.player'); 
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress'); 
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); 
const  fullscreen = player.querySelector('.fullscreen'); 

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.playe__sliderr'); 


function togglePlay() {
const method = video.paused ? 'play' : 'pause';
video[method]();
}

function updateButton() {
    const icon = this.paused? '►' : '❚ ❚';
    toggle.textContent=icon;
 
}
function skip() { 
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
video[this.name] = this.value;
}

function handleProgress() {
 const percent = (video.currentTime/ video.duration) *100;
 progressBar.style.flexBasis= `${percent}%`;
}

function openFullscree(){
 if (video.requestFullscreen) {
    video.requestFullscreen();
}  else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
} else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
}
}


function scrub(e){
const scrubTime = (e.offset / progress.offsetWidth)* video.duration;
video.currentTime = scrubTime;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click',togglePlay);
fullscreen.addEventListener('click', openFullscree);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

