let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


    function timer(seconds){

        clearInterval(countdown);
    const now = Date.now();
    const then  = now + seconds * 1000;
    displayTimerLeft(seconds);
    displayTimerEnd(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft <= 0) {
            clearInterval(countdown);
            return;
            }
        displayTimerLeft(secondsLeft)
        }, 1000);
    }

    function displayTimerLeft( seconds) {
        const minutes = Math.floor(seconds / 60);
        const reminderSeconds = seconds % 60 ;
        const display = `${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        document.title = display;
        timerDisplay.textContent = display;
    }

    function displayTimerEnd(timestamp){

        const end = new Date(timestamp);
        const hour = end.getHours();
        const adjustHours = hour > 12 ? hour - 12 : hour;
        const minutes = end.getMinutes();
        endTime.textContent = `be back at ${adjustHours}:${minutes < 10 ? '0' : ''} ${minutes}`;
    }

    function startTimer(){
        const seconds = parseInt(this.dataset.time);
        timer(seconds);
    }

    buttons.forEach(button => button.addEventListener('click', startTimer));

    document.customForm.addEventListener('submit', function(e){
        e.preventDefault();
        const mins = this.minutes.value;
        console.log(mins);
        timer(mins * 60);
        this.reset();
    })