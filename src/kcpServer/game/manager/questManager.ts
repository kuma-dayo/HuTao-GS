import QuestListUpdate from "#/packets/QuestListUpdate"
import Player from "$/player"
import FinishExecAction from "$/quest/FinishExecAction"
import GameMainQuest from "$/quest/gameMainQuest"
import { questEncryptionKey } from "$/quest/QuestEncryptionKeys"
import QuestUserData from "@/types/user/QuestUserData"
export default class QuestManager {
  player: Player

  questList: GameMainQuest[]

  finishExecAction: FinishExecAction

  constructor(player: Player) {
    this.player = player
    this.questList = []

    this.finishExecAction = new FinishExecAction(this)
  }

  static getQuestKey(parentQuestId: number): BigInt {
    return questEncryptionKey.find((key) => key.mainQuestId === parentQuestId)?.encryptionKey || 0n
  }

  async init(userData: QuestUserData) {
    this.questList =
      (await Promise.all(
        userData.quest.map(async (mainQuest) => {
          const gameMainQuest = new GameMainQuest(this.player)
          await gameMainQuest.init(mainQuest)
          return gameMainQuest
        })
      )) || []
  }

  async addMainQuest(parentQuestId: number): Promise<boolean> {
    const gameMainQuest = new GameMainQuest(this.player)

    const result = await gameMainQuest.initNew(this.player, parentQuestId)
    if (result) {
      this.questList.push(gameMainQuest)
      return true
    } else return false
  }

  async removeMainQuest(parentQuestId: number): Promise<boolean> {
    const gameMainQuest = this.getMainQuest(parentQuestId)
    if (!gameMainQuest) return false

    this.questList = this.questList.filter((quest) => quest != gameMainQuest)

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
