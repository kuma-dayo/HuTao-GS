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

  public async EVENT_ANY_MONSTER_DIE() {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      lua = await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (currentGroup.trigger?.length > 0) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event == EventTypeEnum.EVENT_ANY_MONSTER_DIE) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition)) //In sceneData, the first letter of all strings is uppercase. The lua function converts the first letter to lowercase because it is lowercase
            const action = lua.global.get(this.getFunctionName(trigger.Action))

            logger.verbose("[lua] EVENT_ANY_MONSTER_DIE Condition")
            if ((condition({ currentGroup } as scriptLibContext, null) as boolean) == true) {
              logger.verbose("[lua] EVENT_ANY_MONSTER_DIE Action")

              action({ currentGroup: currentGroup } as scriptLibContext, null)
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }

  public async EVENT_SELECT_OPTION(configId: number, optionid: number) {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      lua = await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (currentGroup.trigger?.length > 0) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event === EventTypeEnum.EVENT_SELECT_OPTION) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition))
            const action = lua.global.get(this.getFunctionName(trigger.Action))
            logger.verbose("[lua] EVENT_SELECT_OPTION Condition")
            if (
              (condition(
                { currentGroup } as scriptLibContext,
                { param1: configId.toString(), param2: optionid.toString() } as ScriptArgs
              ) as boolean) == true
            ) {
              logger.verbose("[lua] EVENT_SELECT_OPTION Action")
              action({ currentGroup: currentGroup } as scriptLibContext, null)
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }
  async EVENT_ANY_MONSTER_LIVE(configIdList: number[]) {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (currentGroup.trigger?.length > 0) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event === EventTypeEnum.EVENT_ANY_MONSTER_LIVE) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition))
            const action = lua.global.get(this.getFunctionName(trigger.Action))

            logger.verbose("[lua] EVENT_ANY_MONSTER_LIVE Condition")

            for (const configId of configIdList) {
              if (
                (condition(
                  { currentGroup } as scriptLibContext,
                  { param1: configId.toString() } as ScriptArgs
                ) as boolean) == true
              ) {
                logger.verbose("[lua] EVENT_ANY_MONSTER_LIVE Action")
                action({ currentGroup: currentGroup } as scriptLibContext, null)
              }
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }
  async EVENT_GADGET_CREATE(configIdList: number[]) {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (currentGroup.trigger?.length > 0) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event === EventTypeEnum.EVENT_GADGET_CREATE) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition))
            const action = lua.global.get(this.getFunctionName(trigger.Action))

            logger.verbose("[lua] EVENT_GADGET_CREATE Condition")

            for (const configId of configIdList) {
              if (
                (condition(
                  { currentGroup } as scriptLibContext,
                  { param1: configId.toString() } as ScriptArgs
                ) as boolean) == true
              ) {
                logger.verbose("[lua] EVENT_GADGET_CREATE Action")
                action({ currentGroup: currentGroup, args: { param1: configId.toString() } } as scriptLibContext, null)
              }
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }
  async EVENT_GADGET_STATE_CHANGE(configId: number, state: number) {
    const { currentGroup } = this
    let lua = await this.scriptLoader.init(await new LuaFactory().createEngine({ traceAllocations: true }))

    try {
      lua = await this.scriptLoader.ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )

      if (currentGroup.trigger?.length > 0) {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event === EventTypeEnum.EVENT_GADGET_STATE_CHANGE) {
            const condition = lua.global.get(this.getFunctionName(trigger.Condition))
            const action = lua.global.get(this.getFunctionName(trigger.Action))

            logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Condition")

            if (
              (condition(
                { currentGroup } as scriptLibContext,
                { param1: state.toString(), param2: configId.toString() } as ScriptArgs
              ) as boolean) == true
            ) {
              logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Action")
              action(
                {
                  currentGroup: currentGroup,
                  args: { param1: state.toString(), param2: configId.toString() },
                } as scriptLibContext,
                null
              )
            }
          }
        })
      }
    } finally {
      lua.global.close()
    }
  }
}
