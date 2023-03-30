import Packet, { PacketInterface, PacketContext } from "#/packet"
import DungeonChallenge from "$/dungeon/dungeonChallenge"

export interface DungeonChallengeBeginNotify {
  challengeId: number
  challengeIndex: number
  groupId: number
  fatherIndex?: number
  uidList?: number[]
  paramList?: number[]
}

class DungeonChallengeBeginPacket extends Packet implements PacketInterface {
  constructor() {
    super("DungeonChallengeBegin")
  }

  async sendNotify(context: PacketContext, notifyData: DungeonChallengeBeginNotify): Promise<void> {
    await super.sendNotify(context, notifyData)
  }

  async broadcastNotify(contextList: PacketContext[], dungeonChallenge: DungeonChallenge): Promise<void> {
    const notifyData: DungeonChallengeBeginNotify = {
      challengeId: dungeonChallenge.challengeId,
      challengeIndex: dungeonChallenge.challengeIndex,
      groupId: dungeonChallenge.groupId,
      uidList: dungeonChallenge.uidList,
      paramList: dungeonChallenge.paramList,
    }

    await super.broadcastNotify(contextList, notifyData)
  }
}

let packet: DungeonChallengeBeginPacket
export default (() => (packet = packet || new DungeonChallengeBeginPacket()))()
