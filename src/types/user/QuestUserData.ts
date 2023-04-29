import { ParentQuestState, QuestContent, QuestExec, QuestState } from "$/quest/enum"

export interface FinishCond {
  type: QuestContent
  param: number[]
  isFinished: boolean
}

export interface FinishExec {
  type: QuestExec
  param: string[]
}
export interface ChildQuest {
  parentQuestId: number
  subQuestId: number
  state: QuestState
  startTime: number
  startGameTime: number
  acceptTime: number
  finishTime: number
  startGameDay: number
  finishCond?: FinishCond[]
  finishExec?: FinishExec[]
  finishProgressList: number[]
  failProgressList: number[]
}

export interface Quest {
  ownerUid: number
  parentQuestId: number
  questVars: number[]
  timeVar: number[]
  parentQuestState: ParentQuestState
  childQuest: ChildQuest[]
  isFinished: boolean
}

export default interface QuestUserData {
  quest: Quest[]
}
