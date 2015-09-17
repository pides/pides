/**
 * Created by 永亮 on 2015/9/15.
 */

!function (window) {
  window.onload = gameLoad();
  var canvas, stage, top, menu, content;
  function gameLoad(e) {
    //获取画布
    canvas = document.getElementById('canvas');
    //创建场景
    stage = new createjs.Stage(canvas);
    top = new createjs.Container();
    !function(){
      var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, canvas.width, 30);
      var shape = new createjs.Shape(graphics);
      top.addChild(shape);
      stage.addChild(top);
    }()
    menu = new createjs.Container();
    !function(){
      var graphics = new createjs.Graphics().beginFill("#ff00ff").drawRect(0, 0, canvas.width, 30);
      var shape = new createjs.Shape(graphics);
      menu.y = canvas.height-30;
      menu.addChild(shape);
      stage.addChild(menu);
    }()
    content = new createjs.Container();
    !function(){
      var EZ = document.createElement('img');
      EZ.src = 'bg.png';
      EZ.onload = function(e){
        var graphics = new createjs.Graphics().beginBitmapFill(EZ).drawRect(0, 0, canvas.width, canvas.height-60);
        var shape = new createjs.Shape(graphics);
        content.y = 30;
        content.addChild(shape);
        stage.addChild(content);
        stage.update(e);
      }
    }();
    stage.update(e);
    console.log(stage)
  }
}(window);