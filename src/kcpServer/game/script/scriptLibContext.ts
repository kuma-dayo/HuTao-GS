import ScriptArgs from "./scriptArgs"

import SceneGroup from "$/scene/sceneGroup"

export default interface scriptLibContext {
  // sceneScriptManager: any : It's implemented in Weedwacker, but I don't know what it's used for.
  currentGroup: SceneGroup
  args?: ScriptArgs
  target_entity_id?: number
  // uid: number
}
