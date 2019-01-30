export default class GameStart extends Laya.Scene{
    constructor() {
        super()
        this.on(Laya.Event.CLICK, this, this.onPageClick)
    }

    onPageClick() {
        Laya.Scene.open('./GameView.scene')
    }
}