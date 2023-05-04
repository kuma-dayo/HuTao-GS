import ScriptArgs from "../scriptArgs"
import scriptLibContext from "../scriptLibContext"
import scriptManager from "../scriptManager"

import { EventTypeEnum } from "@/types/enum"

export default async function EVENT_DUNGEON_SETTLE(scriptManager: scriptManager) {
  const { scriptLoader, logger, currentGroup } = scriptManager

  for (const sceneGroup of currentGroup.block.groupList) {
    let lua = await scriptLoader.init(sceneGroup.block.scene.id, sceneGroup.id)

    try {
      sceneGroup.trigger.map((trigger) => {
        if (trigger.Event == EventTypeEnum.EVENT_DUNGEON_SETTLE) {
          const condition = lua.global.get(scriptManager.getFunctionName(trigger.Condition))
          const action = lua.global.get(scriptManager.getFunctionName(trigger.Action))

          if (trigger.Condition != "") {
            const conditionResult = <boolean>condition(
              <scriptLibContext>{ currentGroup: sceneGroup },
              <ScriptArgs>{
                param1: sceneGroup.block.scene.ischallenge ? 0 : 1,
              }
            )

            logger.verbose(`[lua] EVENT_DUNGEON_SETTLE Condition ${conditionResult}`)

            if (conditionResult == true && trigger.Action != "") {
              logger.verbose("[lua] EVENT_DUNGEON_SETTLE Action")

              action(
                <scriptLibContext>{
                  currentGroup: sceneGroup,
                  args: { param1: sceneGroup.block.scene.ischallenge ? 0 : 1 },
                },
                null
              )
            }
          } else {
            logger.verbose("[lua] EVENT_DUNGEON_SETTLE Action")

            action(
              <scriptLibContext>{
                currentGroup: sceneGroup,
                args: { param1: sceneGroup.block.scene.ischallenge ? 0 : 1 },
              },
              null
            )
          }
        }
      })
    } finally {
      lua.global.close()
    }
  }
}
