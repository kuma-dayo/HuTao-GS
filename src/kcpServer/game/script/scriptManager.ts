import Scene from "$/scene"
import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"
import { EventTypeEnum } from "@/types/enum"

export default class scriptManager {
  scene: Scene
  sceneGroups: Map<number, SceneGroup>

  currentGroup: SceneGroup

  logger: Logger

  constructor(scene: Scene) {
    this.scene = scene
    this.sceneGroups = new Map()

    this.logger = new Logger("ScriptManager", 0xff7f50)
  }

  async emit(type: EventTypeEnum, sceneGroupId: number, ...args: any[]) {
    const { scriptTrigger, scriptLoader } = this.scene
    this.currentGroup = this.sceneGroups.get(sceneGroupId)

    await scriptTrigger.runTrigger(scriptLoader, this, type, ...args)
  }

  setGroup(sceneGroup: SceneGroup) {
    this.sceneGroups.set(sceneGroup.id, sceneGroup)
  }
}
