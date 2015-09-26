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

  function isPC()
  {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
  }
  var touchEvents = {
    touchstart: "touchstart",
    touchmove: "touchmove",
    touchend: "touchend",

    /**
     * @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
     */
    initTouchEvents: function () {
      if (isPC()) {
        this.touchstart = "mousedown";
        this.touchmove = "mousemove";
        this.touchend = "mouseup";
      }
    }
  };
  touchEvents.initTouchEvents();
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
      if (index)target.setChildIndex(child, index);
      return this;
    },
    getSourceRect: function (obj, x, y, w, h) {
      obj = obj.clone();
      obj.setBounds(x, y, w, h);
      obj.sourceRect = obj.getBounds();
      return obj;
    },
    getContainer: function (target) {
      return this[target + 'Container'];
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

  //bottom 的拖动事件
  var bottom = stage.getContainer('bottom');
  var mouseDown = false;
  var bottomY = 0;
  var mouseY;
  var mY;
  canvas.addEventListener(touchEvents.touchstart,function(e){
    bottomY = bottom.y;
    mouseY = e. pageY;
    mouseDown = true;
  });
  var bottomHeight,BY;
  canvas.addEventListener(touchEvents.touchmove,function(e){
    if(!mouseDown)return;
    mY = mouseY - e. pageY;
    BY = bottomY+mY;
    if(BY>Math.abs(ta.y)+200){
      BY = Math.abs(ta.y)+200
    }
    if(BY<-100){
      BY =-100;
    }
    bottom.y =BY;
  });
  canvas.addEventListener(touchEvents.touchend,function(){
    mouseDown = false;
  });
  window.bottom = bottom;
  //图片草地对象
  var mapFg = new createjs.Bitmap('map_fg.jpg');
  mapFg.y = 550 * stage.multiple;
  mapFg.scaleX = mapFg.scaleY = stage.multiple;

  //将图片 草地 添加入 底层容器
  stage.addChildToContainer(mapFg, 'bottom', 0);
  //引入层数
  var taNum = new createjs.Bitmap('num.png');
  var numOffset = [
    {
      x: 0, y: 0
    },
    {
      x: 101.6, y: 0
    },
    {
      x: 50.8, y: 30
    },
    {
      x: 101.6, y: 30
    },
    {
      x: 25.4, y: 30
    },
    {
      x: 76.2, y: 0
    },
    {
      x: 25.4, y: 0
    },
    {
      x: 76.2, y: 30
    },
    {
      x: 50.8, y: 0
    },
    {
      x: 0, y: 30
    }
  ];
//插入塔
  var ta, i, s, numLength, numLengthOffset, numObj, numberOffset, l;

  for (i = 0; i < 20; i++) {
    ta = stage.getSourceRect(common, 123, 354, 466, 105);
    stage.addChildToContainer(ta, 'bottom', 0);
    ta.x = 9 * stage.multiple;
    s = (1 + i + '');
    numLength = s.length;
    numberOffset = ta.x + 466 / 2 - (25.4 * numLength);
    ta.y = mapFg.y - (104 * (i + 1)) * stage.multiple;
    for (l = 0; l < numLength; l++) {
      numLengthOffset = numOffset[s[l]];
      numObj = stage.getSourceRect(taNum, numLengthOffset.x, numLengthOffset.y, 25.4, 30);
      numObj.x = (numberOffset + (l * 25.4)) * stage.multiple;
      numObj.y = ta.y + 35 * stage.multiple;
      numObj.scaleX = numObj.scaleY = 1.5 * stage.multiple;
      stage.addChildToContainer(numObj, 'bottom', 99999);
    }
    ta.scaleX = ta.scaleY = stage.multiple;
  }
  //TODO top
  //设置top x位置
  stage.topContainer.x = guide;
  //创建top遮层
  var topMask = stage.createShape();
  topMask.alpha = 0.3;
  topMask.graphics.beginFill('#000').drawRoundRect(0, 0, stage.stageWidth - guide * 2, 95 * stage.multiple, 15);
  stage.addChildToContainer(topMask, 'top', 1);

  //用户头像
  var photo = new createjs.Bitmap('photo.jpg');
  photo.x = 20 * stage.multiple;
  photo.y = 15 * stage.multiple;
  photo.scaleX = photo.scaleY = (0.33 * stage.multiple);
  stage.addChildToContainer(photo, 'top', 2);

  //用户详情界面图
  var infoBg = new createjs.Bitmap('info_bg.png');
  infoBg.x = 3;
  infoBg.scaleX = infoBg.scaleY = stage.multiple;
  stage.addChildToContainer(infoBg, 'top', 3);
//用户头右下角问号
  var question = stage.getSourceRect(common, 590, 432, 48, 48);
  question.x = 60 * stage.multiple;
  question.y = 55 * stage.multiple;
  question.scaleX = question.scaleY = (0.7 * stage.multiple);
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
window.ontouchmove =  function (event){ event.preventDefault();};
