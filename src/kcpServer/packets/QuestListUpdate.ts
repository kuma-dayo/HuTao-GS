import Packet, { PacketInterface, PacketContext } from "#/packet"
import { Quest } from "@/types/proto"

export interface QuestListUpdateNotify {
  questList: Quest[]
}

class QuestListUpdatePacket extends Packet implements PacketInterface {
  constructor() {
    super("QuestListUpdate")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    const questList = context.player.questManager.exportQuestData().flatMap((quest) => quest.exportQuestData())

    const notifyData: QuestListUpdateNotify = {
      questList: questList,
    }

    await super.sendNotify(context, notifyData)
  }

  async broadcastNotify(contextList: PacketContext[], ...data: any[]): Promise<void> {
    await super.broadcastNotify(contextList, ...data)
  }
}

let packet: QuestListUpdatePacket
export default (() => (packet = packet || new QuestListUpdatePacket()))()
