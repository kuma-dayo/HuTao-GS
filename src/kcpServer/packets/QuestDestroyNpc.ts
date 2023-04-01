import Packet, { PacketInterface, PacketContext } from "#/packet"
import { RetcodeEnum } from "@/types/proto/enum"

export interface QuestDestroyNpcReq {
  parentQuestId: number
  npcId: number
}

export interface QuestDestroyNpcRsp {
  parentQuestId: number
  npcId: number
  retcode: RetcodeEnum
}

class QuestDestroyNpcPacket extends Packet implements PacketInterface {
  constructor() {
    super("QuestDestroyNpc")
  }

  async request(context: PacketContext, data: QuestDestroyNpcReq): Promise<void> {
    await this.response(context, {
      parentQuestId: data.parentQuestId,
      npcId: data.npcId,
      retcode: RetcodeEnum.RET_SUCC,
    })
  }

  async response(context: PacketContext, data: QuestDestroyNpcRsp): Promise<void> {
    await super.response(context, data)
  }
}

let packet: QuestDestroyNpcPacket
export default (() => (packet = packet || new QuestDestroyNpcPacket()))()
