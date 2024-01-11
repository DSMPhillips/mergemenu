function videojs_init(element) {
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
}

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
    var QualityMenu = function (_VideoJsButtonClass) {
        inherits(QualityMenu, _VideoJsButtonClass);

        /**
         * Button constructor.
         *
         * @param {Player} player - videojs player instance
         */
        function QualityMenu(player) {
            classCallCheck(this, QualityMenu);
            return possibleConstructorReturn(this, _VideoJsButtonClass.call(this, player, {}));
        }

        /**
         * Creates button items.
         *
         * @return {Array} - Button items
         */
        QualityMenu.prototype.createItems = function createItems() {
            return [];
        };

        /**
         * Create the menu and add all items to it.
         *
         * @return {Menu}
         *         The constructed menu
         */
        QualityMenu.prototype.createMenu = function createMenu() {
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

        return QualityMenu;
    }(VideoJsButtonClass);

    var QualityMenuItem = function (_VideoJsMenuItemClass) {
        inherits(QualityMenuItem, _VideoJsMenuItemClass);

        /**
         * Menu item constructor.
         *
         * @param {Player} player - vjs player
         * @param {Object} item - Item object
         * @param {QualityMenu} qualityMenu - The containing button.
         * @param {HlsQualitySelectorPlugin} plugin - This plugin instance.
         */
        function QualityMenuItem(player, item, qualityMenu, plugin) {
            classCallCheck(this, QualityMenuItem);

            var _this = possibleConstructorReturn(this, _VideoJsMenuItemClass.call(this, player, {
                label: item.label,
                selectable: true,
                selected: item.selected || false
            }));

            _this.item = item;
            _this.qualityMenu = qualityMenu;
            _this.plugin = plugin;
            return _this;
        }

        /**
         * Click event for menu item.
         */
        QualityMenuItem.prototype.handleClick = function handleClick() {
            // Reset other menu items selected status.
            for (var i = 0; i < this.qualityMenu.items.length; ++i) {
                this.qualityMenu.items[i].selected(false);
            }
            
            // Set this menu item to selected, and set quality.
            this.plugin.setQuality(this.item);
            this.selected(true);
        };

        return QualityMenuItem;
    }(VideoJsMenuItemClass);


    var QualitySelectorPlugin = function () {
        function QualitySelectorPlugin(player, options) {
            this.player = player;
            this.qualityParams = this.getQualityParams(player.el().dataset.qualityParams);

            if (this.qualityParams.length > 0) {
                this.createQualityMenu();
                this.onAddQualityLevel();
            }
        }

        QualitySelectorPlugin.prototype.getQualityParams = function getQualityParams(qualityParams) { 
            qualityParams = [
            	{quality: -1, level: -1, label: 'Auto'},
            	{quality: 234, level: 0, label: '234p'},
            	{quality: 360, level: 1, label: '360p'},
            	{quality: 540, level: 2, label: '540p'},
            	{quality: 720, level: 3, label: '720p'},
            	{quality: 1080, level: 4, label: '1080p'},
            ];
            if (!(qualityParams.length > 0)) {
                return [];
            }

            qualityParams.sort(function (current, next) {
                if (current.quality < next.quality) {
                    return -1;
                }
                if (current.quality > next.quality) {
                    return 1;
                }
                return 0;
            });

            return qualityParams; 
        };

        QualitySelectorPlugin.prototype.createQualityMenu = function createQualityMenu() {
            var player = this.player;

            this._qualityMenu = new QualityMenu(player);
            
            var placementIndex = player.controlBar.children().length - 2;
            var qualityMenuInstance = player.controlBar.addChild(this._qualityMenu, { componentClass: 'qualitySelector' }, placementIndex);

            qualityMenuInstance.addClass('vjs-quality-selector');
            qualityMenuInstance.menuButton_.$('.vjs-icon-placeholder').className += ' vjs-icon-quality';
            qualityMenuInstance.removeClass('vjs-hidden');
        };

        QualitySelectorPlugin.prototype.getQualityMenuItem = function getQualityMenuItem(item) {
            var player = this.player;

            return new QualityMenuItem(player, item, this._qualityMenu, this);
        };

        QualitySelectorPlugin.prototype.onAddQualityLevel = function onAddQualityLevel() {
            var _this = this;

            var player = this.player;
            var levels = this.qualityParams;
            var levelItems = [];

            var _loop = function _loop(i) {
                if (!levelItems.filter(function (_existingItem) {
                    return _existingItem.item && _existingItem.item.level === levels[i].level;
                }).length) {
                    var levelItem = _this.getQualityMenuItem.call(_this, {
                        label: levels[i].label,
                        level: levels[i].level,
                        quality: levels[i].quality,
                        selected: levels[i].level == -1 || false
                    });

                    levelItems.push(levelItem);
                }
            };

            for (var i = 0; i < levels.length; ++i) {
                _loop(i);
            }

            if (this._qualityMenu) {
                this._qualityMenu.createItems = function () {
                    return levelItems;
                };
                this._qualityMenu.update();
            }
        };
        
        QualitySelectorPlugin.prototype.getHls = function getHls() {
            return this.player.tech({ IWillNotUseThisInPlugins: true }).hls;
        };

        QualitySelectorPlugin.prototype.setQuality = function setQuality(qualityItem) {
            var player = this.player;
            this.getHls().representations().forEach(function(rep) {
               rep.enabled(rep.height === qualityItem.quality || qualityItem.quality === -1);
            });

            this._qualityMenu.unpressButton();
        };

        return QualitySelectorPlugin;
    }();

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

    var onPlayerReady = function onPlayerReady(player, options) {
            player.addClass('vjs-quality-selector');
            player.qualitySelector = new QualitySelectorPlugin(player, options);
    };

    /**
     * A video.js plugin.
     *
     * In the plugin function, the value of `this` is a video.js `Player`
     * instance. You cannot rely on the player being in a "ready" state here,
     * depending on how the plugin is invoked. This may or may not be important
     * to you; if not, remove the wait for "ready"!
     *
     * @function qualitySelector
     * @param    {Object} [options={}]
     *           An object of options left to the plugin author to define.
     */


    var qualitySelector = function qualitySelector(options) {
        var _this = this;

        this.ready(function () {
        onPlayerReady(_this, videojs.mergeOptions(defaults, options));
        });
    }; // Register the plugin with video.js.

    registerPlugin('qualitySelector', qualitySelector); // Include the version number.

    qualitySelector.VERSION = version;

    return qualitySelector;

}));


