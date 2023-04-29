import { QuestContent, QuestState } from "./enum"
import FinishCond from "./finishCond"
import FinishExec from "./finishExec"
import GameMainQuest from "./gameMainQuest"

import QuestListUpdate from "#/packets/QuestListUpdate"
import Player from "$/player"
import { SubQuest } from "$DT/BinOutput/Quest"
import { Quest } from "@/types/proto"
import { ChildQuest } from "@/types/user/QuestUserData"
import { getTimeSeconds } from "@/utils/time"

export default class GameQuest {
  mainQuest: GameMainQuest
  parentQuestId: number
  subQuestId: number

  state: QuestState

  startTime: number
  startGameTime: number
  acceptTime: number
  finishTime: number

  startGameDay: number

  finishCond: FinishCond[]
  finishExec: FinishExec[]

  finishProgressList: number[]
  failProgressList: number[]

  constructor(mainQuest: GameMainQuest) {
    this.mainQuest = mainQuest
  }

  get player(): Player {
    return this.mainQuest.player
  }

  async init(data: ChildQuest) {
    Object.assign(this, Object.assign({}, data, { finishCond: undefined, finishExec: undefined }))

    this.finishCond = await Promise.all(
      data?.finishCond?.map(async (finishCond) => {
        const finishCondClass = new FinishCond(this)
        await finishCondClass.init(finishCond)
        return finishCondClass
      })
    )

    this.finishExec = await Promise.all(
      data?.finishExec?.map(async (finishExec) => {
        const finishExecClass = new FinishExec(this)
        await finishExecClass.init(finishExec)
        return finishExecClass
      })
    )
  }

  async initNew(questData: SubQuest) {
    this.finishCond = await Promise.all(
      questData.FinishCond?.map(async (finishCond) => {
        const finishCondClass = new FinishCond(this)
        await finishCondClass.initNew(finishCond.Type, finishCond.Param)
        return finishCondClass
      }) || []
    )

    this.finishExec = await Promise.all(
      questData.FinishExec?.map(async (finishExec) => {
        const finishExecClass = new FinishExec(this)
        await finishExecClass.initNew(finishExec.Type, finishExec.Param)
        return finishExecClass
      }) || []
    )

    this.parentQuestId = questData.MainId
    this.subQuestId = questData.SubId
    this.state = QuestState.QUEST_STATE_NONE
    this.finishProgressList = [0]
  }

  async accept(player: Player): Promise<boolean> {
    if (this.acceptTime !== undefined) return false

    this.acceptTime = getTimeSeconds()
    this.startTime = this.acceptTime
    this.startGameDay = player.gameTime / 1440
    this.startGameTime = player.gameTime
    this.state = QuestState.QUEST_STATE_UNFINISHED

    QuestListUpdate.sendNotify(player.context)
    return true
  }

  async finish(): Promise<void> {
    // Todo
    this.state = QuestState.QUEST_STATE_FINISHED
    this.finishTime = getTimeSeconds()

    await QuestListUpdate.sendNotify(this.player.context)

    await this.mainQuest.childQuest
      .find((childQuest) => childQuest.subQuestId === this.subQuestId + 1)
      ?.accept(this.player)
  }

  async finishCondExecute(trigger: QuestContent, param?: number[]) {
    if (param) {
      this.finishCond
        .filter(
          (finishCond) =>
            finishCond.type.toString() == QuestContent[trigger] && this.array_equal(finishCond.param, param)
        )
        .map((finishCond) => {
          finishCond.finish()
        })
    } else {
      this.finishCond
        .filter((finishCond) => finishCond.type.toString() == QuestContent[trigger])
        .map((finishCond) => {
          finishCond.finish()
        })
    }

    if (this.finishCond.every((finishCond) => finishCond.isFinished)) {
      this.finishExec.map(async (finishExec) => await finishExec.execute())
      await this.finish()
    }
  }

  array_equal(a: any[], b: any[]) {
    if (!Array.isArray(a)) return false
    if (!Array.isArray(b)) return false
    if (a.length != b.length) return false
    for (let i = 0, n = a.length; i < n; ++i) {
      if (a[i] !== b[i]) return false
    }
    return true
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

  export() {
    return {
      parentQuestId: this.parentQuestId,
      subQuestId: this.subQuestId,
      state: this.state,
      startTime: this.startTime,
      startGameTime: this.startGameTime,
      acceptTime: this.acceptTime,
      finishTime: this.finishTime,
      startGameDay: this.startGameDay,
      finishCond: this.finishCond.map((finishCond) => finishCond.export()),
      finishExec: this.finishExec.map((finishExec) => finishExec.export()),
      finishProgressList: this.finishProgressList,
      failProgressList: this.failProgressList,
    }
  }
}
