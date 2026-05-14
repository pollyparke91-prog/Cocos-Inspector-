import { _decorator, CCFloat, Component, director, Node, RigidBody2D, v2, Vec3, Animation, Collider2D, Contact2DType, Director, SkeletalAnimation, Skeleton, sp, tween, Color, Prefab, CCString } from 'cc';
import { emits, pzTag } from '../data/enums';
import { nodePool } from '../utils/nodePool';
import { gameConfig } from '../data/gameConfig';
import { audioTool } from '../utils/audioTool';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
    private palyerRig: RigidBody2D = null;
    // 是否长按跳跃中
    private isJump: boolean = false;
    // 是否长按攻击中
    private isJStk: boolean = false;
    // 子弹相对于玩家偏移 X
    @property(CCFloat) pospianyiX: number = 40
    // 子弹相对于玩家偏移 Y
    @property(CCFloat) pospianyiY: number = -10
    // 跳跃升力
    @property(CCFloat) UpSpeed: number = 8
    // 动画
    private ske: sp.Skeleton = null
    // 碰撞体
    private collider: Collider2D = null;
    // 发射子弹类型
    @property(CCString) bulletType: string
    onEnable(): void {
        this.init()
    }
    update(dt: number) {
        // 跳跃
        if (this.isJump) {
            this.fly()
        }
    }
    init() {
        this.ske = this.node.getComponent(sp.Skeleton)
        this.palyerRig = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // 监听跳跃和发射子弹
        director.on(emits.jump, this.isJumpTouch, this)
        director.on(emits.atk, this.isJStkTouch, this)
    }
    /**
     * 碰撞监听
     */
    onBeginContact(selfCollider: any, otherCollider: any, contact: any) {
        // 如果不是复活
        if (!gameConfig.ifFuhuo) {
            switch (otherCollider.group) {
                case pzTag.road:
                    this.ske.setAnimation(1, 'run', true)
                    break;
                case pzTag.enemy:
                    audioTool.ins.playSound('shoushang')
                    director.emit(emits.PHNum, -2)
                    this.onDamage()
                    break;
                case pzTag.enemyBullet:
                    audioTool.ins.playSound('shoushang')
                    director.emit(emits.PHNum, -2)
                    this.onDamage()
                    break;
                case pzTag.jiguan:
                    audioTool.ins.playSound('shoushang')
                    director.emit(emits.PHNum, -2)
                    this.onDamage()
                    break;
                case pzTag.hp:
                    audioTool.ins.playSound('ph')
                    director.emit(emits.PHNum, 1)
                    break;
                case pzTag.jinbi:
                    audioTool.ins.playSound('jinbi')
                    director.emit(emits.leveJinbiNum)
                    break;
            }
        } else {
            // 如果复活
            switch (otherCollider.group) {
                case pzTag.road:
                    this.ske.setAnimation(1, 'run', true)
                    break;
                case pzTag.enemy:
                    director.emit(emits.PHNum, 0)
                    break;
                case pzTag.enemyBullet:
                    director.emit(emits.PHNum, 0)
                    this.onDamage()
                    break;
                case pzTag.jiguan:
                    director.emit(emits.PHNum, 0)
                    break;
                case pzTag.hp:
                    audioTool.ins.playSound('ph')
                    director.emit(emits.PHNum, 1)
                    break;
                case pzTag.jinbi:
                    audioTool.ins.playSound('jinbi')
                    director.emit(emits.leveJinbiNum)
                    break;
            }
        }


    }
    /**
     * 跳跃
     */
    isJumpTouch(val: boolean) {
        this.isJump = val
        this.ske.setAnimation(1, 'jump', true)
        if (this.isJump) {
            this.node.getChildByName('smok').active = true
        } else {
            this.node.getChildByName('smok').active = false
        }
    }
    // 点击时上升
    fly() {
        // 给这个刚体组件一个向量，12代表y轴的量
        this.palyerRig.linearVelocity = v2(0, this.UpSpeed);
    }
    /**
     * 攻击
     */
    isJStkTouch(val: boolean) {
        this.isJStk = val
        if (this.isJStk) {
            audioTool.ins.playSound('sheji')
            const bullPos = new Vec3(this.node.position.x + this.pospianyiX, this.node.position.y + this.pospianyiY, 0)
            nodePool.ins.getPoolNode(this.bulletType, this.node.getParent(), bullPos)
            this.schedule(this.faShe, 0.5)
        }
    }
    faShe() {
        if (this.isJStk) {
            audioTool.ins.playSound('sheji')
            const bullPos = new Vec3(this.node.position.x + this.pospianyiX, this.node.position.y + this.pospianyiY, this.node.position.z)
            nodePool.ins.getPoolNode(this.bulletType, this.node.getParent(), bullPos)
        } else {
            // 取消定时器
            this.unschedule(this.faShe);
        }
    }
    /**
     * 受伤动画
     */
    onDamage() {
        // 创建一个 Tween 对象
        tween(this.ske)
            .to(0.2, { color: new Color(255, 0, 0, 255) }) // 0.2秒内变为红色
            .to(0.3, { color: new Color(255, 255, 255, 255) }) // 0.2秒内恢复原色
            .delay(0.1) // 延迟0.2秒
            .union()
            .repeat(1)
            .start();
    }
}


