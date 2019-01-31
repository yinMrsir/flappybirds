export default class GameView extends Laya.Scene{
    constructor(){
        super()
        GameView.instance = this
    }

    onEnable() {
        this.speed = 4
    }

    setScore(num = 0) {
        this.score.text = num
    }

    move() {
        if (-this.background.x >= 750) {
            this.background.x = -this.speed
        }
        this.background.x -= this.speed
    }
}