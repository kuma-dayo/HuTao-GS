import { QuestContent } from "./enum"
import GameQuest from "./gameQuest"

import * as QuestUserData from "@/types/user/QuestUserData"

export default class FinishCond {
  gameQuest: GameQuest

  type: QuestContent
  param: number[]

  isFinished: boolean

  constructor(gameQuest: GameQuest) {
    this.gameQuest = gameQuest
  }

  async init(data: QuestUserData.FinishCond) {
    this.type = data.type
    this.param = data.param

    this.isFinished = data.isFinished
  }

  async initNew(type: QuestContent, param: number[]) {
    this.type = type
    this.param = param
    this.isFinished = false
  }

  finish() {
    this.isFinished = true
  }

  export(): QuestUserData.FinishCond {
    return {
      type: this.type,
      param: this.param,
      isFinished: this.isFinished,
    }
  }
}
