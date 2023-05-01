import Packet, { PacketContext, PacketInterface } from "#/packet"
import QuestManager from "$/manager/questManager"
import { ParentQuest } from "@/types/proto"

export interface FinishedParentQuestNotify {
  parentQuestList: ParentQuest[]
}

class FinishedParentQuestPacket extends Packet implements PacketInterface {
  constructor() {
    super("FinishedParentQuest")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    const parentQuests: ParentQuest[] = context.player.questManager.exportQuestData().map((quest) => ({
      parentQuestId: quest.parentQuestId,
      isFinished: quest.isFinished,
      videoKey: Number(QuestManager.getQuestKey(quest.parentQuestId)),
      childQuests: quest.childQuest.map((child) => ({
        questId: child.subQuestId,
        state: child.state,
      })),
    }))

    const notifyData: FinishedParentQuestNotify = { parentQuestList: parentQuests }
    await super.sendNotify(context, notifyData)
  }
}

let packet: FinishedParentQuestPacket
export default (() => (packet = packet || new FinishedParentQuestPacket()))()
