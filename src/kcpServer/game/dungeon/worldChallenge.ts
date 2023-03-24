import DungeonChallengeBegin from "#/packets/DungeonChallengeBegin"
import Scene from "$/scene"
import SceneGroup from "$/scene/sceneGroup"

export default class WorldChallenge {
  scene: Scene
  sceneGroup: SceneGroup

  challengeId: number
  challengeIndex: number
  startedAt: number

  progress: boolean
  success: boolean

  constructor(scene: Scene, sceneGroup: SceneGroup, challengeId: number, challengeIndex: number) {
    this.scene = scene
    this.sceneGroup = sceneGroup

    this.challengeId = challengeId
    this.challengeIndex = challengeIndex

    this.progress = false
    this.success = false
  }

  start() {
    if (this.progress) return

    this.progress = true
    this.startedAt = this.scene.timestampSceneTime

    DungeonChallengeBegin.broadcastNotify(this.scene.broadcastContextList, this)
  }

  done() {
    if (!this.progress) return

    this.success = true

    this.sceneGroup.scriptManager.EVENT_CHALLENGE_SUCCESS()
  }

  fail() {
    if (!this.progress) return

    this.progress = false
    this.sceneGroup.scriptManager.EVENT_CHALLENGE_FAIL()
  }
}
