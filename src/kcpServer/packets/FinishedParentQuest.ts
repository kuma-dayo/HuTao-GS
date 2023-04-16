import Packet, { PacketContext, PacketInterface } from "#/packet"
import { ParentQuest } from "@/types/proto"

export interface FinishedParentQuestNotify {
  parentQuestList: ParentQuest[]
}

class FinishedParentQuestPacket extends Packet implements PacketInterface {
  constructor() {
    super("FinishedParentQuest")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    const notifyData: FinishedParentQuestNotify = {
      parentQuestList: context.player.questManager.exportQuestData().map((quest) => {
        return {
          parentQuestId: quest.parentQuestId,
          isFinished: quest.isFinished,
        }
      }),
    }

    await super.sendNotify(context, notifyData)
  }
}

let packet: FinishedParentQuestPacket
export default (() => (packet = packet || new FinishedParentQuestPacket()))()
