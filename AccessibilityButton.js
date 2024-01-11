var MenuButton = videojs.getComponent('MenuButton');
var MenuItem = videojs.getComponent('MenuItem');

var AccessibilityButton extends MenuButton
  {
    createItems: function() {
      // Must return an array of `MenuItem`s
      // Options passed in `addChild` are available at `this.options_`
      AccessibilityButton.addChild('AccessibilityMenu');
      AccessibilityButton.addChild('SubsCapsMenuItem');
      AccessibilityButton.addChild('CaptionSettingsMenuItem');
      AccessibilityButton.addChild('OffTextTrackMenuItem');
      AccessibilityButton.addChild('AudioTrackMenuItem');
      return this.options().myItems.map(function(i) {
        var item = new MenuItem(this.player(), {label: i.name});
        item.handleClick = function() { /* ... */ };
        return item;
      });
    }
  }
);

// Register as a component, so it can be added
videojs.registerComponent('AccessibilityButton', AccessibilityButton);
var vPlayer = this,
    controlBar,
    insertBeforeNode;

// +++ Get controlbar and insert elements +++
  controlBar = vPlayer.$(".vjs-control-bar");
  // Get the element to insert buttons in front of in conrolbar
  insertBeforeNode = vPlayer.$(".vjs-picture-in-picture-control");

  // Insert the button div in proper location
  controlBar.insertBefore(AccessibilityButton, insertBeforeNode);

// Use `addChild` to add an instance of the new component, with options
player.controlBar.addChild('AccessibilityButton', {
  title: 'Accessibility Menu',
  myItems: [{name: 'Hello'}, {name: 'World'}]
});
