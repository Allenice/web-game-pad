/*
 *
 * */
define([], function() {
  var designResolution = {width: 1280, height: 720},
    designRatio = designResolution.width / designResolution.height;

  var app = {
    init: function () {
      this._cacheDom();
      this._bindEvent();

      // layout the buttons
      this._layout();
    },

    _cacheDom: function () {
      this.$container = $('#container');
      this.$gamepad = $('#gamepad');
    },

    _bindEvent: function () {
      var _this = this;

      // prevent IOS browser bouncing
      document.ontouchmove = function(event){
        event.preventDefault();
      }

      // UC browser user-select bug
      document.ontouchstart = function (e) {
        e.preventDefault();
      }

      $(window).on('resize', function () {
        _this._layout();
      });

    },

    _layout: function () {
      var winSize = {width: this.$container.width(), height: this.$container.height()},
        winRatio = winSize.width / winSize.height,
        gamepadWidth,
        gamepadHeight;

      gamepadWidth = winRatio > designRatio ? winSize.height * designRatio: winSize.width ;
      gamepadHeight = winRatio > designRatio ? winSize.height : winSize.width / designRatio;

      this.$gamepad.width(gamepadWidth);
      this.$gamepad.height(gamepadHeight);

      if(Math.abs(designRatio - winRatio) * 100 > 1 && winRatio < designRatio) {
        this.$gamepad.css('margin-top', (winSize.height - gamepadHeight) / 2);
      } else {
        this.$gamepad.css('margin-top',0);
      }

      // calc base font size (height:360px = 100%)
      $('html,body').css('font-size', (gamepadHeight/360 * 100) + '%');
    }
  };
  
  return app;
});