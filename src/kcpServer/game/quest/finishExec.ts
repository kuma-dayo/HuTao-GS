import { QuestExec } from "./enum"
import GameQuest from "./gameQuest"

import * as QuestUserData from "@/types/user/QuestUserData"

export default class FinishExec {
  gameQuest: GameQuest

  type: QuestExec
  param: string[]

  constructor(gameQuest: GameQuest) {
    this.gameQuest = gameQuest
  }

  async init(data: QuestUserData.FinishExec) {
    Object.assign(this, data)
  }

  async initNew(type: QuestExec, param: string[]) {
    this.type = type
    this.param = param
  }

  async execute() {
    await this.gameQuest.player.questManager.finishExecAction.runAction(this.type, this.param, this.gameQuest.player)
  }

  export(): QuestUserData.FinishExec {
    return {
      type: this.type,
      param: this.param,
    }
  }
}
