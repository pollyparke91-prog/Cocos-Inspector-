import { _decorator, Component, Node, Vec3 } from 'cc';
import { nodePool } from './nodePool';
import { gameConfig } from '../data/gameConfig';
const { ccclass, property } = _decorator;

@ccclass('creatFloorEnemTool')
export class creatFloorEnemTool extends Component {
    // 随机时间
    private randomTime: number = null
    start() {
        // 生成时间
        this.randomTime = Math.floor(Math.random() * (11 - 5) + 5)
        // 随机飞行器类型
        this.schedule(function () {
            if (gameConfig.gamePause == 1) {
                return
            } else {
                nodePool.ins.getPoolNode('enemy_3', this.node, new Vec3(0, 0, 0))
                // 随机生成时间
                this.randomTime = Math.floor(Math.random() * (11 - 5) + 5)
            }
        }, this.randomTime);
    }

}


