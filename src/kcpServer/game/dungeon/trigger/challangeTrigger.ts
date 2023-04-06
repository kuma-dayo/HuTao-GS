import DungeonChallenge from "../dungeonChallenge"

import KillGadgetTrigger from "./killGadgetTrigger"
import KillMonsterTrigger from "./killMonsterTrigger"

export default class ChallengeTrigger {
  public async OnBegin(challenge: DungeonChallenge) {
    await new KillGadgetTrigger().OnBegin(challenge)
    await new KillMonsterTrigger().OnBegin(challenge)
  }
}
