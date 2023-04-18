import QuestListUpdate from "#/packets/QuestListUpdate"
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

  async init(userData: QuestUserData) {
    this.questList =
      (await Promise.all(
        userData?.quest.map((mainQuest) => {
          const gameMainQuest = new GameMainQuest()
          gameMainQuest.init(mainQuest)
          return gameMainQuest
        })
      )) || []
  }

  async addMainQuest(parentQuestId: number): Promise<boolean> {
    const gameMainQuest = new GameMainQuest()

    const result = await gameMainQuest.initNew(this.player, parentQuestId)
    if (result) {
      this.questList.push(gameMainQuest)
      return true
    } else return false
  }

  async removeMainQuest(parentQuestId: number): Promise<boolean> {
    const gameMainQuest = this.getMainQuest(parentQuestId)
    if (!gameMainQuest) return false

    this.questList = this.questList.filter((quest) => quest.parentQuestId !== parentQuestId)

    QuestListUpdate.sendNotify(this.player.context)

    return true
  }

  getMainQuest(parentQuestId: number): GameMainQuest {
    return this.questList.find((quest) => quest.parentQuestId === parentQuestId)
  }

  exportQuestData(): GameMainQuest[] {
    return this.questList
  }
}
