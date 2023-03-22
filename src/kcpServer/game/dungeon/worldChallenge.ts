import Scene from "$/scene"
import SceneGroup from "$/scene/sceneGroup"

export default class WorldChallenge {
  scene: Scene
  sceneGroup: SceneGroup

  isprogress: boolean
  isfinish: boolean

  constructor(scene: Scene, sceneGroup: SceneGroup) {
    this.scene = scene
    this.sceneGroup = sceneGroup

    this.isprogress = false
    this.isfinish = false
  }

  get isdone() {
    return this.finish
  }

  start() {
    if (this.isprogress) return

    this.isprogress = true
  }

  finish() {
    if (!this.isprogress) return

    this.sceneGroup.scriptManager.EVENT_CHALLENGE_SUCCESS()
  }

  fail() {
    if (!this.isprogress) return

    this.sceneGroup.scriptManager.EVENT_CHALLENGE_FAIL()
  }
}
