import { CommandDefinition } from ".."

import arCommand from "./arCommand"
import hcoinCommand from "./hcoinCommand"
import lightningCommand from "./lightningCommand"
import mcoinCommand from "./mcoinCommand"
import questCommand from "./questCommand"
import scoinCommand from "./scoinCommand"

const playerCommands: CommandDefinition[] = [
  arCommand,
  hcoinCommand,
  mcoinCommand,
  scoinCommand,
  lightningCommand,
  questCommand,
]

export default playerCommands
