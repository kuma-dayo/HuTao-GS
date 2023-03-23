import Packet, { PacketInterface, PacketContext } from "#/packet"

export interface DungeonChallengeBeginNotify {
  challengeId: number
  challengeIndex: number
  groupId: number
  fatherIndex: number
  uidList: number[]
  paramList: number[]
}

class DungeonChallengeBeginPacket extends Packet implements PacketInterface {
  constructor() {
    super("DungeonChallengeBegin")
  }

  async sendNotify(context: PacketContext): Promise<void> {
    // const notifyData: DungeonChallengeBeginNotify = {}
    // await super.sendNotify(context, notifyData)
  }

  async broadcastNotify(contextList: PacketContext[], ...data: any[]): Promise<void> {
    await super.broadcastNotify(contextList, ...data)
  }
}

let packet: DungeonChallengeBeginPacket
export default (() => (packet = packet || new DungeonChallengeBeginPacket()))()
