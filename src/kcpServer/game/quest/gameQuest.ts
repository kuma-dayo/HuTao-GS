import { QuestState } from "./enum"

import QuestListUpdate from "#/packets/QuestListUpdate"
import Player from "$/player"
import { SubQuest } from "$DT/BinOutput/Quest"
import { Quest } from "@/types/proto"
import { getTimeSeconds } from "@/utils/time"

export default class GameQuest {
  parentQuestId: number
  subQuestId: number

  state: QuestState

  startTime: number
  startGameTime: number
  acceptTime: number
  finishTime: number

  startGameDay: number

  finishProgressList: number[]
  failProgressList: number[]

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async init(data: {
    parentQuestId: number
    subQuestId: number

    state: QuestState

    startTime: number
    startGameTime: number
    acceptTime: number
    finishTime: number

    startGameDay: number

    finishProgressList: number[]
    failProgressList: number[]
  }) {
    Object.assign(this, data)
  }

  async initNew(questData: SubQuest) {
    this.parentQuestId = questData.MainId
    this.subQuestId = questData.SubId
    this.state = QuestState.QUEST_STATE_NONE
    this.finishProgressList = [0]
  }

  async start(player: Player) {
    this.acceptTime = getTimeSeconds()
    this.startTime = this.acceptTime
    this.startGameDay = player.gameTime / 1440
    this.startGameTime = player.gameTime
    this.state = QuestState.QUEST_STATE_UNFINISHED

    QuestListUpdate.sendNotify(player.context)
  }

  exportQuestData(): Quest {
    if (this.state != QuestState.QUEST_STATE_NONE)
      return {
        acceptTime: this.acceptTime,
        finishProgressList: this.finishProgressList,
        parentQuestId: this.parentQuestId,
        questId: this.subQuestId,
        startGameTime: this.startGameTime,
        startTime: this.startTime,
        state: this.state,
      }
  }
}
