import DungeonChallenge from "../dungeonChallenge"

import ChallengeData from "#/packets/ChallengeData"

export default class KillMonsterTrigger {
  public async OnBegin(challenge: DungeonChallenge) {
    let { challengeIndex, sceneGroup, score } = challenge

    await ChallengeData.broadcastNotify(sceneGroup.block.scene.broadcastContextList, {
      challengeIndex: challengeIndex,
      paramIndex: 1,
      value: score,
    })
  }

  public async MonsterDeath(challenge: DungeonChallenge) {
    let { challengeIndex, sceneGroup, goal } = challenge
    const newScore = challenge.incrementScore()

    await ChallengeData.broadcastNotify(sceneGroup.block.scene.broadcastContextList, {
      challengeIndex: challengeIndex,
      paramIndex: 1,
      value: newScore,
    })

    if (newScore >= goal) {
      challenge.done()
    }
  }
}
