import config from "@/config"
import { patchGame, unpatchGame } from "@/tools/patcher"
import translate from "@/translate"
import { CommandDefinition } from ".."

const gpatchCommand: CommandDefinition = {
  name: "gpatch",
  usage: 4,
  args: [
    { name: "mode", type: "str", values: ["patch", "unpatch"] },
    { name: "gameDir", type: "str", optional: true },
  ],
  exec: async (cmdInfo) => {
    const { args, cli } = cmdInfo
    const { print, printError } = cli

    const [mode, gameDir] = args
    try {
      switch (mode) {
        case "patch":
          await patchGame(gameDir || config.gameDir)
          break
        case "unpatch":
          await unpatchGame(gameDir || config.gameDir)
          break
      }
      print(translate("cli.commands.gpatch.info.success"))
    } catch (err) {
      printError((<Error>err).message || err)
    }
  },
}

export default gpatchCommand
