/**
 * Created by 永亮 on 2015/9/19.
 */


!function(){
  var Stage;
  function Stage(){
    new createjs.Stage.call(this)
    return this;
  }
  Stage.prototype = {
    reSetSize : function(){
      alert(1)
    }
  }
  Stage = new Stage();
  //Stage.reSetSize();
}();
