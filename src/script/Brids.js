import GameView from './GameView'
    
export default class Brids extends Laya.Script{
    constructor() {
        super()
        Brids.instance = this
    }

    onEnable() {
        //设置初始速度
        this.rig = this.owner.getComponent(Laya.RigidBody);
        this.rig.setVelocity({ x: 0, y: -5 });
    }

    onTriggerEnter(other, self, contact) {
        this.owner.removeSelf()
    }

}