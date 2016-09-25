
    
    
namespace Game {
    export class BackGround extends Laya.Sprite{
        private tiledMap:laya.map.TiledMap;
        constructor(caller,callback){
            super();
            this.create(caller,callback);
            this.zOrder = 1;
        }
        create(caller,callback){
            this.tiledMap = new laya.map.TiledMap();
			this.tiledMap.createMap("res/tiledMap/back.json", new laya.maths.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), new Laya.Handler(caller,callback));
        }
    }
}