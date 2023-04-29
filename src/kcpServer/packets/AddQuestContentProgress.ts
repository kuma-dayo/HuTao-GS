import Packet, { PacketInterface, PacketContext } from "#/packet"
import { QuestContent } from "$/quest/enum"
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
    const parentQuestId = Math.floor(data.param / 100)

    const type = QuestContent[data.contentType]

    if (type != null) {
      context.player.questManager
        .getMainQuest(parentQuestId)
        .childQuest.find((quest) => quest.subQuestId === data.param)
        .finishCondExecute(data.contentType)
    }

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
