import Packet, { PacketContext, PacketInterface } from "#/packet"
import { Quest } from "@/types/proto"
import { getTimeSeconds } from "@/utils/time"

export interface QuestListNotify {
  questList: Quest[]
}

class QuestListPacket extends Packet implements PacketInterface {
  constructor() {
    super("QuestList")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    const now = getTimeSeconds()

    const notifyData: QuestListNotify = {
      questList: [
        // {
        //   acceptTime: now,
        //   finishProgressList: [0],
        //   parentQuestId: 40092,
        //   questId: 4009201,
        //   startGameTime: context.player.gameTime,
        //   startTime: now,
        //   state: 2,
        // },
      ],
    }

    await super.sendNotify(context, notifyData)
  }
}

let packet: QuestListPacket
export default (() => (packet = packet || new QuestListPacket()))()
