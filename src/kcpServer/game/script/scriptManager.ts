import SceneGroup from "$/scene/sceneGroup"
import { LuaFactory } from "wasmoon"
import ScriptLoader from "./scriptLoader"
import { EventTypeEnum, GadgetStateEnum } from "@/types/enum"
import scriptLibContext from "./scriptLibContext"

export default class scriptManager {
  currentGroup: SceneGroup
  scriptLoader: ScriptLoader

  constructor(currentGroup: SceneGroup) {
    this.currentGroup = currentGroup
    this.scriptLoader = new ScriptLoader()
  }
  public async MonsterDeathTrigger() {
    const { currentGroup } = this
    const lua = await this.scriptLoader.init(await new LuaFactory().createEngine())

    this.scriptLoader
      .ScriptByPath(
        lua,
        `Scene/${this.currentGroup.block.scene.id}/scene${this.currentGroup.block.scene.id}_group${this.currentGroup.id}.lua`
      )
      .then((lua) => {
        currentGroup.trigger.map((trigger) => {
          if (trigger.Event == EventTypeEnum.EVENT_ANY_MONSTER_DIE) {
            const condition = lua.global.get(trigger.Condition.charAt(0).toLowerCase() + trigger.Condition.slice(1)) //In sceneData, the first letter of all strings is uppercase. The lua function converts the first letter to lowercase because it is lowercase
            if ((condition({ currentGroup } as scriptLibContext, null) as boolean) == true) {
              const action = lua.global.get(trigger.Action.charAt(0).toLowerCase() + trigger.Action.slice(1))
              action({ currentGroup } as scriptLibContext, null)
            }
          }
        })
      })
  }
}
