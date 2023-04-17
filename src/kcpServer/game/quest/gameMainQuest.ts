import { ParentQuestState } from "./enum"
import GameQuest from "./gameQuest"

import QuestData from "$/gameData/data/QuestData"
import Player from "$/player"
import { Talk } from "$DT/BinOutput/Quest"

export default class GameMainQuest {
  ownerUid: number

  parentQuestId: number
  questVars: number[]
  timeVar: number[]
  parentQuestState: ParentQuestState
  childQuest: GameQuest[]
  isFinished: boolean

  talks: Talk[]

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async init(data: {
    ownerUid: number
    parentQuestId: number
    questVars: number[]
    timeVar: number[]
    parentQuestState: ParentQuestState
    childQuest: GameQuest[]
    isFinished: boolean
  }) {
    this.ownerUid = data.ownerUid

    this.parentQuestId = data.parentQuestId
    this.questVars = data.questVars
    this.timeVar = data.timeVar
    this.parentQuestState = data.parentQuestState
    this.isFinished = data.isFinished

    const questData = await QuestData.getQuestData(this.parentQuestId)

    this.talks = questData.Talks

    this.childQuest = await Promise.all(
      data.childQuest.map((childQuest) => {
        const gameQuest = new GameQuest()
        gameQuest.init(childQuest)
        return gameQuest
      })
    )
  }
  async initNew(player: Player, parentQuestId: number): Promise<boolean> {
    this.ownerUid = player.uid

    this.parentQuestId = parentQuestId
    this.questVars = [0, 0, 0, 0, 0] //official server always has a list of 5 questVars, with default value 0
    this.timeVar = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    this.parentQuestState = ParentQuestState.PARENT_QUEST_STATE_NONE
    this.isFinished = false

    return await this.addAllChildQuest()
  }

  async addAllChildQuest(): Promise<boolean> {
    const questData = await QuestData.getQuestData(this.parentQuestId)
    if (!questData) return false

    this.talks = questData.Talks
    this.childQuest = await Promise.all(
      questData.SubQuests.map(async (subQuest) => {
        const gameQuest = new GameQuest()
        await gameQuest.initNew(subQuest)
        return gameQuest
      })
    )

    return true
  }

  exportQuestData() {
    return this.childQuest?.map((quest) => quest.exportQuestData()).filter((p) => p !== undefined)
  }
  exportMainQuestData() {
    return {
      ownerUid: this.ownerUid,
      parentQuestId: this.parentQuestId,
      questVars: this.questVars,
      timeVar: this.timeVar,
      childQuest: this.childQuest,
      parentQuestState: this.parentQuestState,
      isFinished: this.isFinished,
    }
  }
  expor
}
