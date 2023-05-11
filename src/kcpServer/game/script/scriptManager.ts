import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"
import { EventTypeEnum } from "@/types/enum"

export default class scriptManager {
  currentGroup: SceneGroup

  logger: Logger
  constructor(currentGroup: SceneGroup) {
    this.currentGroup = currentGroup

    this.logger = new Logger("ScriptManager", 0xff7f50)
  }

  emit(type: EventTypeEnum, ...args: any[]) {
    const { scriptTrigger, scriptLoader } = this.currentGroup.scene

    scriptTrigger.runTrigger(scriptLoader, this, type, ...args)
  }
}
