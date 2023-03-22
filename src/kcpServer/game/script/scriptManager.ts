import ScriptLoader from "./scriptLoader"
import EVENT_ANY_MONSTER_DIE from "./trigger/EVENT_ANY_MONSTER_DIE"
import EVENT_ANY_MONSTER_LIVE from "./trigger/EVENT_ANY_MONSTER_LIVE"
import EVENT_GADGET_CREATE from "./trigger/EVENT_GADGET_CREATE"
import EVENT_GADGET_STATE_CHANGE from "./trigger/EVENT_GADGET_STATE_CHANGE"
import EVENT_SELECT_OPTION from "./trigger/EVENT_SELECT_OPTION"

import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"

export default class scriptManager {
  currentGroup: SceneGroup
  scriptLoader: ScriptLoader

  logger: Logger
  constructor(currentGroup: SceneGroup) {
    this.currentGroup = currentGroup
    this.scriptLoader = new ScriptLoader()
    this.logger = new Logger("ScriptManager", 0xff7f50)
  }

  getFunctionName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1)
  }

  async EVENT_ANY_MONSTER_DIE() {
    if (this.currentGroup.trigger?.length > 0) await EVENT_ANY_MONSTER_DIE(this)
  }

  async EVENT_ANY_MONSTER_LIVE(configIdList: number[]) {
    if (this.currentGroup.trigger?.length > 0)
      await EVENT_ANY_MONSTER_LIVE(
        this,
        configIdList.map((configId) => configId.toString())
      )
  }

  async EVENT_GADGET_CREATE(configIdList: number[]) {
    if (this.currentGroup.trigger?.length > 0)
      await EVENT_GADGET_CREATE(
        this,
        configIdList.map((configId) => configId.toString())
      )
  }

  async EVENT_GADGET_STATE_CHANGE(configId: number, state: number) {
    if (this.currentGroup.trigger?.length > 0)
      await EVENT_GADGET_STATE_CHANGE(this, configId.toString(), state.toString())
  }

  async EVENT_SELECT_OPTION(configId: number, optionid: number) {
    if (this.currentGroup.trigger?.length > 0) await EVENT_SELECT_OPTION(this, configId.toString(), optionid.toString())
  }
}
