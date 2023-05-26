import ChallengeFactoryHandler from "./handler"
import KillAndGuardChallengeFactoryHandler from "./killAndGuard"
import KillMonsterCountChallengeFactoryHandler from "./killMonsterCount"
import KillMonsterInTimeChallengeFactoryHandler from "./killMonsterInTime"
import SurviveChallengeFactoryHandler from "./survive"
import TriggerInTimeChallengeFactoryHandler from "./triggerInTime"

export default class ChallengeFactory {
  private static challengeFactoryHandlers: Array<ChallengeFactoryHandler> = []

  static {
    this.challengeFactoryHandlers.push(new KillAndGuardChallengeFactoryHandler())
    this.challengeFactoryHandlers.push(new KillMonsterCountChallengeFactoryHandler())
    this.challengeFactoryHandlers.push(new KillMonsterInTimeChallengeFactoryHandler())
    this.challengeFactoryHandlers.push(new SurviveChallengeFactoryHandler())
    this.challengeFactoryHandlers.push(new TriggerInTimeChallengeFactoryHandler())
  }

  public static getChallenge() {
    for (const handler of this.challengeFactoryHandlers) {
      // if (!handler.isThisType())
    }
  }
}
