import Monster from "$/entity/monster"
import translate from "@/translate"
import { CommandDefinition } from ".."

const spawnCommand: CommandDefinition = {
  name: "spawn",
  usage: 2,
  args: [
    { name: "id", type: "int" },
    { name: "lv", type: "int" },
    { name: "amount", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, kcpServer } = cmdInfo
    const { print, printError } = cli
    const player = kcpServer.game.getPlayerByUid(args[3] || sender?.uid)

    if (!player) return printError(translate("generic.playerNotFound"))

    const { currentScene, pos } = player
    if (!currentScene || !pos) return printError(translate("generic.playerNoPos"))

    print(translate("cli.commands.spawn.info.spawn", args[0]))

    for (let i = 0; i < args[2]; i++) {
      let entity = new Monster(args[0], player)

      entity.motion.pos.copy(pos)
      entity.bornPos.copy(pos)

      await entity.initNew(args[1])
      await currentScene.entityManager.add(entity)
    }
  },
}

export default spawnCommand
