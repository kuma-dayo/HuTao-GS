import translate from "@/translate"
import { CommandDefinition } from ".."

const scoinCommand: CommandDefinition = {
  name: "scoin",
  usage: 2,
  args: [
    { name: "amount", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, kcpServer } = cmdInfo
    const { print, printError } = cli
    const [amount, uid] = args
    const player = kcpServer.game.getPlayerByUid(uid || sender?.uid)
    if (!player) return printError(translate("generic.playerNotFound"))

    print(translate("cli.commands.scoin.info.give", amount))

    player.addMora(amount)
  },
}

export default scoinCommand
