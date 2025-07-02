const buttonStart = document.getElementById("start");
const buttonPause = document.getElementById("pause");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
const timer = document.getElementById("timer");
const timerInput = document.getElementById("timerInput");
const timerSubmit = document.getElementById("timerSubmit");
const progressBar = document.getElementById("progress");
const themeToggle = document.getElementById("theme-toggle");

let interval;
let userInput;
let totalTime;
let isPaused = false;
let stoppedFlag = false;

timerSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const input = parseInt(timerInput.value);
    if (isNaN(input) || input <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }
    userInput = input * 60;
    totalTime = userInput;
    updateTimer();
});

buttonStart.addEventListener("click", startTimer);
buttonPause.addEventListener("click", pauseTimer);
buttonStop.addEventListener("click", stopTimer);
buttonReset.addEventListener("click", resetTimer);

function startTimer() {
    if (!interval && userInput > 0 && !isPaused && !stoppedFlag) {
        interval = setInterval(() => {
            userInput--;
            updateTimer();
            updateProgressBar();
            if (userInput <= 0) {
                clearInterval(interval);
                alert("TIMES UP!!!");
                resetTimer();
            }
        }, 1000);
    } else if (isPaused) {
        isPaused = false;
        startTimer();
    } else if (stoppedFlag) {
        alert("The timer was stopped. Please reset or set a new time.");
    }
}

function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        isPaused = true;
        interval = null;
    }
}

function stopTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        stoppedFlag = true; 
    }
}

function resetTimer() {
    clearInterval(interval);
    userInput = totalTime;
    updateTimer();
    updateProgressBar();
    interval = null;
    stoppedFlag = false;
}

function updateTimer() {
    let minutes = Math.floor(userInput / 60);
    let seconds = userInput % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateProgressBar() {
    const percentage = ((totalTime - userInput) / totalTime) * 100;
    progressBar.style.width = percentage + "%";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
});
