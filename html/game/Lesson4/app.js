/**
 * Created by 永亮 on 2015/9/19.
 */


!function (window, id) {
  var stage, canvas,
      menuX = 2,
      menuHeight = 100,
      menuBtnOffset = 6.5;
  function stage(t) {
    this.t = t;
    this.init();
    return this;
  }

  stage.prototype = {
    init: function () {
      this.stageWidth = parseFloat(this.t.width);
      this.stageHeight = parseFloat(this.t.height);
      this.Stage = new createjs.Stage(this.t);
      this._bindEvent();
      this.reSetSize();
    },
    reSetSize: function () {
      var client = this._getClient();
      if(this.stageHeight>client.height){
        this.stageHeight = this.t.height = client.height;
        console.log(this.t.parentNode);
        this.t.parentNode.style.height = client.height + 'px';
      }
    },
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
  };
  canvas = document.getElementById(id);
  stage = new stage(canvas);
  var count = 0;
  var text = new createjs.Text('已点击 …… ' + count, '36px Arial', '#f00');
  var textShape = stage.createShape();
  var menu = new createjs.Container();
  var menuShape = stage.createShape();
  menu.addChild(menuShape);
  menuShape.id = 'menu';
  menuShape.alpha = 0.3;
  menuShape.graphics.beginFill('#000').drawRoundRect (0,0,stage.stageWidth-menuX*2,menuHeight,15);
  menu.x = menuX;
  menu.y = stage.stageHeight-menuHeight-5;
  var menuBtn = new Image();
  menuBtn.src = 'common.png';
  menuBtn.onload = function(){
    menuBtn = new createjs.Bitmap(menuBtn);
    var btn = [
        //勇士
      {x : 802,y : 146,callback:function(){
        alert('勇士');
      }},
        //士兵
      {x:934,y:72,callback:function(){
        alert('士兵');
      }},
        //装备
      {x:873, y:144,callback:function(){
        alert('装备');
      }},
      //排行'
      {x:934,y:0,callback:function(){
        alert('排行');
      }},
        //成就
      {x:701, y:222,callback:function(){
        alert('成就');
      }},
      //商店
      {x:946, y:144,callback:function(){
        alert('商店');
      }}
    ];
    var rect;
    for(var i = 0;i<btn.length;i++){
      rect = new createjs.Rectangle(btn[i].x,btn[i].y,72,72);
      var _thisBtn = menuBtn.clone();
      _thisBtn.sourceRect = rect;
      _thisBtn.y = menuHeight /2 - (72/2);
      _thisBtn.x = parseInt(menuBtnOffset*(i+1) + (i*72));
      _thisBtn.callback = btn[i].callback;
      menu.addChild(_thisBtn);
    }
    menu.addEventListener('click',function(e){
      if(e.target.callback)e.target.callback();
    })
  };

  textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);
  stage.Stage.addChild(menu);
  stage.Stage.addChild(textShape);
  stage.Stage.addChild(text);
  menu.addEventListener('click', function (e) {
    text.text = '已点击 …… ' + (++count);
    textShape.graphics.beginFill('#ff0').drawRect(-10, -10, text.getMeasuredWidth() + 10, text.getMeasuredHeight() + 10);
  });
  createjs.Ticker.addEventListener('tick', stage.Stage)
}(window, 'canvas');
