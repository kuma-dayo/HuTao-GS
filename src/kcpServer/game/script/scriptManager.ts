import Player from "$/player"
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

  setGroup(sceneGroup: SceneGroup) {
    this.sceneGroups.set(sceneGroup.id, sceneGroup)
  }
  get host(): Player {
    return this.scene.world.host
  }

  findGroup(id: number): SceneGroup {
    return this.sceneGroups.get(id)
  }

  async emit(type: EventTypeEnum, groupId: number, ...args: any[]) {
    const { scriptTrigger, scriptLoader } = this.scene
    this.currentGroup = this.sceneGroups.get(groupId)

    if (this.currentGroup != undefined) await scriptTrigger.runTrigger(scriptLoader, this, type, ...args)
    else this.logger.error(`No group with id ${groupId}`)
  }
}
