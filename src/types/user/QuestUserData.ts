import { ParentQuestState } from "$/quest/enum"
import GameQuest from "$/quest/gameQuest"

export default interface QuestUserData {
  quest: {
    ownerUid: number
    parentQuestId: number
    questVars: number[]
    timeVar: number[]
    parentQuestState: ParentQuestState
    childQuest: GameQuest[]
    isFinished: boolean
  }[]
}
