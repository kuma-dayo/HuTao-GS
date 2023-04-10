import { ParentQuestState } from "./enum"
import GameQuest from "./gameQuest"

import QuestData from "$/gameData/data/QuestData"
import Player from "$/player"
import { Talk } from "$DT/BinOutput/Quest"

export default class GameMainQuest {
  player: Player
  ownerUid: number

  parentQuestId: number
  questVars: number[]
  timeVar: number[]
  parentQuestState: ParentQuestState
  childQuest: GameQuest[]
  isFinished: boolean

  talks: Talk[]

  constructor(player: Player, parentQuestId: number) {
    this.player = player
    this.ownerUid = player.uid

    this.parentQuestId = parentQuestId
    this.questVars = [0, 0, 0, 0, 0] //official server always has a list of 5 questVars, with default value 0
    this.timeVar = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    this.parentQuestState = ParentQuestState.PARENT_QUEST_STATE_NONE
    this.isFinished = false

    this.addAllChildQuest()
  }

  async addAllChildQuest() {
    this.childQuest = (await QuestData.getQuestData(this.parentQuestId)).SubQuests.map(
      (subQuest) => new GameQuest(this, subQuest)
    )
  }

  exportQuestData() {
    const data = this.childQuest.map((quest) => quest.exportQuestData())

    return data
  }
}
