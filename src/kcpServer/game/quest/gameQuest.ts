import { QuestContent, QuestState } from "./enum"
import GameMainQuest from "./gameMainQuest"

import { SubQuest } from "$DT/BinOutput/Quest"
import { Quest } from "@/types/proto"
import { getTimeSeconds } from "@/utils/time"

export default class GameQuest {
  mainQuest: GameMainQuest
  questData: SubQuest

  mainQuestId: number
  subQuestID: number

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
    this.questData = questData
    this.mainQuestId = questData.MainId
    this.subQuestID = questData.SubId
    this.state = QuestState.QUEST_STATE_NONE
  }

  async start() {
    this.acceptTime = getTimeSeconds()
    this.startTime = this.acceptTime
    this.startGameday = this.mainQuest.player.gameTime / 1440
    this.startGameTime = this.mainQuest.player.gameTime
    this.state = QuestState.QUEST_STATE_UNFINISHED

    const triggerCondList = this.questData.FinishCond.filter((p) => p.Type == QuestContent.QUEST_CONTENT_TRIGGER_FIRE)

    if (triggerCondList.length > 0) {
      for (const triggerCond of triggerCondList) {
      }
    }
  }

  exportQuestData() {
    if (this.state != QuestState.QUEST_STATE_NONE)
      return {
        acceptTime: this.acceptTime,
        finishProgressList: this.finishProgressList,
        parentQuestId: this.mainQuest.parentQuestId,
        questID: this.subQuestID,
        startGameTime: this.startGameTime,
        startTime: this.startTime,
        state: this.state,
      } as Quest
  }
}
