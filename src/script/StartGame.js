export default class GameStart extends Laya.Scene{
    constructor() {
        super()
        GameStart.instance = this
        this.loadScene('GameView.scene')
    }

    onEnable() {
        this.on(Laya.Event.CLICK, this, this.onPageClick)

        const button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 100,
                top: 260,
                width: 200,
                height: 50,
                backgroundColor: 'rgba(0,0,0,0)',
            }
          })
          button.onTap((userinfo) => {
              if (wx.getStorageSync('userInfo')) {
                Laya.Scene.open('GameView.scene')
              } else {
                wx.login({
                    success(res) {
                        if (res.code) {
                            // 发起网络请求
                            wx.request({
                                url: 'http://wx.yinchunyu.com/xcx/login',
                                method: 'POST',
                                data: {
                                    code: res.code,
                                    jsonData: JSON.stringify(userinfo)
                                },
                                success(data){
                                    // 存储到本地
                                    wx.setStorageSync('userInfo', data.data.Result)
                                    Laya.Scene.open('GameView.scene')
                                }
                            })
                        } else {
                        console.log('登录失败！' + res.errMsg)
                        }
                    }
                })
              }
          })

    }

    onPageClick() {
        
    }
}