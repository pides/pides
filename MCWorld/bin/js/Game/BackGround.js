var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var BackGround = (function (_super) {
        __extends(BackGround, _super);
        function BackGround(caller, callback) {
            _super.call(this);
            this.create(caller, callback);
            this.zOrder = 1;
        }
        BackGround.prototype.create = function (caller, callback) {
            this.tiledMap = new laya.map.TiledMap();
            this.tiledMap.createMap("res/tiledMap/back.json", new laya.maths.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), new Laya.Handler(caller, callback));
        };
        return BackGround;
    }(Laya.Sprite));
    Game.BackGround = BackGround;
})(Game || (Game = {}));
//# sourceMappingURL=BackGround.js.map