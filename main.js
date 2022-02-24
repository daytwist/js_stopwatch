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

  function setClassInitialState() {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").addClass("disabled");
  }

  function setClassRunState() {
    $("#start").addClass("disabled");
    $("#stop").removeClass("disabled");
    $("#reset").addClass("disabled");
  }

  function setClassStopState() {
    $("#start").removeClass("disabled");
    $("#stop").addClass("disabled");
    $("#reset").removeClass("disabled");
  }

  $("#start").click(function() {
    if ($(this).hasClass("disabled")) {
      return;
    }
    setClassRunState();
    startTime = Date.now();
    runTimer();
  });

  $("#stop").click(function() {
    if ($(this).hasClass("disabled")) {
      return;
    }
    setClassStopState();
    elapsedTime += currentTime - startTime;
    clearTimeout(timeoutId);
  });

  $("#reset").click(function() {
    if ($(this).hasClass("disabled")) {
      return;
    }
    setClassInitialState();
    elapsedTime = 0;
    $("#time").text("00:00:00");
  });

});
