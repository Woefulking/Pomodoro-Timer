let workDuration = 10;
let breakDuration = 3;

let timer;
let endTime;
let pauseTime;

let durationBlock = document.querySelector(".duration");
durationBlock.textContent = formatTime(workDuration);

let toggleBtn = document.querySelector(".toggle");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function toggleTimer(seconds) {
  if (timer) {
    pauseTimer();
    toggleBtn.textContent = "Resume";
  } else {
    startTimer(seconds);
    toggleBtn.textContent = "Pause";
  }
}

function startTimer(seconds) {
  if (!pauseTime) {
    pauseTime = seconds * 1000;
  }

  endTime = Date.now() + pauseTime;

  function tick() {
    const remaining = endTime - Date.now();
    const secondsLeft = Math.ceil(remaining / 1000);

    durationBlock.textContent = formatTime(secondsLeft);

    if (remaining <= 0) {
      clearInterval(timer);
      timer = null;
      pauseTime.textContent = null;
      toggleBtn.textContent = "Start";
    }
  }

  tick();
  timer = setInterval(tick, 100);
}

function pauseTimer() {
  pauseTime = endTime - Date.now();
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;

  pauseTime = workDuration * 1000;

  durationBlock.textContent = formatTime(workDuration);
  toggleBtn.textContent = "Start";
}
