import { join } from "path"
import { cwd } from "process"

import { LuaEngine, LuaFactory } from "wasmoon"

import { EventType } from "./constant/eventType"
import { GadgetState } from "./constant/gadgetState"
import { RegionShape } from "./constant/regionShape"
import { SealBattleType } from "./constant/sealBattleType"
import { VisionLevelType } from "./constant/visionLevelType"
import ScriptLib from "./scriptLib"

import config from "@/config"
import Logger from "@/logger"
import { readFile } from "@/utils/fileSystem"

const logger = new Logger("ScriptLoader", 0xff7f50)

export default class ScriptLoader {
  public async init(sceneId: number, groupId: number): Promise<LuaEngine> {
    const lua = await new LuaFactory().createEngine({ traceAllocations: true })

    lua.global.set("require", function require(arg: string) {
      logger.verbose("[lua] Call require", arg)
    })

    lua.global.set("EventType", EventType)
    lua.global.set("GadgetState", GadgetState)
    lua.global.set("RegionShape", RegionShape)
    lua.global.set("SealBattleType", SealBattleType)
    lua.global.set("VisionLevelType", VisionLevelType)

    lua.global.set("ScriptLib", new ScriptLib())

    return await this.ScriptByPath(lua, `Scene/${sceneId}/scene${sceneId}_group${groupId}.lua`)
  }

  public async ScriptByPath(lua: LuaEngine, path: string): Promise<LuaEngine> {
    const script = (await readFile(join(cwd(), `data/game/${config.game.version}/Scripts/`, path))).toString()

    await lua
      .doString(script.replace(/(?<![.\w"])(?<!\d)(-?(?:\d+(?:\.\d*)?|\.\d+))(?![.\w"])/g, "'$1'"))
      .catch((err) => {
        logger.error("[lua] ScriptByPath", path, err)
      })

    return lua
  }
}
