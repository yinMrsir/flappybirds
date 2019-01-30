export default class GameView extends Laya.Scene{
    constructor(){
        super()
        GameView.instance = this
    }

    onEnable() {
        this.speed = 4
    }

    move() {
        if (-this.background.x >= 750) {
            this.background.x = -this.speed
        }
        this.background.x -= this.speed
    }
}