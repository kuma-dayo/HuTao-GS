import Packet, { PacketInterface, PacketContext } from "#/packet"
import DungeonChallenge from "$/challenge/dungeonChallenge"
import {
  ChannellerSlabLoopDungeonResultInfo,
  CustomDungeonResultInfo,
  EffigyChallengeDungeonResultInfo,
  PotionDungeonResultInfo,
  StrengthenPointData,
} from "@/types/proto"

export interface DungeonChallengeFinishNotify {
  challengeIndex: number
  finishType?: number
  isSuccess: boolean
  challengeRecordType: number
  isNewRecord?: boolean
  currentValue?: number
  timeCost?: number
  strengthenPointDataMap?: { [id: number]: StrengthenPointData }
  channellerSlabLoopDungeonResultInfo?: ChannellerSlabLoopDungeonResultInfo
  effigyChallengeDungeonResultInfo?: EffigyChallengeDungeonResultInfo
  potionDungeonResultInfo?: PotionDungeonResultInfo
  customDungeonResultInfo?: CustomDungeonResultInfo
}

class DungeonChallengeFinishPacket extends Packet implements PacketInterface {
  constructor() {
    super("DungeonChallengeFinish")
  }

  async sendNotify(context: PacketContext, notifyData: DungeonChallengeFinishNotify): Promise<void> {
    await super.sendNotify(context, notifyData)
  }

  async broadcastNotify(contextList: PacketContext[], dungeonChallenge: DungeonChallenge): Promise<void> {
    const notifyData: DungeonChallengeFinishNotify = {
      challengeIndex: dungeonChallenge.challengeIndex,
      finishType: dungeonChallenge.success ? 2 : 1,
      isSuccess: dungeonChallenge.success,
      challengeRecordType: 2,
    }
    await super.broadcastNotify(contextList, notifyData)
  }
}

let packet: DungeonChallengeFinishPacket
export default (() => (packet = packet || new DungeonChallengeFinishPacket()))()
