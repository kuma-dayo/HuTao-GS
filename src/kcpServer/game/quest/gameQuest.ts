import { QuestState } from "./enum"
import GameMainQuest from "./gameMainQuest"

import QuestListUpdate from "#/packets/QuestListUpdate"
import { SubQuest } from "$DT/BinOutput/Quest"
import { Quest } from "@/types/proto"
import { getTimeSeconds } from "@/utils/time"

export default class GameQuest {
  mainQuest: GameMainQuest

  mainQuestId: number
  subQuestId: number

  state: QuestState

  startTime: number
  startGameTime: number
  acceptTime: number
  finishTime: number

  startGameday: number

  finishProgressList: number[]
  failProgressList: number[]

  constructor(mainQuest: GameMainQuest, questData: SubQuest) {
    this.mainQuest = mainQuest
    this.mainQuestId = questData.MainId
    this.subQuestId = questData.SubId
    this.state = QuestState.QUEST_STATE_NONE
    this.finishProgressList = [0]
  }

  async start() {
    this.acceptTime = getTimeSeconds()
    this.startTime = this.acceptTime
    this.startGameday = this.mainQuest.player.gameTime / 1440
    this.startGameTime = this.mainQuest.player.gameTime
    this.state = QuestState.QUEST_STATE_UNFINISHED

    QuestListUpdate.sendNotify(this.mainQuest.player.context)
  }

  exportQuestData() {
    if (this.state != QuestState.QUEST_STATE_NONE)
      return {
        acceptTime: this.acceptTime,
        finishProgressList: this.finishProgressList,
        parentQuestId: this.mainQuest.parentQuestId,
        questId: this.subQuestId,
        startGameTime: this.startGameTime,
        startTime: this.startTime,
        state: this.state,
      } as Quest
  }
}
