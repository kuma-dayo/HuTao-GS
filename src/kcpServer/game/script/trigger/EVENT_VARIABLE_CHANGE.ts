import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_VARIABLE_CHANGE(scriptManager: scriptManager, oldValue: number, newValue: number) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  let lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event == EventTypeEnum.EVENT_VARIABLE_CHANGE) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = <boolean>(
            condition(<scriptLibContext>{ currentGroup }, <ScriptArgs>{ param1: oldValue, param2: newValue })
          )

          logger.verbose(`[lua] EVENT_VARIABLE_CHANGE Condition ${conditionResult}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] EVENT_VARIABLE_CHANGE Action")

            action(<scriptLibContext>{ currentGroup: currentGroup, args: { param1: oldValue, param2: newValue } }, null)
          }
        } else {
          logger.verbose("[lua] EVENT_VARIABLE_CHANGE Action")

          action(<scriptLibContext>{ currentGroup: currentGroup, args: { param1: oldValue, param2: newValue } }, null)
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
