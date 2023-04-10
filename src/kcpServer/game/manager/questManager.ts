import Player from "$/player"
import GameMainQuest from "$/quest/gameMainQuest"
import QuestUserData from "@/types/user/QuestUserData"

export default class QuestManager {
  player: Player

  questList: GameMainQuest[]

  constructor(player: Player) {
    this.player = player
    this.questList = []
  }

  init(userData: QuestUserData) {
    this.questList = userData?.quest || []
  }

  exportQuestData(): GameMainQuest[] {
    return this.questList
  }
}
