import { CommandDefinition } from ".."

import translate from "@/translate"

const questCommand: CommandDefinition = {
  name: "quest",
  args: [
    { name: "type", type: "str", values: ["start"] },
    { name: "id", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, tty, server, kcpServer } = cmdInfo
    const { print, printError } = cli
    const [type, parentQuestId, uid] = args

    const player = kcpServer.game.getPlayerByUid(uid || sender?.uid)
    if (!player) return printError(translate("generic.playerNotFound"))

    switch (type) {
      case "start": {
        const quest = player.questManager.getMainQuest(parentQuestId)

        if (quest === undefined) {
          const result = await player.questManager.addMainQuest(parentQuestId)

          if (result) print(translate("cli.commands.quest.info.questStart"), parentQuestId)
          else return printError(translate("cli.commands.quest.error.questNotFound"))

          await player.questManager.getMainQuest(parentQuestId).childQuest[0].start(player)
        } else return printError(translate("cli.commands.quest.error.alreadyQuest"))
      }
    }
  },
}

export default questCommand
