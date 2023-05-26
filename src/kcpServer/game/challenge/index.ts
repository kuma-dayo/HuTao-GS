import ChallengeFactory from "./factory"

import DungeonChallengeBegin from "#/packets/DungeonChallengeBegin"
import DungeonChallengeFinish from "#/packets/DungeonChallengeFinish"
import Scene from "$/scene"
import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"
import { EventTypeEnum } from "@/types/enum"
import { getTimeSeconds } from "@/utils/time"

export default class Challenge {
  scene: Scene
  sceneGroup: SceneGroup
  challengeId: number
  challengeIndex: number
  paramList: number[]
  timeLimit: number
  goal: number
  score: number
  progress: boolean
  success: boolean
  startedAt: number
  finishedTime: number
  challengeTrigger: ChallengeFactory[]

  logger: Logger

  constructor(
    scene: Scene,
    sceneGroup: SceneGroup,
    challengeId: number,
    challengeIndex: number,
    paramList: number[],
    timeLimit: number,
    goal: number,
    challengeTrigger: ChallengeFactory[]
  ) {
    this.scene = scene
    this.sceneGroup = sceneGroup
    this.challengeId = challengeId
    this.challengeIndex = challengeIndex
    this.paramList = paramList
    this.timeLimit = timeLimit
    this.goal = goal
    this.challengeTrigger = challengeTrigger

    this.logger = new Logger("Challenge", 0x8696fe)
  }

  get increaseScore() {
    this.score++
    return this.score
  }

  public async start() {
    if (this.progress) return this.logger.debug("Challenge already started")
    this.progress = true
    this.startedAt = getTimeSeconds()

    await DungeonChallengeBegin.broadcastNotify(this.scene.broadcastContextList, this)
  }

  public async done() {
    if (!this.progress) return
    await this.finish(true)

    this.scene.scriptManager.emit(EventTypeEnum.EVENT_CHALLENGE_SUCCESS, this.sceneGroup.id)
  }

  public async fail() {
    if (!this.progress) return
    this.progress = false

    await this.finish(false)

    this.scene.scriptManager.emit(EventTypeEnum.EVENT_CHALLENGE_FAIL, this.sceneGroup.id)
  }

  private async finish(success: boolean) {
    this.progress = false
    this.success = success
    this.finishedTime = this.scene.timestamp - this.startedAt

    await DungeonChallengeFinish.broadcastNotify(this.scene.broadcastContextList, this)
  }
}
