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
                    Laya.Animation.createFrames(["mcworld/role2_1.png"], "role_top_stop");
                    Laya.Animation.createFrames(["mcworld/role2_2.png",'mcworld/role2_3.png'], "role_top_move");
                    Laya.Animation.createFrames(["mcworld/role1_1.png"], "role_down_stop");
                    Laya.Animation.createFrames(["mcworld/role1_2.png",'mcworld/role1_3.png'], "role_down_move");
                    Laya.Animation.createFrames(["mcworld/role3_1.png"], "role_right_stop");
                    Laya.Animation.createFrames(["mcworld/role3_2.png","mcworld/role3_3.png"], "role_right_move");
                    Laya.Animation.createFrames(["mcworld/role4_1.png"], "role_left_stop");
                    Laya.Animation.createFrames(["mcworld/role4_2.png","mcworld/role4_3.png"], "role_left_move");
                }
                this.playAction();
            }
            /**
             * 设置当前角色动画
             */
            playAction(direction:String = 'down',action:String = 'stop'){
                if(this.direction == direction && this.action == action){
                    return;
                }
                this.direction = direction;
                console.log(direction);
                this.action = action;
                console.log(action);
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