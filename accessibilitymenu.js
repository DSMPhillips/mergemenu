

videojs.registerPlugin('AccessibilityButton', function() {
  // +++ Create divs for buttons +++
  var vPlayer = this,
    controlBar,
    insertBeforeNode,
    newElementAM = document.createElement("div");

  // +++ Assign properties to elements and assign to parents +++
    newElementAM.innerHTML = "<button class='vjs-control vjs-button vjs-accessibilty' type='button' title='Accessibility Menu' aria-disabled='false'><span class='vjs-icon-placeholder' aria-hidden='true'></span><span class='vjs-control-text' aria-live='polite'>Select Captions and Descriptive Audio</span></button>";

    AccessibilityButton.addChild('AccessibilityMenu');
    AccessibilityButton.addChild('SubsCapsMenuItem');
    AccessibilityButton.addChild('CaptionSettingsMenuItem');
    AccessibilityButton.addChild('OffTextTrackMenuItem');
    AccessibilityButton.addChild('AudioTrackMenuItem');

    // +++ Get controlbar and insert elements +++
  controlBar = vPlayer.$(".vjs-control-bar");
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = vPlayer.$(".vjs-fullscreen-toggle");

   // Insert the button div in proper location
  controlBar.insertBefore(newElementAM, insertBeforeNode);

});
