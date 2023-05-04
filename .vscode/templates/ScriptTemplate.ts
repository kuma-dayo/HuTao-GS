import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function Template(scriptManager: scriptManager) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  let lua = await scriptLoader.init(scriptManager.currentGroup.block.scene.id, scriptManager.currentGroup.id)

  try {
    currentGroup.trigger.map((trigger) => {
      if (trigger.Event == EventTypeEnum.Template) {
        const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
        const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

        if (trigger.Condition != "") {
          const conditionResult = <boolean>condition(<scriptLibContext>{ currentGroup }, null)

          logger.verbose(`[lua] Template Condition ${conditionResult}`)

          if (conditionResult == true && trigger.Action != "") {
            logger.verbose("[lua] Template Action")

            action(<scriptLibContext>{ currentGroup: currentGroup }, null)
          }
        } else {
          logger.verbose("[lua] Template Action")

          action(<scriptLibContext>{ currentGroup: currentGroup }, null)
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
