export default class GameStart extends Laya.Scene{
    constructor() {
        super()
        GameStart.instance = this
        this.loadScene('GameView.scene')
    }

    onEnable() {
        this.on(Laya.Event.CLICK, this, this.onPageClick)
    }

    onPageClick() {
        Laya.Scene.open('GameView.scene')
    }
}