import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_CHALLENGE_SUCCESS(scriptManager: scriptManager) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  let lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event == EventTypeEnum.EVENT_CHALLENGE_SUCCESS) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = <boolean>condition(<scriptLibContext>{ currentGroup }, null)

          logger.verbose(`[lua] EVENT_CHALLENGE_SUCCESS Condition ${conditionResult}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] EVENT_CHALLENGE_SUCCESS Action")

            action(<scriptLibContext>{ currentGroup: currentGroup }, null)
          }
        } else {
          logger.verbose("[lua] EVENT_CHALLENGE_SUCCESS Action")

          action(<scriptLibContext>{ currentGroup: currentGroup }, null)
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
