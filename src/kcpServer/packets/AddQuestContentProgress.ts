import Packet, { PacketInterface, PacketContext } from "#/packet"
import { RetcodeEnum } from "@/types/proto/enum"

export interface AddQuestContentProgressReq {
  addProgress: number
  param: number
  contentType: number
}

export interface AddQuestContentProgressRsp {
  contentType: number
  retcode: RetcodeEnum
}

class AddQuestContentProgressPacket extends Packet implements PacketInterface {
  constructor() {
    super("AddQuestContentProgress")
  }

  async request(context: PacketContext, data: AddQuestContentProgressReq): Promise<void> {
    //Todo

    this.response(context, {
      contentType: data.contentType,
      retcode: RetcodeEnum.RET_SUCC,
    })
  }

  async response(context: PacketContext, data: AddQuestContentProgressRsp): Promise<void> {
    await super.response(context, data)
  }
}

let packet: AddQuestContentProgressPacket
export default (() => (packet = packet || new AddQuestContentProgressPacket()))()
