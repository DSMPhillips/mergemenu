videojs.registerPlugin('testmenu', function() {
  // +++ Create divs for buttons +++
  var vPlayer = this,
    controlBar,
    insertBeforeNode,
    newElementtm = document.createElement("div"),
    newElementtm2 = document.createElement("div");

  // +++ Assign properties to elements and assign to parents +++
  newElementtm.innerHTML = "<button class='vjs-control vjs-button vjs-skip-back' type='button' title='Skip Back 15 Seconds' aria-disabled='false'><span class='vjs-icon-placeholder' aria-hidden='true'></span><span class='vjs-control-text' aria-live='polite'>Skip Back 15 Seconds</span></button>";
  newElementtm2.innerHTML = "<button class='vjs-control vjs-button vjs-skip-ahead' type='button' title='Skip Ahead 15 Seconds' aria-disabled='false'><span class='vjs-icon-placeholder' aria-hidden='true'></span><span class='vjs-control-text' aria-live='polite'>Skip Ahead 15 Seconds</span></button>";
  
  // +++ Get controlbar and insert elements +++
  controlBar = vPlayer.$(".vjs-control-bar");
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = vPlayer.$(".vjs-picture-in-picture-control");

  // Insert the button div in proper location
  controlBar.insertBefore(newElementtm, insertBeforeNode);
  controlBar.insertBefore(newElementtm2, insertBeforeNode);

  // +++ Add event handlers to jump back or forward +++
  // Back button logic, don't jump to negative times
  newElementtm2.addEventListener("click", function() {
    var newTime,
      rewindAmt = jumpAmount,
      videoTime = vPlayer.currentTime();
    if (videoTime >= rewindAmt) {
      newTime = videoTime - rewindAmt;
    } else {
      newTime = 0;
    }
    vPlayer.currentTime(newTime);
  });

  // Forward button logic, don't jump past the duration
  newElementtm.addEventListener("click", function() {
    var newTime,
      forwardAmt = jumpAmount,
      videoTime = vPlayer.currentTime(),
      videoDuration = vPlayer.duration();
    if (videoTime + forwardAmt <= videoDuration) {
      newTime = videoTime + forwardAmt;
    } else {
      newTime = videoDuration;
    }
    vPlayer.currentTime(newTime);
  });
});
