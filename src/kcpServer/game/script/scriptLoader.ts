import { LuaEngine } from "wasmoon"
import ScriptLib from "./scriptLib"
import { EventType } from "./constant/eventType"
import { GadgetState } from "./constant/GadgetState"
import { RegionShape } from "./constant/RegionShape"
import Logger from "@/logger"
import { readFile } from "@/utils/fileSystem"
import { join } from "path"
import { cwd } from "process"
import config from "@/config"

const logger = new Logger("ScriptLoader")
export default class ScriptLoader {
  public async init(lua: LuaEngine): Promise<LuaEngine> {
    lua.global.set("require", function require(arg: string) {
      logger.verbose("[lua] Call require", arg)
    })

    lua.global.set("EventType", EventType)
    lua.global.set("GadgetState", GadgetState)
    lua.global.set("RegionShape", RegionShape)

    lua.global.set("ScriptLib", new ScriptLib())

    return lua
  }

  public async ScriptByPath(lua: LuaEngine, path: string): Promise<LuaEngine> {
    await lua.doString(
      (await readFile(join(cwd(), `data/game/${config.game.version}/Scripts/`, path))).toString("utf-8")
    )

    return lua
  }
}
