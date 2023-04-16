import { CommandDefinition } from ".."

import translate from "@/translate"

const questCommand: CommandDefinition = {
  name: "quest",
  //usage: 1,
  args: [
    { name: "type", type: "str", values: ["start"] },
    { name: "id", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  //onlyAllowPlayer: false,
  exec: async (cmdInfo) => {
    const { args, sender, cli, tty, server, kcpServer } = cmdInfo
    const { print, printError } = cli
    const [type, parentQuestId, uid] = args

    const player = kcpServer.game.getPlayerByUid(uid || sender?.uid)
    if (!player) return printError(translate("generic.playerNotFound"))

    switch (type) {
      case "start": {
        await player.questManager.addMainQuest(parentQuestId)
        await player.questManager.getMainQuest(parentQuestId).childQuest[0].start()
      }
    }
  },
}

export default questCommand
