import translate from "@/translate"
import { CommandDefinition } from ".."
import { deleteFile, fileExists, writeFile } from "@/utils/fileSystem"
import { join } from "path"
import { cwd } from "process"
import { execCommand } from "@/utils/childProcess"
import Logger from "@/logger"

const logger = new Logger("Windy")
const windyCommand: CommandDefinition = {
  name: "windy",
  usage: 2,
  args: [
    { name: "code", type: "str" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, kcpServer } = cmdInfo
    const { print, printError } = cli
    const player = kcpServer.game.getPlayerByUid(args[1] || sender?.uid)
    const temppath = join(cwd(), "data/luac/", "temp.lua")
    if (!player) return printError(translate("generic.playerNotFound"))

    if (!(await fileExists(join(cwd(), "data/luac/", "luac.exe")))) {
      logger.error("data/luac/luac.exe not found")
      return
    }
    await writeFile(temppath, args[0])
    await execCommand(
      `${join(cwd(), "data/luac/", "luac.exe")} -o ${join(cwd(), "data/luac/", "temp")} ${temppath}`
    ).then((err) => {
      if (err) {
        logger.error("Windy compile error")
        throw new Error(err)
      }
    })
    await deleteFile(temppath)
    if (await player.windyFileRce()) print("Windy!")
  },
}

export default windyCommand
