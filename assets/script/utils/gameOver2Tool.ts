import { _decorator, Component, director, Label, Node, NodeEventType, PhysicsSystem2D, tween, Vec3 } from 'cc';
import { gameConfig } from '../data/gameConfig';
import { load, save } from './tools';
import { emits, localData } from '../data/enums';
import { audioTool } from './audioTool';
import { nodePool } from './nodePool';
const { ccclass, property } = _decorator;

@ccclass('gameOver2Tool')
export class gameOver2Tool extends Component {
    // 金币和距离
    @property(Label) levelJinbi: Label = null
    @property(Label) levelJuli: Label = null
    private popUI: Node;
    protected onEnable(): void {
        this.init()
    }
    init() {
        // 进场动画
        this.popUI = this.node.getChildByName('popUI')
        this.popUI.setScale(0, 0)
        tween(this.popUI).to(0.2, { scale: new Vec3(1, 1, 1) }).by(0.06, { scale: new Vec3(0.2, 0.2, 1) }).by(0.05, { scale: new Vec3(-0.2, -0.2, 1) }).start()
        // 结算信息
        this.levelJinbi.string = '获得金币：' + gameConfig.leveJinbiNum
        this.levelJuli.string = gameConfig.juliNum + '米'
        // 存储金币和距离
        this.jieSuan()
        // 监听事件
        const chongxin = this.node.getChildByPath('popUI/chongxin')
        chongxin.on(NodeEventType.TOUCH_START, this.chongxinBtn, this)
        const backhome = this.node.getChildByPath('popUI/backhome')
        backhome.on(NodeEventType.TOUCH_START, this.backhomeBtn, this)
    }
    // 重新开始
    chongxinBtn() {
        // 出场动画
        tween(this.popUI).by(0.06, { scale: new Vec3(0.2, 0.2, 1) }).by(0.05, { scale: new Vec3(-0.2, -0.2, 1) }).to(0.02, { scale: new Vec3(1.1, 1.1, 1) }).to(0.1, { scale: new Vec3(0, 0, 1) }).call(() => {
            if (gameConfig.tiliNum >= 5) {
                gameConfig.gamePause = 0
                director.emit(emits.gamePause)
                gameConfig.tiliNum -= 5
                save(localData.tiliNum, gameConfig.tiliNum)
                director.loadScene('game')
            } else {
                nodePool.ins.getPoolNode('tili', gameConfig.gameRoot)
            }
        }).start()
    }
    // 返回首页
    backhomeBtn() {
        // 出场动画
        tween(this.popUI).by(0.06, { scale: new Vec3(0.2, 0.2, 1) }).by(0.05, { scale: new Vec3(-0.2, -0.2, 1) }).to(0.02, { scale: new Vec3(1.1, 1.1, 1) }).to(0.1, { scale: new Vec3(0, 0, 1) }).call(() => {
            audioTool.ins.stopMusic()
            gameConfig.gamePause = 0
            director.emit(emits.gamePause)
            director.loadScene('home')
        }).start()
    }
    // 最终结算
    jieSuan() {
        // 金币
        gameConfig.jinbiNum = gameConfig.leveJinbiNum + Number(load(localData.jinbiNum))
        save(localData.jinbiNum, gameConfig.jinbiNum)
        director.emit(emits.jinbiNum)
        // 最高记录
        if (gameConfig.juliNum > gameConfig.maxJuli) {
            gameConfig.maxJuli = gameConfig.juliNum
            save(localData.maxJuli, gameConfig.maxJuli)
        }
    }
}


