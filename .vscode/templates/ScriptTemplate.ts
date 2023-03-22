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

        logger.verbose("[lua] Template Condition")
        if ((condition({ currentGroup } as scriptLibContext, null) as boolean) == true) {
          logger.verbose("[lua] Template Action")

          action({ currentGroup: currentGroup } as scriptLibContext, null)
        }
      }
    })
  } finally {
    lua.global.close()
  }
}
