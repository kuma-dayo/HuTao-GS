import translate from "@/translate"
import { CommandDefinition } from ".."

const disconnectCommand: CommandDefinition = {
  name: "disconnect",
  usage: 2,
  args: [{ name: "UID" }, { name: "reason", type: "int", optional: true }],
  allowPlayer: true,
  exec: async (cmdInfo) => {
    const { args, cli, kcpServer } = cmdInfo
    const [uid, reason] = args
    cli.print(translate("cli.commands.disconnect.info.disconnect", uid))
    if (!(await kcpServer.disconnect(parseInt(uid, 16), reason))) await kcpServer.disconnectUid(parseInt(uid, reason))
  },
}

export default disconnectCommand
