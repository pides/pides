let cache = false;
namespace Game{
    export namespace Role{
        export class Role extends Laya.Sprite{
            private body:Laya.Animation;
            private action:String;
            private direction:String;
            public mouseDowning:Boolean;
            public moveing:boolean  = false;
            public targetPos:Array<number>;

            constructor(){
                super();
                this.init();
            }
            init(){
                if(!this.body){
                    this.body = new Laya.Animation();
                    this.body.interval = 100;
                    this.addChild(this.body);
                }
                if(!cache){
                    cache = true;
                    Laya.Animation.createFrames(["mcworld/test2.png"], "role_top_stop");
                    Laya.Animation.createFrames(["mcworld/test2.png",'mcworld/test2_2.png'], "role_top_move");
                    Laya.Animation.createFrames(["mcworld/test1.png"], "role_down_stop");
                    Laya.Animation.createFrames(["mcworld/test1.png",'mcworld/test1_2.png'], "role_down_move");
                    Laya.Animation.createFrames(["mcworld/test3.png"], "role_left_stop");
                    Laya.Animation.createFrames(["mcworld/test3.png","mcworld/test3_2.png"], "role_left_move");
                    Laya.Animation.createFrames(["mcworld/test4.png"], "role_right_stop");
                    Laya.Animation.createFrames(["mcworld/test4.png","mcworld/test4_2.png"], "role_right_move");
                }
                this.playAction();
            }
            /**
             * 设置当前角色动画
             */
            playAction(direction:String = 'down',action:String = 'stop'){
                this.direction = direction;
                this.action = action;
                this.body.play(0, true,  'role_' + direction+ '_' + action);
                //获取动画大小区域
                var bound = this.body.getBounds();
                this.body.pos(-bound.width / 2, -bound.height / 2);
            }
            /**
             * 获取当前角色动作
             */
            getAction(){
                return this.action;
            }
            /**
             * 获取角色当前方向
             */
            getDirection(){
                return this.direction;
            }
        }
        export class RolePool{
            private PoolList: Array<Game.Role.Role>;
            add(){

            }
            remove(){

            }
        }
    }
}