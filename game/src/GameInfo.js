"use strict"

class GameInfo extends  ui.GameInfoUI{
    constructor(){
        super();
        //注册按钮点击事件，点击后暂停游戏
        this.pauseBtn.on("click", this, this.onPauseBtnClick);
        //初始化UI显示
        this.reset();
    }
    reset(){
        this.gameRestart.alpha = 0;
        this.infoLabel.text = "";
        this.hp(5);
        this.level(0);
        this.score(0);
    }
    onPauseBtnClick(e){
        //阻止事件冒泡
        e.stopPropagation();
        //暂停游戏
        this.infoLabel.text = "游戏已暂停，任意地方恢复游戏";
        gameInstance.pause();
        Laya.stage.once("click", this, this.onStageClick);
    }
     onStageClick() {
        this.infoLabel.text = "";
        gameInstance.resume();
    }
    hp(val){    
        this.hpLabel.text = 'HP:' + val;
    }
    level(val){
        this.levelLabel.text = 'Level:' + val;
    }
    score(val){
        this.scoreLabel.text = 'Score:' + val;
    }
}