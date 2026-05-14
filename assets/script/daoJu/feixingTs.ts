import { _decorator, CCFloat, Collider2D, Component, Contact2DType, director, Node, RigidBody2D, v2, Vec3, Animation, Director, PhysicsSystem2D } from 'cc';
import { nodePool } from '../utils/nodePool';
import { emits, pzTag } from '../data/enums';
import { audioTool } from '../utils/audioTool';
const { ccclass, property } = _decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass('feixingTs')
export class feixingTs extends Component {
    // 速度
    @property(CCFloat) bulletSeep: number = 10;
    // 血量
    @property(CCFloat) hp: number = 1;
    private feixingRig: RigidBody2D = null
    // 碰撞体
    private collider: Collider2D = null;
    // 动画
    private ani: Animation = null
    onEnable(): void {
        this.feixingRig = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(Collider2D);
        this.ani = this.node.getComponent(Animation)
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(dt: number) {
        this.feixingRig.linearVelocity = v2(this.bulletSeep * -1, 0);
        if (this.node.position.x < -1880) {
            nodePool.ins.huiShouNode(this.node)
        }
    }
    onDestroy(): void {
        // 组件销毁时一定要停止所有计时器
        this.unscheduleAllCallbacks();
    }
    /**
 * 碰撞监听
 */
    onBeginContact(selfCollider: any, otherCollider: any, contact: any) {
        switch (otherCollider.group) {
            case pzTag.bullet:
                // 子弹声音
                audioTool.ins.playSound('zidanZj')
                // 血量-1
                this.hp -= 1
                if (this.hp <= 0) {
                    director.once(Director.EVENT_AFTER_PHYSICS, () => {
                        this.scheduleOnce(() => {
                            audioTool.ins.playSound('xiaoshi')
                            nodePool.ins.getPoolNode('wounTx', this.node.parent, this.node.position)
                            this.node.destroy();
                        }, 0.01)
                    });
                }
                break;
            // 撞击到角色就销毁节点
            case pzTag.player:
                director.once(Director.EVENT_AFTER_PHYSICS, () => {
                    this.node.destroy();
                });
                break;
        }

    }

}


