var Game;
(function (Game) {
    var System = (function () {
        function System() {
        }
        System.prototype.init = function () {
            this.initAnimation();
        };
        System.prototype.initAnimation = function () {
            Laya.Animation.createFrames(["mcworld/test2.png"], "role_top_stop");
            Laya.Animation.createFrames(["mcworld/test2.png", 'mcworld/test2_2.png'], "role_top_move");
            Laya.Animation.createFrames(["mcworld/test1.png"], "role_down_stop");
            Laya.Animation.createFrames(["mcworld/test1.png", 'mcworld/test1_2.png'], "role_down_move");
            Laya.Animation.createFrames(["mcworld/test3.png"], "role_left_stop");
            Laya.Animation.createFrames(["mcworld/test3.png", "mcworld/test3_2.png"], "role_left_move");
            Laya.Animation.createFrames(["mcworld/test4.png"], "role_right_stop");
            Laya.Animation.createFrames(["mcworld/test4.png", "mcworld/test4.png"], "role_right_move");
        };
        return System;
    }());
    Game.System = System;
})(Game || (Game = {}));
//# sourceMappingURL=System.js.map