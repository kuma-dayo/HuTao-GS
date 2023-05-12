import ChallengeTrigger from "./trigger/challangeTrigger"

import DungeonChallengeBegin from "#/packets/DungeonChallengeBegin"
import DungeonChallengeFinish from "#/packets/DungeonChallengeFinish"
import SceneGroup from "$/scene/sceneGroup"
import { EventTypeEnum } from "@/types/enum"
import { getTimeSeconds } from "@/utils/time"

export default class DungeonChallenge {
  sceneGroup: SceneGroup
  groupId: number

  challengeId: number
  challengeIndex: number

  startedAt: number
  finishedTime: number

  goal: number
  progress: boolean
  success: boolean
  timelimit: number
  score: number

  uidList: number[]
  paramList: number[]

  constructor(sceneGroup: SceneGroup, challengeId: number, challengeIndex: number, paramList: number[]) {
    this.sceneGroup = sceneGroup
    this.groupId = sceneGroup.id

    this.challengeId = challengeId
    this.challengeIndex = challengeIndex
    this.paramList = paramList
    this.goal = paramList[0]
    this.timelimit = paramList[1]
    this.score = 0

    this.progress = false
    this.success = false

    this.sceneGroup.scene.challenge = this
  }

  set setProgress(progress: boolean) {
    this.progress = progress
    this.sceneGroup.scene.ischallenge = progress
  }

  set setScore(score: number) {
    this.score = score
  }

  incrementScore() {
    this.score += 1
    return this.score
  }

  async start() {
    if (this.progress) return

    this.success = false
    this.setProgress = true
    this.startedAt = getTimeSeconds()

    this.uidList = this.sceneGroup.scene.broadcastContextList.map((context) => {
      return context.client.player.uid
    })

    await new ChallengeTrigger().OnBegin(this)

    await DungeonChallengeBegin.broadcastNotify(this.sceneGroup.scene.broadcastContextList, this)
  }

  async done() {
    if (!this.progress) return

    this.success = true
    this.setProgress = false

    await DungeonChallengeFinish.broadcastNotify(this.sceneGroup.scene.broadcastContextList, this)
    await this.sceneGroup.scene.scriptManager.emit(EventTypeEnum.EVENT_CHALLENGE_SUCCESS, this.groupId)

    this.settle()
  }

  async settle() {
    if (this.progress || !this.success) return

    await this.sceneGroup.scene.scriptManager.emit(EventTypeEnum.EVENT_DUNGEON_SETTLE, this.groupId)
  }

  async fail() {
    if (!this.progress) return

    this.success = false
    this.setProgress = false

    await DungeonChallengeFinish.broadcastNotify(this.sceneGroup.scene.broadcastContextList, this)
    await this.sceneGroup.scene.scriptManager.emit(EventTypeEnum.EVENT_CHALLENGE_FAIL, this.groupId)
  }
}
