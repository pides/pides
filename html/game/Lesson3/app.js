/**
 * Created by 永亮 on 2015/9/15.
 */



!function (window) {
  window.onload = gameLoad();
  var canvas, stage;

  function gameLoad() {
    //获取画布
    canvas = document.getElementById('canvas');
    //创建场景
    stage = new createjs.Stage(canvas);
    var C =new createjs.Container();
    var img = document.createElement('img');
    img.src = '1.jpg';
    img.width = 10;
    img = new createjs.Bitmap(img);
    img.scaleX = 0.5;
    img.scaleY = 0.5;
    C.addChild(img);
    createjs.Ticker.setFPS(100);
    createjs.Ticker.addEventListener('tick',function(){
      stage.update();
    });
    C.x = 100;
    stage.addChild(C);
    stage.update();
  }
}(window);