import { _decorator, Component, Node } from 'cc';
import { gameConfig } from '../data/gameConfig';
const { ccclass, property } = _decorator;

@ccclass('wxAd')
export class wxAd extends Component {
    // 格子广告1
    private geziAd1: any
    private geziAd2: any
    private videoAd: any
    // 单例
    static _ins: wxAd;
    static get ins() {
        if (this._ins) {
            return this._ins;
        }
        this._ins = new wxAd();
        return this._ins;
    }

    public wx = window['wx'];

    /**
     *  监听音频中断结束事件
     * @param callback 
     */
    bgmZd(callback: Function) {
        if (gameConfig.isWxAd) {
            this.wx.onAudioInterruptionEnd(() => {
                // console.log('音频中断结束');
                callback()
            })
        } else {
            console.log('微信广告关闭');
        }
    }
    /**
* 打开右上角转发功能
*/
    topZhuanfa() {
        if (gameConfig.isWxAd) {
            this.wx.showShareMenu();
        } else {
            console.log('微信广告关闭');
        }
    }

    /**
     * 格子广告1
     */
    loadGeziAd1() {
        if (gameConfig.isWxAd) {
            let { screenWidth, screenHeight } = this.wx.getSystemInfoSync();
            // 创建 原生模板 广告实例，提前初始化
            this.geziAd1 = this.wx.createCustomAd({
                adUnitId: 'adunit-xxxxxxxxxxxxxxxxxxxx',
                style: {
                    left: screenWidth - 75,
                    top: 60,
                    width: 350
                }
            })
            // 监听 原生模板 广告错误事件
            this.geziAd1.onError(err => {
                console.error(err.errMsg)
            });
        } else {
            console.log('微信广告关闭');
        }
    }
    // 显示格子1广告
    showGezi1() {
        if (gameConfig.isWxAd) {
            this.geziAd1.show()
        } else {
            console.log('微信广告关闭');
        }
    }
    // 隐藏格子1广告
    hideGezi1() {
        if (gameConfig.isWxAd) {
            this.geziAd1.hide()
        } else {
            console.log('微信广告关闭');
        }
    }

    /**
    * 格子广告2
    */
    loadGeziAd2() {
        if (gameConfig.isWxAd) {
            let { screenWidth, screenHeight } = this.wx.getSystemInfoSync();
            // 创建 原生模板 广告实例，提前初始化
            this.geziAd2 = this.wx.createCustomAd({
                adUnitId: 'adunit-xxxxxxxxxxxxxxxxxxxxx',
                style: {
                    left: 40,
                    top: 72,
                    width: 350
                }
            })
            // 监听 原生模板 广告错误事件
            this.geziAd1.onError(err => {
                console.error(err.errMsg)
            });
        } else {
            console.log('微信广告关闭');
        }
    }
    // 显示格子2广告
    showGezi2() {
        if (gameConfig.isWxAd) {
            this.geziAd2.show()
        } else {
            console.log('微信广告关闭');
        }
    }
    // 隐藏格子2广告
    hideGezi2() {
        if (gameConfig.isWxAd) {
            this.geziAd2.hide()
        } else {
            console.log('微信广告关闭');
        }
    }

    /**
     * 插屏广告
     */
    chapingAd() {
        if (gameConfig.isWxAd) {
            // 定义插屏广告
            let interstitialAd = null
            // 创建插屏广告实例，提前初始化
            if (this.wx.createInterstitialAd) {
                interstitialAd = this.wx.createInterstitialAd({
                    adUnitId: 'adunit-xxxxxxxxxxxxxxxxxxxxx'
                })
            }
            // 在适合的场景显示插屏广告
            if (interstitialAd) {
                interstitialAd.show().catch((err) => {
                    console.error('插屏广告显示失败', err)
                })
            }
        } else {
            console.log('微信广告关闭');
        }
    }

    /**
     * 激励广告
     */
    jiliAd(callback: Function) {
        if (gameConfig.isWxAd) {
            // 创建激励视频广告实例，提前初始化
            this.videoAd = this.wx.createRewardedVideoAd({
                adUnitId: 'adunit-xxxxxxxxxxxxxxxxxxxxx'
            })
            // 用户触发广告后，显示激励视频广告
            this.videoAd.show().catch(() => {
                // 失败重试
                this.videoAd
                    .load()
                    .then(() => this.videoAd.show())
                    .catch((err) => {
                        console.error('激励视频 广告显示失败', err);
                    });
            });
            this.videoAd.onLoad(() => {
                console.log('激励视频 广告加载成功');
            });

            this.videoAd.show().then(() => console.log('激励视频 广告显示'));
            this.videoAd.onError((err) => {
                console.log(err);
            });
            this.videoAd.onClose((res) => {
                // 用户点击了【关闭广告】按钮
                if ((res && res.isEnded) || res === undefined) {
                    callback()
                    // 正常播放结束，可以下发游戏奖励
                    this.videoAd.offClose();
                } else {
                    // 播放中途退出，不下发游戏奖励
                    this.videoAd.offClose();
                }
            })
        } else {
            console.log('微信广告关闭');
        }
    }
}
