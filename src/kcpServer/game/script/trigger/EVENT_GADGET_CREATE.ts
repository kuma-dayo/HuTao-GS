import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_GADGET_CREATE(scriptManager: scriptManager, configIdList: number[]) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  const lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event === EventTypeEnum.EVENT_GADGET_CREATE) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        for (const configId of configIdList) {
          if (trigger.Condition != "") {
            const conditionResult = <boolean>(
              condition(<scriptLibContext>{ currentGroup }, <ScriptArgs>{ param1: configId })
            )

            logger.verbose(`[lua] EVENT_GADGET_CREATE Condition ${conditionResult} ${configId}`)

            if (conditionResult == true && trigger.Action != "") {
              logger.verbose("[lua] EVENT_GADGET_CREATE Action")
              action(<scriptLibContext>{ currentGroup: currentGroup, args: { param1: configId } }, null)
            }
          } else {
            logger.verbose("[lua] EVENT_GADGET_CREATE Action")

            action(<scriptLibContext>{ currentGroup: currentGroup, args: { param1: configId } }, null)
          }
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
