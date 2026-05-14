import { _decorator, Component, Node } from 'cc';
import { loadRes } from '../utils/loadRes';
import { localData, resPath } from '../data/enums';
import { getTime, load, save } from '../utils/tools';
import { gameConfig } from '../data/gameConfig';
import { wxAd } from '../AD/wxAd';
import { dyAd } from '../AD/dyAd';
const { ccclass, property } = _decorator;

@ccclass('mainTs')
export class mainTs extends Component {
    start() {
        this.resLoad()
        this.initData()
        // this.loadAd()
    }
    /**
  * 加载资源
  */
    resLoad() {
        loadRes.ins.loadBundle('bundles');
        loadRes.ins.resLoad(resPath.UIPerfab);
        loadRes.ins.resLoad(resPath.levelPar);
        loadRes.ins.resLoad(resPath.enemyPar);
        loadRes.ins.resLoad(resPath.playersfab);
        loadRes.ins.resLoad(resPath.music);
    }
    /**
* 预加载广告
*/
    loadAd() {
        // 微信
        wxAd.ins.loadGeziAd1()
        wxAd.ins.loadGeziAd2()
    }
    /**
* 初始化游戏数据
*/
    initData() {
        // 金币
        let jinbiNum = load(localData.jinbiNum)
        if (jinbiNum == null) {
            jinbiNum = 0
            save(localData.jinbiNum, jinbiNum)
        }
        gameConfig.jinbiNum = jinbiNum
        // 体力
        let tiliNum = load(localData.tiliNum)
        if (tiliNum == null) {
            tiliNum = 30
            save(localData.tiliNum, tiliNum)
        }
        gameConfig.tiliNum = tiliNum
        // 音乐
        let isBgm = load(localData.isBgm)
        if (isBgm == null) {
            isBgm = 1
            save(localData.isBgm, isBgm)
        }
        gameConfig.isBgm = isBgm
        // 音效
        let isSound = load(localData.isSound)
        if (isSound == null) {
            isSound = 1
            save(localData.isSound, isSound)
        }
        gameConfig.isSound = isSound

        // 初始化音量
        if (gameConfig.isBgm) {
            gameConfig.bgmVol = 1
        } else {
            gameConfig.bgmVol = 0
        }
        if (gameConfig.isSound) {
            gameConfig.soundVol = 0.9
        } else {
            gameConfig.soundVol = 0
        }
        // 当前页码
        let page = load(localData.page)
        if (page == null) {
            page = 0
            save(localData.page, page)
        }
        gameConfig.page = page
        // 当前角色
        let slectType = load(localData.slectType)
        if (slectType == null) {
            slectType = 1
            save(localData.slectType, slectType)
        }
        gameConfig.slectType = slectType
        // 角色列表
        let playerList = load(localData.playerList, 2)
        if (playerList) {
            gameConfig.playerList = playerList
        }
        // 福利领取时间
        let oldTime = load(localData.oldTime)
        if (oldTime == null) {
            oldTime = 0
            save(localData.oldTime, oldTime)
        }
        gameConfig.oldTime = oldTime
        //最高得分
        let maxJuli = load(localData.maxJuli)
        if (maxJuli == null) {
            maxJuli = 0
            save(localData.maxJuli, maxJuli)
        }
        gameConfig.maxJuli = maxJuli
    }
}


