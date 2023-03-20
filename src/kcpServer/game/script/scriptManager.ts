import { LuaFactory } from "wasmoon"

import ScriptArgs from "./scriptArgs"
import scriptLibContext from "./scriptLibContext"
import ScriptLoader from "./scriptLoader"

import SceneGroup from "$/scene/sceneGroup"
import Logger from "@/logger"
import { EventTypeEnum } from "@/types/enum"

const logger = new Logger("ScriptManager", 0xff7f50)
export default class scriptManager {
  currentGroup: SceneGroup
  scriptLoader: ScriptLoader

  constructor(currentGroup: SceneGroup) {
    this.currentGroup = currentGroup
    this.scriptLoader = new ScriptLoader()
  }

  private getFunctionName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1)
  }
  public async eventAnyMonsterDieTrigger() {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      lua = await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (lua) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event == EventTypeEnum.EVENT_ANY_MONSTER_DIE) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition)) //In sceneData, the first letter of all strings is uppercase. The lua function converts the first letter to lowercase because it is lowercase
            const action = lua.global.get(this.getFunctionName(trigger.Action))

            if ((condition({ currentGroup } as scriptLibContext, null) as boolean) == true) {
              action({ currentGroup: currentGroup } as scriptLibContext, null)
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }

  public async eventSelectOption(configId: number, optionid: number) {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      lua = await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (lua) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event === EventTypeEnum.EVENT_SELECT_OPTION) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition))
            const action = lua.global.get(this.getFunctionName(trigger.Action))
            if (
              (condition(
                { currentGroup } as scriptLibContext,
                { param1: configId, param2: optionid } as ScriptArgs
              ) as boolean) == true
            ) {
              action({ currentGroup: currentGroup } as scriptLibContext, null)
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }
}
