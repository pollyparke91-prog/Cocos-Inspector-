import { _decorator, Component, director, game, Label, Node, ProgressBar } from 'cc';
import { emits, localData } from '../data/enums';
import { gameConfig } from '../data/gameConfig';
import { nodePool } from '../utils/nodePool';
import { wxAd } from '../AD/wxAd';
const { ccclass, property } = _decorator;

@ccclass('gameUi')
export class gameUi extends Component {
    // 金币显示
    @property(Label) jinbiLabel: Label = null;
    // 距离显示
    @property(Label) juliLabel: Label = null
    // 血量显示
    @property(ProgressBar) HPPro: ProgressBar = null
    start() {
        this.init()
        this.juliNum()
    }

    update(dt: number) {

    }
    onDestroy(): void {
        // 金币数量
        director.off(emits.jinbiNum, this.jinbiNum, this)
        // 血量
        director.off(emits.PHNum, this.PHNum, this)
        //销毁计时器
        this.unscheduleAllCallbacks()
    }
    init() {
        // 跳跃
        const jump = this.node.getChildByPath('bottomUI/jumpBtn')
        jump.on(Node.EventType.TOUCH_START, this.jumpStart, this)
        jump.on(Node.EventType.TOUCH_END, this.jumpEnd, this)
        jump.on(Node.EventType.TOUCH_CANCEL, this.jumpEnd, this)
        // 发射子弹
        const atk = this.node.getChildByPath('bottomUI/atkBtn')
        atk.on(Node.EventType.TOUCH_START, this.atkStart, this)
        atk.on(Node.EventType.TOUCH_END, this.atkEnd, this)
        atk.on(Node.EventType.TOUCH_CANCEL, this.atkEnd, this)
        // 金币数量
        director.on(emits.leveJinbiNum, this.jinbiNum, this)
        // 血量
        director.on(emits.PHNum, this.PHNum, this)
        // 参数初始化
        gameConfig.HPNum = 10
        gameConfig.leveJinbiNum = -1
        gameConfig.juliNum = 0
    }
    /**
     * 金币数量
     */
    jinbiNum() {
        gameConfig.leveJinbiNum += 1
        this.jinbiLabel.string = String(gameConfig.leveJinbiNum)
    }
    /**
     * 距离
     */
    juliNum() {
        this.schedule(() => {
            if (gameConfig.gamePause == 1) {
                return
            } else {
                gameConfig.juliNum += 1
                this.juliLabel.string = String(gameConfig.juliNum) + '米'
                this.maxLeve()
            }
        }, 0.1)
    }
    /**
     * 根据距离调整难度
     */
    maxLeve() {
        if (gameConfig.juliNum < 1000) {
            gameConfig.maxLevel = 7
        } else if (gameConfig.juliNum < 2000) {
            gameConfig.maxLevel = 12
        } else {
            gameConfig.maxLevel = 15
        }
    }
    /**
     * 暂停
     */
    suspendBtn() {
        gameConfig.gamePause = 1
        director.emit(emits.gamePause)
        nodePool.ins.getPoolNode('settings', gameConfig.gameRoot)
        director.emit(emits.backIsShow, 1)
    }
    /**
     * 血量
     */
    PHNum(val: number) {
        gameConfig.HPNum = gameConfig.HPNum + val
        if (gameConfig.HPNum > 10) {
            gameConfig.HPNum = 10
        }
        if (gameConfig.HPNum < 0) {
            gameConfig.HPNum = 0
        }
        this.HPPro.progress = gameConfig.HPNum / 10
        if (this.HPPro.progress <= 0) {
            console.log('游戏失败');
            // 游戏暂停
            gameConfig.gamePause = 1
            director.emit(emits.gamePause)
            // 插屏广告
            wxAd.ins.chapingAd()
            // 游戏结束
            director.emit(emits.gameover)
        }
    }
    /**
     * 跳跃
     */
    jumpStart() {
        director.emit(emits.jump, true)
    }
    jumpEnd() {
        director.emit(emits.jump, false)
    }
    /**
     * 跳跃
     */
    atkStart() {
        director.emit(emits.atk, true)
    }
    atkEnd() {
        director.emit(emits.atk, false)
    }
}


