import { _decorator, Component, Node, sys } from 'cc';
import { gameConfig } from '../data/gameConfig';
import { localData } from '../data/enums';
const { ccclass, property } = _decorator;

/**
 * @description: 存储本地数据
 * @return {*}
 */
export function save(key: string, val: string | number | any): any {
    if (typeof val == 'number') {
        val = ('' + val) as string;
    }
    // 如果是数组或二维数据
    if (typeof val == 'object') {
        val = JSON.stringify(val);
    }
    sys.localStorage.setItem(key, val || '');
}

/**
 * @description: 加载获取本地数据
 * @return {*}
 */
export function load(key: string, type: 0 | 1 | 2 = 1): any {
    let res: any = sys.localStorage.getItem(key);
    if (res) {
        switch (type) {
            case 0:
                break;
            case 1:
                res = Number(res);
                break;
            case 2:
                res = JSON.parse(res);
                break;
        }
        return res;
    } else {
        return null;
    }
}
/**
 * 获取距离上次领取福利的时间
 */
export function getTime() {
    let newTime = new Date().getTime()
    let t = (newTime - gameConfig.oldTime) / 3600000
    let time = Number(t.toFixed(2))
    console.log('距离领取时间：' + time);
    return time
}
/**
 * 设置最新的领取时间
 */
export function setTime() {
    let newTime = new Date().getTime()
    gameConfig.oldTime = newTime
    save(localData.oldTime, gameConfig.oldTime)
}


