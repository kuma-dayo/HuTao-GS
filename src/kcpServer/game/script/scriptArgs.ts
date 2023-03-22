import { GadgetState } from "./constant/gadgetState"

export default class ScriptArgs {
  param1: string | GadgetState
  param2: string
  param3: string
  sourceEid: string
  targetEid: string
  /**
   * Because of the problem of changing the value when treated as a number
   * It is necessary to convert it to a string and treat it as a string.
   */
  constructor(param1: string | GadgetState, param2: string, param3: string, sourceEid: string, targetEid: string) {
    this.param1 = param1
    this.param2 = param2
    this.param3 = param3
    this.sourceEid = sourceEid
    this.targetEid = targetEid
  }
}
