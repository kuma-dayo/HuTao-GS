import { QuestDatumType, SubQuest } from "./BinOutput/Quest"

export interface QuestData {
  Id: number
  Series: number
  ChapterId: number
  Type: QuestDatumType
  SubQuests: SubQuest[]
}

export default interface QuestDataGroup {
  Quest: QuestData[]
}
