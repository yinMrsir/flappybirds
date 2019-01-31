import Director from './Director'

export default class PencelUp extends Laya.Script{
    constructor() {
        super()
    }

    onEnable() {
        //设置初始速度
        var rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: -4, y: 0 });
        this.isCreate = false
    }

    onUpdate() {
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