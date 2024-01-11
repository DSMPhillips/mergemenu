

videojs.registerPlugin('AccessibilityButton', function() {
  // +++ Create divs for buttons +++
  var vPlayer = this;
    AccessibilityButton.addChild('AccessibilityMenu');
    AccessibilityButton.addChild('SubsCapsMenuItem');
    AccessibilityButton.addChild('CaptionSettingsMenuItem');
    AccessibilityButton.addChild('OffTextTrackMenuItem');
    AccessibilityButton.addChild('AudioTrackMenuItem');

    // +++ Get controlbar and insert elements +++
  controlBar = vPlayer.$(".vjs-control-bar");
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = vPlayer.$(".vjs-fullscreen-toggle");
});
