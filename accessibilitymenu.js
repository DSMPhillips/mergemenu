var AccessibilityButton = bcplayerRNIpmFpKyq.getChild('ControlBar').addChild('Accessibility Options', {
  clickHandler: function(event) {
    videojs.log('Clicked');
  }
});

AccessibilityButton.setIcon('menu');

var AccessibilityMenu = new Component(player);
AccessibilityButton.addChild('AccessibilityMenu');
AccessibilityMenu.addChild('SubsCapsMenuItem');
AccessibilityMenu.addChild('CaptionSettingsMenuItem');
AccessibilityMenu.addChild('OffTextTrackMenuItem');
AccessibilityMenu.addChild('AudioTrackMenuItem');

console.log(button.el());
