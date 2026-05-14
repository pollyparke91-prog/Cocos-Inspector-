import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameConfig')
/**
 * 游戏数据
 */
export class gameConfig {
    // 是否开启微信广告
    static isWxAd = false
    // 是否复活
    static ifFuhuo = 0
    // 设置音效
    static isSound = 1
    // 设置音乐
    static isBgm = 1
    // 音效音量
    static soundVol = 0.8
    // 音乐音量
    static bgmVol = 1
    // 敌人生成节点
    static enemyNode = null;
    // 游戏根节点
    static gameRoot = null;
    //首页根节点
    static homeRoot = null;
    // 当前金币
    static jinbiNum = 0;
    // 当前体力
    static tiliNum = 30;
    // 当前距离
    static juliNum = 0;
    // 本关获得金币
    static leveJinbiNum = -1;
    // 当前血量
    static HPNum = 10;
    // 飞行器名称
    static fxqName = ['feixingqi_1', 'feixingqi_2', 'feixingqi_HP']
    // 商店角色列表
    static playerList = [[{ type: 1, isJiesuo: 1, price: 0 }, { type: 2, isJiesuo: 0, price: 1000 }, { type: 3, isJiesuo: 0, price: 3000 }], [{ type: 4, isJiesuo: 0, price: 5000 }, { type: 5, isJiesuo: 0, price: 8000 }, { type: 6, isJiesuo: 0, price: 10000 }]]
    // 当前页码
    static page = 0
    // 当前选择角色
    static slectType = 1
    // 当前点击角色
    static dianjiType = 0
    // 上次领取福利的时间
    static oldTime = 0
    // 最高得分
    static maxJuli = 0
    // 最高得分
    static gamePause = 0
    // 剩余复活次数
    static fuhuoNum = 1
    // 是否在游戏中
    static isGame = 0
    // 允许随机的最大关卡
    static maxLevel = 5

}




