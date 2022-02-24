'use strict'
$(document).ready(function() {

  let startTime = 0;
  let currentTime = 0;
  let elapsedTime = 0;
  let timeoutId;

  function runTimer() {
    currentTime = Date.now();
    showTime();
    timeoutId = setTimeout(() => { runTimer(); }, 10);
  }

  function showTime() {
    let d = new Date(currentTime - startTime + elapsedTime);
    const min = String(d.getMinutes()).padStart(2, '0');
    const sec = String(d.getSeconds()).padStart(2, '0');
    const msec = String(Math.floor(d.getMilliseconds() / 10)).padStart(2, '0');
    $("#time").text(`${min}:${sec}:${msec}`);
  }

  function setInitialState() {
    $("#start").prop('disabled', false);
    $("#stop").prop('disabled', true);
    $("#reset").prop('disabled', true);
  }

  function setRunState() {
    $("#start").prop('disabled', true);
    $("#stop").prop('disabled', false);
    $("#reset").prop('disabled', false);
  }

  function setStopState() {
    $("#start").prop('disabled', false);
    $("#stop").prop('disabled', true);
    $("#reset").prop('disabled', false);
  }

  $("#start").click(function() {
    if ($(this).prop('disabled') === true) {
      return;
    }
    setRunState();
    startTime = Date.now();
    runTimer();
  });

  $("#stop").click(function() {
    if ($(this).prop('disabled') === true) {
      return;
    }
    setStopState();
    elapsedTime += currentTime - startTime;
    clearTimeout(timeoutId);
  });

  $("#reset").click(function() {
    if ($(this).prop('disabled') === true) {
      return;
    }
    setInitialState();
    elapsedTime = 0;
    $("#time").text("00:00:00");
    clearTimeout(timeoutId);
  });

});
