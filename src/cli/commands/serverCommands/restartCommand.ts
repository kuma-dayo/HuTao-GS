import { CommandDefinition } from ".."

import CLI from "@/cli"
import Server from "@/server"

const restartCommand: CommandDefinition = {
  name: "restart",
  exec: async (cmdInfo) => {
    const { cli, server } = cmdInfo as { cli: CLI; server: Server }

    cli.stop()
    await server.restart()
  },
}

export default restartCommand
