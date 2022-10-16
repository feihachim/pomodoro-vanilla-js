"use-strict";

/* const INITIAL_VALUES = Object.freeze({
  sessionTime: 25,
  breakTime: 5,
  sessionStatus: "Session",
  breakStatus: "Break",
  secondsInMinute:60
});
const state = {
    sessionTime:INITIAL_VALUES.sessionTime,
    breakTime:INITIAL_VALUES.breakTime,
    timerId:0,
    delayId:0,
    playStatus:false,
    timer:INITIAL_VALUES.sessionTime*2
}; */
const BREAK_TIME = 5;
const SESSION_TIME = 25;
const SESSION_STATUS = "Session";
const BREAK_STATUS = "Break";
const secondsInMinute = 60;
let sessionTime = SESSION_TIME;
let breakTime = BREAK_TIME;
let timerId = 0;
let delayId = 0;
let playStatus = false;
let timer = sessionTime * secondsInMinute;
const sessionLength = document.querySelector(".session-length");
const breakLength = document.querySelector(".break-length");
const timerStatus = document.querySelector(".timer-status");
const timerLength = document.querySelector(".timer-length");
const incrementSession = document.querySelector(".increment-session");
const decrementSession = document.querySelector(".decrement-session");
const incrementBreak = document.querySelector(".increment-break");
const decrementBreak = document.querySelector(".decrement-break");
const playButton = document.querySelector(".play");
const resetButton = document.querySelector(".reset");
const alarmSound = document.querySelector("#beep");

const appendZero = (digit) =>
  digit < 10 ? `0${digit.toString()}` : digit.toString();

const displayTime = (time) => {
  const minutes = Math.floor(time / secondsInMinute);
  const seconds = time % secondsInMinute;

  return `${appendZero(minutes)}:${appendZero(seconds)}`;
};

window.addEventListener("load", () => {
  sessionLength.textContent = sessionTime;
  breakLength.textContent = breakTime;
  timerStatus.textContent = SESSION_STATUS;
  timerLength.textContent = displayTime(timer);
  alarmSound.load();
});

decrementSession.addEventListener("click", () => {
  if (sessionTime > 1) {
    sessionTime -= 1;
    sessionLength.textContent = sessionTime;
    if (!playStatus && timerStatus.textContent === SESSION_STATUS) {
      timer = sessionTime * secondsInMinute;
      timerLength.textContent = displayTime(timer);
    }
  }
});

incrementSession.addEventListener("click", () => {
  if (sessionTime < 60) {
    sessionTime += 1;
    sessionLength.textContent = sessionTime;
    if (!playStatus && timerStatus.textContent === SESSION_STATUS) {
      timer = sessionTime * secondsInMinute;
      timerLength.textContent = displayTime(timer);
    }
  }
});

decrementBreak.addEventListener("click", () => {
  if (breakTime > 1) {
    breakTime -= 1;
    breakLength.textContent = breakTime;
    if (!playStatus && timerStatus.textContent === BREAK_STATUS) {
      timer = breakTime * secondsInMinute;
      timerLength.textContent = displayTime(timer);
    }
  }
});

incrementBreak.addEventListener("click", () => {
  if (breakTime < 60) {
    breakTime += 1;
    breakLength.textContent = breakTime;
    if (!playStatus && timerStatus.textContent === BREAK_STATUS) {
      timer = breakTime * secondsInMinute;
      timerLength.textContent = displayTime(timer);
    }
  }
});

playButton.addEventListener("click", () => {
  playStatus = !playStatus;
  if (!playStatus) {
    clearInterval(timerId);
    clearInterval(delayId);
    return;
  }
  timerId = setInterval(() => {
    if (timer > 0) {
      timer -= 1;
      timerLength.textContent = displayTime(timer);
    }
    if (timer === 0) {
      alarmSound.play();
      delayId = setTimeout(() => {
        if (timer === 0 && timerStatus.textContent === SESSION_STATUS) {
          timerStatus.textContent = BREAK_STATUS;
          timer = breakTime * secondsInMinute;
          timerLength.textContent = displayTime(timer);
        }
        if (timer === 0 && timerStatus.textContent === BREAK_STATUS) {
          timerStatus.textContent = SESSION_STATUS;
          timer = sessionTime * secondsInMinute;
          timerLength.textContent = displayTime(timer);
        }
      }, 1000);
    }
  }, 1000);
});

resetButton.addEventListener("click", () => {
  playStatus = false;
  clearInterval(timerId);
    clearInterval(delayId);
    sessionTime = SESSION_TIME;
breakTime = BREAK_TIME;
timer=sessionTime*secondsInMinute;
sessionLength.textContent = sessionTime;
  breakLength.textContent = breakTime;
  timerStatus.textContent = SESSION_STATUS;
  timerLength.textContent = displayTime(timer);
  alarmSound.load();
});
