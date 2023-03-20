import { CommandDefinition } from ".."

import constCommand from "./constCommand"
import damageCommand from "./damage"
import equipCommand from "./equipCommand"
import godCommand from "./godCommand"
import guidCommand from "./guidCommand"
import healCommand from "./healCommand"
import nocdCommand from "./nocdCommand"
import rechargeCommand from "./rechargeCommand"
import setcsCommand from "./setcsCommand"
import setfpCommand from "./setfpCommand"
import switchelementCommand from "./switchelementCommand"

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
  damageCommand,
]

export default avatarCommands
