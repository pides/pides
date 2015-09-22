/**
 * Created by 永亮 on 2015/9/19.
 */


!function (window, id) {
  var stage, canvas,
      guide = 2,
      guideHeight = 80,
      menuBtnOffset = 6.5;

  function stage(t) {
    this.t = t;
    this.init();
    return this;
  }

  stage.prototype = {
    _maxStageWidth: 480,
    multiple: 1,
    init: function () {
      this.stageWidth = parseFloat(this.t.width);
      this.stageHeight = parseFloat(this.t.height);
      this.reSetSize();
      this.Stage = new createjs.Stage(this.t);
      this._bindEvent();
    },
    reSetSize: function () {
      var client = this._getClient();
      if (this.stageHeight > client.height) {
        this.stageHeight = this.t.height = client.height;
        this.t.parentNode.style.height = client.height + 'px';
      }
      if (client.width < this._maxStageWidth) {
        this.multiple = client.width / this._maxStageWidth;
        this.stageWidth = this.t.width = this._maxStageWidth * this.multiple;
        this.t.parentNode.style.width = this.stageWidth + 'px';
      }
      guideHeight = guideHeight * this.multiple;
      this.stageWidth = parseFloat(this.t.width);
      this.stageHeight = parseFloat(this.t.height);
    }
    ,
    _getClient: function () {
      var client = document.documentElement;
      return {
        width: client.clientWidth,
        height: client.clientHeight
      }
    }
    ,
    _bindEvent: function () {
      var _this = this;
      window.addEventListener('resize', function () {
        _this.reSetSize();
      });
    }
    ,
    createShape: function () {
      return new createjs.Shape();
    }
    ,
  };
  canvas = document.getElementById(id);
  stage = new stage(canvas);
  var count = 0;
  var text = new createjs.Text('已点击 …… ' + count, '36px Arial', '#f00');
  text.y = 200;
  var top = new createjs.Container();
  var userInfo = stage.createShape();
  top.addChild(userInfo);
  userInfo.alpha = 0.3;
  userInfo.graphics.beginFill('#000').drawRoundRect(0, 0, stage.stageWidth - guide * 2, guideHeight, 15);
  top.x = guide;
  stage.Stage.addChild(top);


  var menu = new createjs.Container();
  var menuShape = stage.createShape();
  menu.addChild(menuShape);
  menuShape.id = 'menu';
  menuShape.alpha = 0.3;
  menuShape.graphics.beginFill('#000').drawRoundRect(0, 0, stage.stageWidth - guide * 2, guideHeight, 15);
  menu.x = guide;
  menu.y = stage.stageHeight - guideHeight - 5;
  var menuBtn = new Image();
  menuBtn.src = 'common.png';
  menuBtn.onload = function () {
    menuBtn = new createjs.Bitmap(menuBtn);
    var btn = [
      //勇士
      {
        x: 802, y: 146, callback: function () {
        text.text = '已点击 …勇士… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);
      }
      },
      //士兵
      {
        x: 934, y: 72, callback: function () {
        text.text = '已点击 …士兵… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);

      }
      },
      //装备
      {
        x: 873, y: 144, callback: function () {
        text.text = '已点击 …装备… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);

      }
      },
      //排行'
      {
        x: 934, y: 0, callback: function () {
        text.text = '已点击 …排行… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);

      }
      },
      //成就
      {
        x: 701, y: 222, callback: function () {
        text.text = '已点击 …成就… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);

      }
      },
      //商店
      {
        x: 946, y: 144, callback: function () {
        text.text = '已点击 …商店… ' + (++count);
        textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);

      }
      }
    ];
    var rect;
    var btnSize = 72 * stage.multiple;
    var offset =  (stage.stageWidth - guide * 2) / 6;
    for (var i = 0; i < btn.length; i++) {
      rect = new createjs.Rectangle(btn[i].x, btn[i].y, 72, 72);
      var _thisBtn = menuBtn.clone();
      _thisBtn.sourceRect = rect;
      _thisBtn.y = guideHeight / 2 - (btnSize / 2);
      _thisBtn.x = parseInt((menuBtnOffset * stage.multiple) * (i + 1) + (i * btnSize));
      _thisBtn.scaleX = _thisBtn.scaleY = stage.multiple;
      _thisBtn.callback = btn[i].callback;
      menu.addChild(_thisBtn);
    }
    menu.addEventListener('touch', function (e) {
      if (e.target.callback)e.target.callback();
    })
  };
  var textShape = stage.createShape();
  textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);
  textShape.y = text.y;
  textShape.x = text.x;
  stage.Stage.addChild(menu);
  stage.Stage.addChild(textShape);
  stage.Stage.addChild(text);
  createjs.Ticker.addEventListener('tick', stage.Stage)
}
(window, 'canvas');
