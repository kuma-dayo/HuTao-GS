import ScriptLoader from "./scriptLoader"
import ScriptTrigger from "./scriptTrigger"

import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"
import { EventTypeEnum } from "@/types/enum"

export default class scriptManager {
  currentGroup: SceneGroup

  scriptLoader: ScriptLoader
  scriptTrigger: ScriptTrigger

  logger: Logger
  constructor(currentGroup: SceneGroup) {
    this.currentGroup = currentGroup

    this.scriptLoader = new ScriptLoader()
    this.scriptTrigger = new ScriptTrigger()
    this.logger = new Logger("ScriptManager", 0xff7f50)
  }

  async emit(type: EventTypeEnum, ...args: any[]) {
    const { scriptTrigger } = this

    await scriptTrigger.runTrigger(this, type, ...args)
  }
}
