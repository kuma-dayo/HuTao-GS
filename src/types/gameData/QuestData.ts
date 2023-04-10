import { SubQuest, Talk } from "./BinOutput/Quest"

import { QuestType } from "$/quest/enum"

export interface QuestData {
  Id: number
  Series: number
  ChapterId: number
  Type: QuestType
  Talks: Talk[]
  SubQuests: SubQuest[]
}

export default interface QuestDataGroup {
  Quest: QuestData[]
}
