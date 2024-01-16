	var player = videojs('videojs-settings-menu-player', {
		'playbackRates': [0.5, 1, 1.5, 2],
		controlBar: {
			children: {
				'playToggle':{},
				'muteToggle':{},
				'volumeControl':{},
				'currentTimeDisplay':{},
				'timeDivider':{},
				'durationDisplay':{},
				'liveDisplay':{},

				'flexibleWidthSpacer':{},
				'progressControl':{},

				'settingsMenuButton': {
					entries : [
						'subtitlesButton',
            'CaptionSettingsMenuItem',
            'OffTextTrackMenuItem',
						'SubsCapsMenuItem',
            'AudioTrackMenuItem'
					]
				},
				'fullscreenToggle':{}
			}
		}
	});
