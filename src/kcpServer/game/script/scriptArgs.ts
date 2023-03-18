export default class ScriptArgs {
  param1: number
  param2: number
  param3: number
  sourceEid: number
  targetEid: number
  constructor(param1: number, param2: number, param3: number, sourceEid: number, targetEid: number) {
    this.param1 = param1
    this.param2 = param2
    this.param3 = param3
    this.sourceEid = sourceEid
    this.targetEid = targetEid
  }
}
