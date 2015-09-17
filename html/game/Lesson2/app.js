/**
 * Created by 永亮 on 2015/9/15.
 */



!function(window){
    window.onload = gameLoad();
    var canvas, stage;
    function gameLoad() {
        //获取画布
        canvas = document.getElementById('canvas');
        //创建场景
        stage = new createjs.Stage(canvas);
        var text = new createjs.Text('欢迎光临','36px Arial','#fff');
        text.x = 1000;
        text.y = 400;
        stage.addChild(text);

        var shape = new createjs.Shape();

        shape.graphics.clear().beginFull('#f00').drawRect(-10,-10,text.getMeasuredWidth()+20,50);
        shape.x = text.x;
        shape.y = text.y;
        stage.addChildAt(shape,0);
        createjs.Ticker.setFPS(100);
        createjs.Ticker.addEventListener('tick',function(){
            stage.update();
        });
    }
}(window);