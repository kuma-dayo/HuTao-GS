import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_GADGET_STATE_CHANGE(scriptManager: scriptManager, configId: number, state: number) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  const lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event == EventTypeEnum.EVENT_GADGET_STATE_CHANGE) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = <boolean>(
            condition(<scriptLibContext>{ currentGroup }, <ScriptArgs>{ param1: state, param2: configId })
          )

          logger.verbose(`[lua] EVENT_GADGET_STATE_CHANGE Condition ${conditionResult} ${state} ${trigger.Condition}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Action")

            action(
              <scriptLibContext>{
                currentGroup: currentGroup,
                args: { param1: state, param2: configId },
              },
              <ScriptArgs>{ param1: state, param2: configId }
            )
          }
        } else {
          logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Action")

          action(
            <scriptLibContext>{
              currentGroup: currentGroup,
              args: { param1: state, param2: configId },
            },
            <ScriptArgs>{ param1: state, param2: configId }
          )
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
