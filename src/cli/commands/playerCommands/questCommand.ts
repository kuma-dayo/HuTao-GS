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
  exec: async ({ args, sender, cli, kcpServer }) => {
    const { print, printError } = cli
    const [type, questId, uid = sender?.uid] = args
    const parentQuestId = Math.floor(questId / 100)
    const player = kcpServer.game.getPlayerByUid(uid)

    if (!player) return printError(translate("generic.playerNotFound"))

    const mainQuest = player.questManager.getMainQuest(parentQuestId)

    switch (type) {
      case "add": {
        if (mainQuest) return printError(translate("cli.commands.quest.error.alreadyMainQuest"))

        const result = await player.questManager.addMainQuest(parentQuestId)

        if (result) print(translate("cli.commands.quest.info.mainQuestAdd", parentQuestId))
        else return printError(translate("cli.commands.quest.error.mainQuestNotFound"))

        break
      }
      case "accept": {
        if (!mainQuest) return printError(translate("cli.commands.quest.error.mainQuestNotAdded"))

        const subQuest = mainQuest.childQuest.find((quest) => quest.subQuestId === questId)

        if (!subQuest) return printError(translate("cli.commands.quest.error.subQuestNotFound"))

        const result = await subQuest.accept(player)

        if (result) print(translate("cli.commands.quest.info.subQuestAccept", questId))
        else return printError(translate("cli.commands.quest.error.questNotAdded"))
        break
      }
      case "remove": {
        const result = await player.questManager.removeMainQuest(parentQuestId)

        if (result) print(translate("cli.commands.quest.info.mainQuestRemove", parentQuestId))
        else return printError(translate("cli.commands.quest.error.mainQuestNotFound"))
        break
      }
      default:
        return printError(translate("cli.commands.quest.error.invalidType"))
    }
  },
}

export default questCommand
