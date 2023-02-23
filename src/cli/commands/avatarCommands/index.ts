import { CommandDefinition } from ".."
import equipCommand from "./equipCommand"
import godCommand from "./godCommand"
import guidCommand from "./guidCommand"
import healCommand from "./healCommand"
import rechargeCommand from "./rechargeCommand"
import setcsCommand from "./setcsCommand"
import setfpCommand from "./setfpCommand"
import constCommand from "./constCommand"
import switchelementCommand from "./switchelementCommand"
import nocdCommand from "./nocdCommand"

const avatarCommands: CommandDefinition[] = [
  godCommand,
  healCommand,
  rechargeCommand,
  guidCommand,
  equipCommand,
  setcsCommand,
  setfpCommand,
  constCommand,
  switchelementCommand,
  nocdCommand,
]

export default avatarCommands
