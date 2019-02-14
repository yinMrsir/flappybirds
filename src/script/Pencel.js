import Director from './Director'

export default class Pencel extends Laya.Script{
    constructor() {
        super()
    }

    onEnable() {
        //设置初始速度
        this.rig = this.owner.getComponent(Laya.RigidBody);
        this.rig.setVelocity({ x: -4, y: 0 });
        this.isCreate = false
    }

    onUpdate() {
        // 如果游戏结束停止运动
        if (Director.instance.isGameOver) {
            this.rig.setVelocity({ x: 0, y: 0 });
            return
        }
        let owner = this.owner
        if (owner.x <= -owner.width) {
            owner.removeSelf()
            Director.instance.addScore()
        }
        if (owner.x <= Math.floor(Laya.stage.width/2)) {
            if(!this.isCreate) {
                this.isCreate = true
                Director.instance.createPencel()
            }   
        }
    }

}