import Player from "$/player"
import GameMainQuest from "$/quest/gameMainQuest"

export default class QuestManager {
  player: Player

  questList: { [questId: number]: GameMainQuest }

  constructor(player: Player) {
    this.player = player
    this.questList = {}
  }
}
