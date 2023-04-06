import DungeonChallenge from "../dungeonChallenge"

import ChallengeData from "#/packets/ChallengeData"

export default class KillGadgetTrigger {
  public async OnBegin(challenge: DungeonChallenge) {
    const { challengeIndex, sceneGroup, score } = challenge

    await ChallengeData.broadcastNotify(sceneGroup.block.scene.broadcastContextList, {
      challengeIndex: challengeIndex,
      paramIndex: 2,
      value: score,
    })
  }

  public async GadgetDeath(challenge: DungeonChallenge) {
    let { challengeIndex, sceneGroup, goal } = challenge
    const newScore = challenge.incrementScore()

    await ChallengeData.broadcastNotify(sceneGroup.block.scene.broadcastContextList, {
      challengeIndex: challengeIndex,
      paramIndex: 2,
      value: newScore,
    })

    if (newScore >= goal) {
      challenge.done()
    }
  }
}
