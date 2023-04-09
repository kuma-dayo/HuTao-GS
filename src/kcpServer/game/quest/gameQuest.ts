import { QuestState } from "./enum"
import GameMainQuest from "./gameMainQuest"

import { SubQuest } from "$DT/BinOutput/Quest"

export default class GameQuest {
  mainQuest: GameMainQuest
  mainQuestId: number
  subQuestID: number

  questState: QuestState
  constructor(mainQuest: GameMainQuest, questData: SubQuest) {
    this.mainQuest = mainQuest
    this.mainQuestId = questData.MainId
    this.subQuestID = questData.SubId
    this.questState = QuestState.QUEST_STATE_NONE
  }
}
