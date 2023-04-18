import { CommandDefinition } from ".."

import translate from "@/translate"

const questCommand: CommandDefinition = {
  name: "quest",
  args: [
    { name: "type", type: "str", values: ["add", "accept", "remove"] },
    { name: "id", type: "int" },
    { name: "uid", type: "int", optional: true },
  ],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, sender, cli, tty, server, kcpServer } = cmdInfo
    const { print, printError } = cli
    const [type, questId, uid] = args
    const parentQuestId: number = Math.floor(questId / 100)

    const player = kcpServer.game.getPlayerByUid(uid || sender?.uid)
    if (!player) return printError(translate("generic.playerNotFound"))

    const mainQuest = player.questManager.getMainQuest(parentQuestId)

    switch (type) {
      case "add": {
        if (mainQuest !== undefined) return printError(translate("cli.commands.quest.error.alreadyMainQuest"))

        const result = await player.questManager.addMainQuest(parentQuestId)

        if (result) print(translate("cli.commands.quest.info.mainQuestAdd", parentQuestId))
        else return printError(translate("cli.commands.quest.error.mainQuestNotFound"))
      }
      case "accept": {
        if (mainQuest === undefined) return printError(translate("cli.commands.quest.error.mainQuestNotAdded"))

        const subQuest = mainQuest.childQuest.find((quest) => quest.subQuestId == questId)

        if (subQuest === undefined) return printError(translate("cli.commands.quest.error.subQuestNotFound"))
        const result = await subQuest.accept(player)

        if (result) print(translate("cli.commands.quest.info.subQuestAccept", questId))
        else return printError(translate("cli.commands.quest.error.questNotAdded"))
      }
      case "remove": {
        const result = await player.questManager.removeMainQuest(parentQuestId)

        if (result) print(translate("cli.commands.quest.info.mainQuestRemove", parentQuestId))
        else return printError(translate("cli.commands.quest.error.mainQuestNotFound"))
      }
    }
  },
}

export default questCommand
