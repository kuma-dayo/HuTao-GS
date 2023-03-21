import { join } from "path"
import { cwd } from "process"

import { LuaEngine } from "wasmoon"

import { EventType } from "./constant/eventType"
import { GadgetState } from "./constant/gadgetState"
import { RegionShape } from "./constant/regionShape"
import ScriptLib from "./scriptLib"

import config from "@/config"
import Logger from "@/logger"
import { readFile } from "@/utils/fileSystem"

const logger = new Logger("ScriptLoader", 0xff7f50)

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
    const script = (await readFile(join(cwd(), `data/game/${config.game.version}/Scripts/`, path))).toString()

    const functionIndex = script.indexOf("function")

    if (functionIndex !== -1) {
      await lua.doString(
        script
          .slice(functionIndex - "function".length)
          .replace(/(?<![.\w"])(?<!\d)(-?(?:\d+(?:\.\d*)?|\.\d+))(?![.\w"])/g, '"$1"')
      )

      return lua
    } else {
      lua.global.close()
      return null
    }
  }
}