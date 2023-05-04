import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_SELECT_OPTION(scriptManager: scriptManager, configId: number, optionid: number) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  const lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event === EventTypeEnum.EVENT_SELECT_OPTION) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = <boolean>condition(
            <scriptLibContext>{ currentGroup },
            <ScriptArgs>{
              param1: configId,
              param2: optionid,
            }
          )

          logger.verbose(`[lua] EVENT_SELECT_OPTION Condition ${conditionResult}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] EVENT_SELECT_OPTION Action")

            action(
              <scriptLibContext>{ currentGroup: currentGroup, args: { param1: configId, param2: optionid } },
              <ScriptArgs>{
                param1: configId,
                param2: optionid,
              }
            )
          }
        } else {
          logger.verbose("[lua] EVENT_SELECT_OPTION Action")

          action(
            <scriptLibContext>{ currentGroup: currentGroup, args: { param1: configId, param2: optionid } },
            <ScriptArgs>{ param1: configId, param2: optionid }
          )
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
