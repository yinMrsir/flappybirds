import GameView from './GameView'
import Brids from './Brids'

export default class Director extends Laya.Script{
    /** @prop {name: PencelUp, tip: '上铅笔', type: prefab} */
    /** @prop {name: PencelDwon, tip: '下铅笔', type: prefab} */
    /** @prop {name: Brids, tip: '小鸟', type: prefab} */
    constructor() {
        super()
        Director.instance = this
    }
    
    onEnable() {
        this.count = 1
        this.Brid = null
        this.gameBox = this.owner.getChildByName('gameBox')
        this.createPencel()
        this.createBrids()
    }

    onUpdate() {
       GameView.instance.move()
    }

    onClick() {
        if (this.Brid) {
            Brids.instance.rig.setVelocity({ x: 0, y: -5 });
        }
    }

    createPencel() {
        this.count++
        if (this.count === 2) {
            let min = Laya.stage.height / 18
            let max = Laya.stage.height / 3
            let top = min + Math.random() * (max - min)
            
            let PencelUp = Laya.Pool.getItemByCreateFun('PencelUp', this.PencelUp.create, this.PencelUp)
            PencelUp.pos(Laya.stage.width, top - PencelUp.height)
            this.gameBox.addChild(PencelUp)
    
            let PencelDwon = Laya.Pool.getItemByCreateFun('PencelDwon', this.PencelDwon.create, this.PencelDwon)
            PencelDwon.pos(Laya.stage.width, top + 400)
            this.gameBox.addChild(PencelDwon)
    
            this.count = 0
        }
    }
    
    createBrids() {
        this.Brid = Laya.Pool.getItemByCreateFun('Brids', this.Brids.create, this.Brids)
        this.Brid.pos(50, Laya.stage.height/2 )
        this.gameBox.addChild(this.Brid)
    }

}