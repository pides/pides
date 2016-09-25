namespace Game{
    export class System{
        private ctrl: Laya.Sprite;
        init(){
            this.InitAnimation();
            this.Ctrl();
        }
        InitAnimation(){
            Laya.Animation.createFrames(["mcworld/test2.png"], "role_top_stop");
            Laya.Animation.createFrames(["mcworld/test2.png",'mcworld/test2_2.png'], "role_top_move");
            Laya.Animation.createFrames(["mcworld/test1.png"], "role_down_stop");
            Laya.Animation.createFrames(["mcworld/test1.png",'mcworld/test1_2.png'], "role_down_move");
            Laya.Animation.createFrames(["mcworld/test3.png"], "role_left_stop");
            Laya.Animation.createFrames(["mcworld/test3.png","mcworld/test3_2.png"], "role_left_move");
            Laya.Animation.createFrames(["mcworld/test4.png"], "role_right_stop");
            Laya.Animation.createFrames(["mcworld/test4.png","mcworld/test4.png"], "role_right_move");
        }
        Ctrl(){
            var s = new Laya.Sprite();
            s.zOrder = 10;
            s.graphics.alpha(0.3);
            s.graphics.drawCircle(100, 100, 50, "#000000");
            s.graphics.alpha(0.5);
            s.graphics.drawCircle(100, 100, 25, "#ffffff"); 
            Laya.stage.addChild(s);
        }
    }
}