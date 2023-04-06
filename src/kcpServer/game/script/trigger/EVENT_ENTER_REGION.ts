import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_ENTER_REGION(scriptManager: scriptManager, configId: number) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  let lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event == EventTypeEnum.EVENT_ENTER_REGION) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = condition(
            { currentGroup } as scriptLibContext,
            { param1: configId } as ScriptArgs
          ) as boolean

          logger.verbose(`[lua] EVENT_ENTER_REGION Condition ${conditionResult}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] EVENT_ENTER_REGION Action")

            action({ currentGroup: currentGroup, args: { param1: configId } } as scriptLibContext, null)
          }
        } else {
          logger.verbose("[lua] EVENT_ENTER_REGION Action")

          action({ currentGroup: currentGroup, args: { param1: configId } } as scriptLibContext, null)
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
