import { ParentQuestState } from "./enum"
import GameQuest from "./gameQuest"

import QuestData from "$/gameData/data/QuestData"
import Player from "$/player"
import { Talk } from "$DT/BinOutput/Quest"
import { Quest } from "@/types/user/QuestUserData"

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

  constructor(player: Player) {
    this.player = player
  }

  async init(data: Quest) {
    Object.assign(this, Object.assign({}, data, { childQuest: undefined }))

    const questData = await QuestData.getQuestData(this.parentQuestId)

    this.talks = questData.Talks

    this.childQuest = await Promise.all(
      data.childQuest.map((childQuest) => {
        const gameQuest = new GameQuest(this)
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
    if (!questData.SubQuests) return false

    this.talks = questData.Talks
    this.childQuest = await Promise.all(
      questData.SubQuests.map(async (subQuest) => {
        const gameQuest = new GameQuest(this)
        await gameQuest.initNew(subQuest)
        return gameQuest
      })
    )

    return true
  }

  exportAllSubQuestData() {
    return this.childQuest?.map((quest) => quest.exportQuestData()).filter((p) => p !== undefined)
  }
  exportMainQuestData() {
    return {
      ownerUid: this.ownerUid,
      parentQuestId: this.parentQuestId,
      questVars: this.questVars,
      timeVar: this.timeVar,
      childQuest: this.childQuest.map((quest) => quest.export()),
      parentQuestState: this.parentQuestState,
      isFinished: this.isFinished,
    }
  }
}
