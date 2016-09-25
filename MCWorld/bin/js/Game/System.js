var Game;
(function (Game) {
    var System = (function () {
        function System() {
        }
        System.prototype.init = function () {
            this.InitAnimation();
            this.Ctrl();
        };
        System.prototype.InitAnimation = function () {
            Laya.Animation.createFrames(["mcworld/test2.png"], "role_top_stop");
            Laya.Animation.createFrames(["mcworld/test2.png", 'mcworld/test2_2.png'], "role_top_move");
            Laya.Animation.createFrames(["mcworld/test1.png"], "role_down_stop");
            Laya.Animation.createFrames(["mcworld/test1.png", 'mcworld/test1_2.png'], "role_down_move");
            Laya.Animation.createFrames(["mcworld/test3.png"], "role_left_stop");
            Laya.Animation.createFrames(["mcworld/test3.png", "mcworld/test3_2.png"], "role_left_move");
            Laya.Animation.createFrames(["mcworld/test4.png"], "role_right_stop");
            Laya.Animation.createFrames(["mcworld/test4.png", "mcworld/test4.png"], "role_right_move");
        };
        System.prototype.Ctrl = function () {
            var s = new Laya.Sprite();
            s.zOrder = 10;
            s.graphics.alpha(0.3);
            s.graphics.drawCircle(100, 100, 50, "#000000");
            s.graphics.alpha(0.5);
            s.graphics.drawCircle(100, 100, 25, "#ffffff");
            Laya.stage.addChild(s);
        };
        return System;
    }());
    Game.System = System;
})(Game || (Game = {}));
//# sourceMappingURL=System.js.map