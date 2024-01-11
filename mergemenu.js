(function videojs_init(element) {
    var player = videojs(element, {
        controls: true,
        autoplay: false,
        aspectRatio: '16:9',
        html5: {
            hls: {
                overrideNative: true
            },
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            nativeTextTracks: false
        }
    }, function() {
        var player = this;

        player.qualitySelector();

        player.src({
                src: player.el().dataset.hlsVideoUrl,
                type: 'application/x-mpegURL',
                overrideNative: true
            });
    });

    return player;
});

videojs_init(document.querySelector('.video-js'));


/*! @name videojs-quality-selector @version 0.0.0 @license Apache-2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, global.videojsQualitySelector = factory(global.videojs));
}(this, function (videojs) { 'use strict';
    videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;
    var version = "0.0.0";
    var defaults = {}; // Cross-compatibility for Video.js 5 and 6.
    var registerPlugin = videojs.registerPlugin || videojs.plugin; // const dom = videojs.dom || videojs;
    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
    var inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var VideoJsButtonClass = videojs.getComponent('MenuButton');
    var VideoJsMenuClass = videojs.getComponent('Menu');
    var VideoJsComponent = videojs.getComponent('Component');
    var VideoJsMenuItemClass = videojs.getComponent('MenuItem');
    var Dom = videojs.dom;

    /**
     * Extend vjs button class for quality button.
     */
    var AccessibilityMenu = function (_VideoJsButtonClass) {
        inherits(AccessibilityMenu, _VideoJsButtonClass);

        /**
         * Button constructor.
         *
         * @param {Player} player - videojs player instance
         */
        function AccessibilityMenu(player) {
            classCallCheck(this, AccessibilityMenu);
            return possibleConstructorReturn(this, _VideoJsButtonClass.call(this, player, {}));
        }

        /**
         * Creates button items.
         *
         * @return {Array} - Button items
         */
        AccessibilityMenu.prototype.createItems = function createItems() {
            return [];
        };

        /**
         * Create the menu and add all items to it.
         *
         * @return {Menu}
         *         The constructed menu
         */
        AccessibilityMenu.prototype.createMenu = function createMenu() {
            var menu = new VideoJsMenuClass(this.player_, { menuButton: this });

            this.hideThreshold_ = 0;

            this.items = this.createItems();

            if (this.items) {
                // Add menu items to the menu
                for (var i = 0; i < this.items.length; i++) {
                    menu.addItem(this.items[i]);
                }
            }

            return menu;
        };

        return AccessibilityMenu;
    }(VideoJsButtonClass);

    var AccessibilityMenuItem = function (_VideoJsMenuItemClass) {
        inherits(AccessibilityMenuItem, _VideoJsMenuItemClass);

        /**
         * Menu item constructor.
         *
         * @param {Player} player - vjs player
         * @param {Object} item - Item object
         * @param {AccessibilityMenu} AccessibilityMenu - The containing button.
            @param {OffTextTrackMenuItem} OffTextTrackMenuItem
            @param {CaptionSettingsMenuItem} CaptionSettingsMenuItem
            @param {SubsCapsMenuItem} SubsCapsMenuItem
            @param {AudioTrackMenuItem} AudioTrackMenuItem
         */
        function AccessibilityMenuItem(player, item, AccessibilityMenu, plugin) {
            classCallCheck(this, AccessibilityMenuItem);

            var _this = possibleConstructorReturn(this, _VideoJsMenuItemClass.call(this, player, {
                label: item.label,
                selectable: true,
                selected: item.selected || false
            }));

            _this.item = item;
            _this.AccessibilityMenu = AccessibilityMenu;
            _this.plugin = plugin;
            return _this;
        }

        /**
         * Click event for menu item.
         */
        AccessibilityMenuItem.prototype.handleClick = function handleClick() {
            // Reset other menu items selected status.
            for (var i = 0; i < this.AccessibilityMenu.items.length; ++i) {
                this.AccessibilityMenu.items[i].selected(false);
            }
            
            // Set this menu item to selected, and set quality.
            this.plugin.setQuality(this.item);
            this.selected(true);
        };

        return AccessibilityMenuItem;
    }(VideoJsMenuItemClass);

    /**
     * Function to invoke when the player is ready.
     *
     * This is a great place for your plugin to initialize itself. When this
     * function is called, the player will have its DOM and child components
     * in place.
     *
     * @function onPlayerReady
     * @param    {Player} player
     *           A Video.js player object.
     *
     * @param    {Object} [options={}]
     *           A plain object containing options for the plugin.
     */
}
);
);

