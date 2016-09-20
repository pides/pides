var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cache = false;
var Game;
(function (Game) {
    var Role;
    (function (Role_1) {
        var Role = (function (_super) {
            __extends(Role, _super);
            function Role() {
                _super.call(this);
                this.moveing = false;
                this.init();
            }
            Role.prototype.init = function () {
                if (!this.body) {
                    this.body = new Laya.Animation();
                    this.body.interval = 50;
                    this.addChild(this.body);
                }
                if (!cache) {
                    alert(1);
                    cache = true;
                    Laya.Animation.createFrames(["mcworld/test2.png"], "role_top_stop");
                    Laya.Animation.createFrames(["mcworld/test2.png", 'mcworld/test2_2.png'], "role_top_move");
                    Laya.Animation.createFrames(["mcworld/test1.png"], "role_down_stop");
                    Laya.Animation.createFrames(["mcworld/test1.png", 'mcworld/test1_2.png'], "role_down_move");
                    Laya.Animation.createFrames(["mcworld/test3.png"], "role_left_stop");
                    Laya.Animation.createFrames(["mcworld/test3.png", "mcworld/test3_2.png"], "role_left_move");
                    Laya.Animation.createFrames(["mcworld/test4.png"], "role_right_stop");
                    Laya.Animation.createFrames(["mcworld/test4.png", "mcworld/test4_2.png"], "role_right_move");
                }
                this.playAction();
            };
            Role.prototype.playAction = function (action) {
                if (action === void 0) { action = 'down_stop'; }
                this.action = action;
                this.body.play(0, true, 'role_' + action);
                //获取动画大小区域
                var bound = this.body.getBounds();
                this.body.pos(-bound.width / 2, -bound.height / 2);
            };
            return Role;
        }(Laya.Sprite));
        Role_1.Role = Role;
        var RolePool = (function () {
            function RolePool() {
            }
            RolePool.prototype.add = function () {
            };
            RolePool.prototype.remove = function () {
            };
            return RolePool;
        }());
        Role_1.RolePool = RolePool;
    })(Role = Game.Role || (Game.Role = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Role.js.map