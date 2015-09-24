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
    },
    _bindEvent: function () {
      var _this = this;
      window.addEventListener('resize', function () {
        _this.reSetSize();
      });
    },
    createShape: function () {
      return new createjs.Shape();
    },
    createContainer: function (names) {
      if (typeof  names == 'object') {
        for (var i = 0; i < names.length; i++) {
          this.createContainer(names[i]);
        }
      }
      this[names + 'Container'] = new createjs.Container();
      this.Stage.addChild(this[names + 'Container']);
      return this;
    },
    addChildToContainer: function (child, target, index) {
      target = this[target + 'Container'];
      target.addChild(child);
      console.log(target);
      if (index)target.setChildIndex(child, index);
      return this;
    },
    getSourceRect: function (obj, x, y, w, h) {
      obj = obj.clone();
      obj.setBounds(x, y, w, h);
      obj.sourceRect = obj.getBounds();
      return obj;
    }
  };

  //获取画布对象canvas
  canvas = document.getElementById(id);
  //生成场景
  stage = new stage(canvas);
  //监听随时更新场景事件
  createjs.Ticker.addEventListener('tick', stage.Stage);
  //引入公用图片
  var common = new createjs.Bitmap('common.png');

  //底层容器,顶部容器,底部容器
  stage.createContainer(['bottom', 'top', 'down']);


  //TODO bottom
  //图片草地对象
  var mapFg = new createjs.Bitmap('map_fg.jpg');
  mapFg.y = 600;
  //将图片 草地 添加入 底层容器
  stage.addChildToContainer(mapFg, 'bottom', 0);
//插入塔
  for (var i = 0; i < 200; i++) {
    var ta = stage.getSourceRect(common, 123, 354, 466, 105);
    ta.x = 9;
    ta.y = mapFg.y - (105 * (i + 1));
    stage.addChildToContainer(ta, 'bottom', 0);
  }
  //TODO 测试点击事件对象
  var count = 0;
  var text = new createjs.Text('已点击 …… ' + count, '36px Arial', '#f00');
  text.y = 200;
  stage.bottomContainer.addChild(text);

  //TODO top
  //设置top x位置
  stage.topContainer.x = guide;
  //创建top遮层
  var topMask = stage.createShape();
  topMask.alpha = 0.3;
  topMask.graphics.beginFill('#000').drawRoundRect(0, 0, stage.stageWidth - guide * 2, 95, 15);
  stage.addChildToContainer(topMask, 'top', 1);

  //用户头像
  var photo = new createjs.Bitmap('photo.jpg');
  photo.x = 21;
  photo.y = 18;
  photo.scaleX = photo.scaleY = 0.3;
  stage.addChildToContainer(photo, 'top', 2);

  //用户详情界面图
  var infoBg = new createjs.Bitmap('info_bg.png');
  infoBg.x = 3;
  stage.addChildToContainer(infoBg, 'top', 3);
//用户头右下角问号
  var question = stage.getSourceRect(common, 590, 432, 48, 48);
  question.x = 60;
  question.y = 55;
  question.scaleX = question.scaleY = 0.7;
  stage.addChildToContainer(question, 'top', 4);

  //TODO down
  //创建down遮层
  var downMask = stage.createShape();
  downMask.alpha = 0.3;
  downMask.graphics.beginFill('#000').drawRoundRect(0, 0, stage.stageWidth - guide * 2, guideHeight, 15);
  downMask.x = guide;
  stage.addChildToContainer(downMask, 'down', 1);
  stage.downContainer.y = stage.stageHeight - guideHeight - 5;
  //菜单栏图片位置
  var btn = [
    //勇士
    {
      x: 802, y: 146, callback: function () {
    }
    },
    //士兵
    {
      x: 934, y: 72, callback: function () {

    }
    },
    //装备
    {
      x: 873, y: 144, callback: function () {
    }
    },
    //排行'
    {
      x: 934, y: 0, callback: function () {
    }
    },
    //成就
    {
      x: 701, y: 222, callback: function () {
    }
    },
    //商店
    {
      x: 946, y: 144, callback: function () {
    }
    }
  ];
  //菜单栏
  var rect;
  var btnSize = 72 * stage.multiple;
  var offset = (stage.stageWidth - guide * 2) / 6;
  for (var i = 0; i < btn.length; i++) {
    var _thisBtn = stage.getSourceRect(common, btn[i].x, btn[i].y, 72, 72);
    _thisBtn.y = guideHeight / 2 - (btnSize / 2);
    _thisBtn.x = parseInt((menuBtnOffset * stage.multiple) * (i + 1) + (i * btnSize));
    _thisBtn.scaleX = _thisBtn.scaleY = stage.multiple;
    _thisBtn.callback = btn[i].callback;
    stage.addChildToContainer(_thisBtn, 'down', 2);
  }
}(window, 'canvas');
