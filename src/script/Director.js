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
        this.scoreCount = 0
        this.Brid = null
        this.PencelsData = []
        this.isAddScore = true
        this.score = 0
        this.gameBox = this.owner.getChildByName('gameBox')
        this.createPencel()
        this.createBrids()
    }

    onUpdate() {
       GameView.instance.move()
       for (let i = 0; i < this.PencelsData.length; i++) {
           let pencel = this.PencelsData[i]
           if (this.Brid.x > pencel.x + pencel.width) {
               if (this.isAddScore) {
                    this.isAddScore = false
                    this.score++
                    GameView.instance.setScore(this.score)
               }
           }
       }
    }

    onStageClick() {
        if (this.Brid) {
            Brids.instance.rig.setVelocity({ x: 0, y: -7 });
        }
    }

    addScore() {
        this.scoreCount++
        if (this.scoreCount === 2) {
            this.PencelsData.shift()
            this.scoreCount = 0
            this.isAddScore = true
        }
    }

    createPencel() {
        this.count++
        if (this.count === 2) {
            let min = Laya.stage.height / 8
            let max = Laya.stage.height / 2
            let top = min + Math.random() * (max - min)
            
            let PencelUp = Laya.Pool.getItemByCreateFun('PencelUp', this.PencelUp.create, this.PencelUp)
            PencelUp.pos(Laya.stage.width, top - PencelUp.height)
            this.gameBox.addChild(PencelUp)
    
            let PencelDwon = Laya.Pool.getItemByCreateFun('PencelDwon', this.PencelDwon.create, this.PencelDwon)
            PencelDwon.pos(Laya.stage.width, top + (Laya.stage.height / 5))
            this.gameBox.addChild(PencelDwon)

            this.PencelsData.push(PencelUp)
    
            this.count = 0
        }
    }
    
    createBrids() {
        this.Brid = Laya.Pool.getItemByCreateFun('Brids', this.Brids.create, this.Brids)
        this.Brid.pos(50, Laya.stage.height/2 )
        this.gameBox.addChild(this.Brid)
    }

}