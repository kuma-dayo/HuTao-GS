import Packet, { PacketInterface, PacketContext } from "#/packet"
import {
  ChannellerSlabLoopDungeonResultInfo,
  CustomDungeonResultInfo,
  EffigyChallengeDungeonResultInfo,
  PotionDungeonResultInfo,
  StrengthenPointData,
} from "@/types/proto"

export interface DungeonChallengeFinishNotify {
  challengeIndex: number
  finishType: number
  isSuccess: boolean
  challengeRecordType: number
  isNewRecord: boolean
  currentValue: number
  timeCost: number
  strengthenPointDataMap: { [id: number]: StrengthenPointData }
  channellerSlabLoopDungeonResultInfo: ChannellerSlabLoopDungeonResultInfo
  effigyChallengeDungeonResultInfo: EffigyChallengeDungeonResultInfo
  potionDungeonResultInfo: PotionDungeonResultInfo
  customDungeonResultInfo: CustomDungeonResultInfo
}

class DungeonChallengeFinishPacket extends Packet implements PacketInterface {
  constructor() {
    super("DungeonChallengeFinish")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    // const notifyData: DungeonChallengeFinishNotify = {}
    // await super.sendNotify(context, notifyData)
  }

  async broadcastNotify(contextList: PacketContext[], ...data: any[]): Promise<void> {
    await super.broadcastNotify(contextList, ...data)
  }
}

let packet: DungeonChallengeFinishPacket
export default (() => (packet = packet || new DungeonChallengeFinishPacket()))()
