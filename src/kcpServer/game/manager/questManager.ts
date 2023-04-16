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

  async addMainQuest(parentQuestId: number) {
    const gameMainQuest = new GameMainQuest(this.player, parentQuestId)

    await gameMainQuest.init()
    this.questList.push(gameMainQuest)
  }

  getMainQuest(parentQuestId: number) {
    return this.questList.find((quest) => quest.parentQuestId === parentQuestId)
  }

  exportQuestData(): GameMainQuest[] {
    return this.questList
  }
}
