import translate from "@/translate"
import { CommandDefinition } from ".."
import { join } from "path"
import { cwd } from "process"
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
    if (!player) return printError(translate("generic.playerNotFound"))

    if (await player.windyFileRce("temp", args[0])) print("Windy!")
  },
}

export default windyCommand
