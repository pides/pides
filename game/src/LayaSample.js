"use strict"




let Game = (function(){
    let HPs = [1,3,10],
        Speeds = [3,2,1],
        Radius = [15,30,70],
        bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        
    let level = 0,
        score = 0,
        levelUpScore = 10,
        bulletLevel = 0;
class Game{
     constructor(){
        Laya.init(480,852,Laya.WebGL);
        //加载图集资源
         //设置适配模式
 
        Laya.stage.scaleMode = "showall";
 
        //设置剧中对齐
 
        Laya.stage.alignH = "center";
 
        //设置横竖屏
 
        Laya.stage.screenMode = "vertical";
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
        Laya.Stat.show(0 ,50);
     }
     onLoaded() {
        var bg = new BackGround();
        Laya.stage.addChild(bg);
          //示例角色容器
        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        //创建一个主角（主战斗机）
        this.hero = new Role();
        //把主角添加到舞台上
        
        this.roleBox.addChild(this.hero);
         //创建游戏信息UI
        this.gameInfo = new GameInfo();
        //添加到舞台上
        Laya.stage.addChild(this.gameInfo);

        this.restart();
    }
    restart(){
        //开始
        levelUpScore = 10;
        bulletLevel = score = level = 0;
        this.hero.init('hero', 0, 5, 0, 30);
        this.hero.pos(240, 700);
        this.hero.shootType = 1;
        this.hero.shootInterval = 400;
        this.hero.visible = true;
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role = this.roleBox.getChildAt(i);
            if (role != this.hero) {
                role.removeSelf();
                //回收之前，重置属性信息
                role.visible = true;
                //回收到对象池
                Laya.Pool.recover("role", role);
            }
        }
        this.gameInfo.reset();
        this.resume();
    }
    pause(){
        Laya.timer.clear(this, this.onLoop);
        //移除舞台的鼠标移动事件监听
        Laya.stage.off("mousemove", this, this.onMouseMove);
    }
    resume() {
        //创建游戏主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
        //监听舞台的鼠标移动事件
        Laya.stage.on("mousemove", this, this.onMouseMove);
    }
    onLoop(){
        let role;
        for (var n = this.roleBox.numChildren - 1; n > -1; n--) {
            role = this.roleBox.getChildAt(n);
            
            if (role && role.speed) {
                //根据飞机速度更改位置
                role.y += role.speed;
  
                //如果敌人移动到显示区域以外，则移除
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < 0)) {
                	role.removeSelf();
                	role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover("role", role);
                }
            }
            if(role.shootType > 0){
                let time = Laya.Browser.now();
                if (time > role.shootTime) {
                    var pos = bulletPos[role.shootType - 1];
                    for(var index = 0; index < pos.length; index++){
                        let bullet = Laya.Pool.getItemByClass("role", Role);
                	    bullet.init("bullet1", role.camp, 1, -5, 1);
                	    bullet.isBullet = true;
                        bullet.pos(role.x + pos[index], role.y - role.hitRadius - 10);
                        this.roleBox.addChild(bullet);
                    }
                	role.shootTime = time + role.shootInterval;
                }
            }
            //每间隔30帧创建新的敌机
        }
        // var j = Laya.stage.numChildren;
        for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
            var role1 = this.roleBox.getChildAt(i);
        	if (role1.hp < 1) continue;
        	for (var j = i - 1; j > -1; j--) {
                //如果角色已经死亡，则忽略
                if (!role1.visible) continue;
                //获取角色对象2
                var role2 = this.roleBox.getChildAt(j);
                //如果角色未死亡，并且阵营不同，才进行碰撞
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //根据距离判断是否碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞后掉血
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                        //每掉一滴血，积分+1
                        score++;
                        this.gameInfo.score(score);
                        //积分大于升级积分，则升级
                        if (score > levelUpScore) {
                            //升级关卡
                            level++;
                            this.gameInfo.level(level);
                            //提高下一级的升级难道
                            levelUpScore += level * 5;
                        }

                    }
                }
            }
        }
		//如果主角死亡，则停止游戏循环
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
            this.gameInfo.infoLabel.text = "GameOver";
            this.gameInfo.gameRestart.alpha = 1;
            Laya.stage.once("click", this, this.restart);
        }



        let cutTime = level < 30 ? level * 2 : 60;
        
        let speedUp = Math.floor(level / 6);
        
        let hpUp = Math.floor(level / 8);

        let numUp = Math.floor(level / 10);
    

        if (Laya.timer.currFrame % (80 - cutTime) === 0) {
            this.createEnemy(0,2 + numUp, 3 + speedUp, 1);
        }
        if (Laya.timer.currFrame % (150 - cutTime * 2) === 0) {
            this.createEnemy(1,1 + numUp, 2 + speedUp, 2 + hpUp * 2);
        }
        if (Laya.timer.currFrame % (900 - cutTime * 4) === 0) {
            this.createEnemy(2, 2, 1 + speedUp,10 + hpUp * 4);
        }
    }
    lostHp(role, lostHp){
        //减血
        role.hp -= lostHp;
        if (role.heroType === 2) {
            //每吃一个子弹升级道具，子弹升级+1
            bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量限制在4个
            this.hero.shootType = Math.min(Math.floor(bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.hero.shootInterval = 400 - 16 * (bulletLevel > 20 ? 20 : bulletLevel);
            //隐藏道具
            role.visible = false;
        }else if (role.heroType === 3) {
            //每吃一个血瓶，血量增加1
            this.hero.hp++;
            
            //设置最大血量不超过10
            if (this.hero.hp > 10) this.hero.hp = 10;
            this.gameInfo.hp(this.hero.hp);
            //隐藏道具
            role.visible = false;
        }else if (role.hp > 0) {
            //如果未死亡，则播放受击动画
            role.playAction("hit");
            this.gameInfo.hp(this.hero.hp);
        } else{
            //如果死亡，则播放爆炸动画
            if (role.isBullet) {
                //如果是子弹，则直接隐藏，下次回收
                role.visible = false;
            } else {
                role.playAction("down");
                if(role.type == 'enemy3'){
                    let type =  Math.random() < 0.7 ? 2 : 3;
                    let item = Laya.Pool.getItemByClass("role", Role);
                    item.init('ufo' + (type-1), role.camp, 1, 1, 15, type);
                    item.pos(role.x,role.y);
                    this.roleBox.addChild(item);
                }
            }
        }
            
    }
    onMouseMove(e){
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }
    
    createEnemy(type,num,speed,hp){
        if(num<=0)return false;
        while(num){
            var r = Math.random();
            // var type = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            var enemy = Laya.Pool.getItemByClass("role", Role);
            enemy.init('enemy' + (type + 1), 1, hp,speed,Radius[type]);
            enemy.pos(Math.random() * 400 + 40, 0);
            this.roleBox.addChild(enemy);
            num--;
        }
        return true;
    }
}
return Game;
})()

let gameInstance = new Game();
















