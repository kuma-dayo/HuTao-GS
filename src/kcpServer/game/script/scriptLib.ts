import context from "./scriptLibContext"

import BeginCameraSceneLook, { BeginCameraSceneLookNotify } from "#/packets/BeginCameraSceneLook"
import ChallengeFactory from "$/challenge/factory"
import Vector from "$/utils/vector"
import Logger from "@/logger"
import { EventTypeEnum, GadgetStateEnum } from "@/types/enum"
import { PlayerDieTypeEnum } from "@/types/proto/enum"
import { toCamelCase } from "@/utils/string"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  _
  public ActivateDungeonCheckPoint(_context: context, var1: number) {
    logger.warn("Call unimplemented ActivateDungeonCheckPoint", var1)

    return 0
  }

  public ActivateGroupLinkBundle(_context: context, groupId: number) {
    logger.warn("Call unimplemented ActivateGroupLinkBundle", groupId)

    return 0
  }

  public ActiveChallenge(
    context: context,
    challengeId: number,
    challengeIndex: number,
    timeLimitOrGroupId: number,
    groupId: number,
    objectiveKills: number,
    param5: number
  ) {
    logger.debug(
      "Call ActiveChallenge",
      challengeId,
      challengeIndex,
      timeLimitOrGroupId,
      groupId,
      objectiveKills,
      param5
    )

    const challenge = ChallengeFactory.getChallenge(
      challengeId,
      challengeIndex,
      timeLimitOrGroupId,
      groupId,
      objectiveKills,
      param5,
      context.currentGroup.scene,
      context.currentGroup
    )

    context.currentGroup.scene.activeChallenge = challenge
    challenge.start()

    return 0
  }

  public ActiveGadgetItemGiving(_context: context, var1: number, var2: number, var3: number) {
    logger.warn("Call unimplemented ActiveGadgetItemGiving", var1, var2, var3)

    return 0
  }

  public AddBlossomScheduleProgressByGroupId(_context: context, groupId: number) {
    logger.warn("Call unimplemented AddBlossomScheduleProgressByGroupId", groupId)

    return 0
  }

  public AddEntityGlobalFloatValueByConfigId(_context: context, configId: number, var1: string, var2: number) {
    logger.warn("Call unimplemented AddEntityGlobalFloatValueByConfigId", configId, var1, var2)

    return 0
  }

  public AddExhibitionAccumulableData(_context: context, uid: number, var1: string, var2: number) {
    logger.warn("Call unimplemented AddExhibitionAccumulableData", uid, var1, var2)

    return 0
  }

  //var2 FlowSuiteOperatePolicy enum
  public AddExtraFlowSuite(_context: context, groupId: number, var1: number, var2: number) {
    logger.warn("Call unimplemented AddExtraFlowSuite", groupId, var1, var2)

    return 0
  }

  public AddExtraGroupSuite(context: context, groupId: number, suite: number) {
    const { scriptManager } = context
    logger.debug("Call AddExtraGroupSuite", groupId, suite)
    scriptManager.addGroupSuite(groupId, suite)
  }

  public AddPlayerGroupVisionType(_context: context, uid: number[], var1: number[]) {
    logger.warn("Call unimplemented AddPlayerGroupVisionType", uid, var1)

    return 0
  }

  public AddQuestProgress(_context: context, var1: string) {
    logger.warn("Call unimplemented AddQuestProgress", var1)

    return 0
  }

  public AddRegionalPlayVarValue(_context: context, uid: number, var1: number, var2: number) {
    logger.warn("Call unimplemented AddRegionalPlayVarValue", uid, var1, var2)

    return 0
  }

  public AddSceneTag(_context: context, var1: number, var2: number) {
    logger.warn("Call unimplemented AddSceneTag", var1, var2)

    return 0
  }

  public AddTeamEntityGlobalFloatValue(_context: context, uid: string, var1: string, var2: number) {
    logger.warn("Call unimplemented AddTeamEntityGlobalFloatValue", uid, var1, var2)

    return 0
  }

  public AssignPlayerShowTemplateReminder(
    _context: context,
    var1: number,
    table: { param_uid_vec: any[]; param_vec: any[]; uid_vec: number[] }
  ) {
    logger.warn("Call unimplemented AssignPlayerShowTemplateReminder", var1, table)

    return 0
  }

  public AttachChildChallenge(
    _context: context,
    var1: number,
    var2: number,
    var3: number,
    var4: number[],
    var5: any[],
    table: { success: number; fail: number }
  ) {
    logger.warn("Call unimplemented AttachChildChallenge", var1, var2, var3, var4, var5, table)

    return 0
  }

  public AttachGalleryAbilityGroup(_context: context, var1: any[], galleryID: number, var2: number) {
    logger.warn("Call unimplemented AttachGalleryAbilityGroup", var1, galleryID, var2)

    return 0
  }

  public AutoMonsterTide(
    context: context,
    chalengeIndex: number,
    groupId: number,
    ordersConfigId: number,
    tideCount: number,
    sceneLimit: number,
    param6: number
  ) {
    logger.warn(
      "Call unimplemented AutoMonsterTide",
      context,
      chalengeIndex,
      groupId,
      ordersConfigId,
      tideCount,
      sceneLimit,
      param6
    )

    return 0
  }

  public AutoPoolMonsterTide(
    _context: context,
    var1: number,
    var2: number,
    var3: number[],
    var4: number,
    var5: any[],
    var6: any[],
    table: {
      total_count: number
      min_count: number
      max_count: number
      tag: number
      fill_time: number
      fill_count: number
      is_ordered: boolean
    }
  ) {
    logger.warn("Call unimplemented AutoPoolMonsterTide", var1, var2, var3, var4, var5, var6, table)

    return 0
  }

  public BeginCameraSceneLook(
    context: context,
    table: {
      look_pos: Vector
      is_allow_input: boolean
      duration: number
      is_force: boolean
      is_broadcast: boolean
      is_recover_keep_current: boolean
      delay: number
      is_set_follow_pos: boolean
      follow_pos: Vector
      is_force_walk: boolean
      is_change_play_mode: boolean
      is_set_screen_XY: boolean
      screen_x: number
      screen_y: number
    }
  ) {
    const {
      look_pos,
      is_allow_input,
      duration,
      is_force,
      is_broadcast,
      is_recover_keep_current,
      is_set_follow_pos,
      follow_pos,
      is_force_walk,
      is_change_play_mode,
      is_set_screen_XY,
      screen_x,
      screen_y,
    } = table
    const { scriptManager } = context
    const NotifyData: BeginCameraSceneLookNotify = {
      lookPos: look_pos,
      AllowInput: is_allow_input,
      duration: duration,
      Force: is_force,
      RecoverKeepCurrent: is_recover_keep_current,
      FollowPos: is_set_follow_pos,
      followPos: follow_pos,
      ForceWalk: is_force_walk,
      ChangePlayMode: is_change_play_mode,
      ScreenXY: is_set_screen_XY,
      screenX: screen_x,
      screenY: screen_y,
    }
    logger.debug("Call BeginCameraSceneLook", context.currentGroup.id, table)
    if (is_broadcast) BeginCameraSceneLook.broadcastNotify(context.currentGroup.scene.broadcastContextList, NotifyData)
    else BeginCameraSceneLook.sendNotify(scriptManager.host.context, NotifyData)
    return 0
  }

  public BeginCameraSceneLookWithTemplate(
    _context: context,
    var1: number,
    table: {
      look_configid: number
      look_pos: Vector
      follow_type: number
      follow_pos: Vector
      is_broadcast: boolean
      delay: number
    }
  ) {
    logger.warn("Call unimplemented BeginCameraSceneLookWithTemplate", var1, table)
    return 0
  }

  public CancelGroupTimerEvent(_context: context, groupId: number, var1: string) {
    logger.warn("Call unimplemented CancelGroupTimerEvent", groupId, var1)

    return 0
  }

  public CauseDungeonFail(_context: context) {
    logger.warn("Call unimplemented CauseDungeonFail")

    return 0
  }

  public ChangeDeathZone(_context: context, var1: number, table: { is_open: boolean }) {
    logger.warn("Call unimplemented ChangeDeathZone", var1, table)

    return 0
  }

  public ChangeGroupGadget(context: context, table: { config_id: number; state: GadgetStateEnum }) {
    logger.debug("Call ChangeGroupGadget", table)
    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === table.config_id)
    if (!entity) {
    } else {
      entity.setGadgetState(table.state)
      return 0
    }
  }

  public ChangeGroupVariableValue(context: context, variable: string, value: number) {
    variable = toCamelCase(variable)
    logger.debug("Call ChangeGroupVariableValue", variable, value)
    context.currentGroup.Variables.find((Variable) => Variable.Name === variable).Value += value
    return 0
  }

  public ChangeGroupVariableValueByGroup(context: context, variable: string, value: number, groupId: number) {
    variable = toCamelCase(variable)
    logger.debug("Call ChangeGroupVariableValueByGroup", variable, value, groupId)

    const group = context.scriptManager.getGroup(groupId)

    group.Variables.find((Variable) => Variable.Name === variable).Value += value

    return 0
  }

  public ChangeToTargetLevelTag(_context: context, var1: number) {
    logger.warn("Call unimplemented ChangeToTargetLevelTag", var1)

    return 0
  }

  public ChangeToTargetLevelTagWithParamTable(
    _context: context,
    var1: number,
    table: {
      pos: Vector
      radius: number
      rot: Vector
    }
  ) {
    logger.warn("Call unimplemented ChangeToTargetLevelTagWithParamTable", var1, table)

    return 0
  }

  public CheckIsInGroup(_context: context, groupId: number, gadgetId: number) {
    logger.warn("Call unimplemented CheckIsInGroup", groupId, gadgetId)

    return 0
  }

  public CheckIsInMpMode(_context: context) {
    logger.warn("Call unimplemented CheckIsInMpMode")

    return 0
  }

  public CheckRemainGadgetCountByGroupId(_context: context, table: { group_id: number }) {
    logger.warn("Call unimplemented CheckRemainGadgetCountByGroupId", table)

    return 0
  }

  public CheckSceneTag(_context: context, var1: number, var2: number) {
    logger.warn("Call unimplemented CheckSceneTag", var1, var2)

    return 0
  }

  public ClearPlayerEyePoint(_context: context, var1: number) {
    logger.warn("Call unimplemented ClearPlayerEyePoint", var1)

    return 0
  }

  public ClearPoolMonsterTide(_context: context, groupId: number, var1: number) {
    logger.warn("Call unimplemented ClearPoolMonsterTide", groupId, var1)

    return 0
  }

  public ContinueTimeAxis(_context: context, var1: string) {
    logger.warn("Call unimplemented ContinueTimeAxis", var1)

    return 0
  }

  public CreateBlossomChestByGroupId(_context: context, groupId: number, var1: number) {
    logger.warn("Call unimplemented CreateBlossomChestByGroupId", groupId, var1)

    return 0
  }

  public CreateChannellerSlabCampRewardGadget(_context: context, var1: number) {
    logger.warn("Call unimplemented CreateChannellerSlabCampRewardGadget", var1)

    return 0
  }

  public CreateEffigyChallengeMonster(_context: context, var1: number, var2: number[]) {
    logger.warn("Call unimplemented CreateEffigyChallengeMonster", var1, var2)

    return 0
  }

  public CreateFatherChallenge(
    _context: context,
    var1: number,
    var2: number,
    var3: number,
    table: { success: number; fail: number; fail_on_wipe: boolean }
  ) {
    logger.warn("Call unimplemented CreateFatherChallenge", var1, var2, var3, table)

    return 0
  }

  public CreateGadget(context: context, table: { config_id: number }) {
    const { scriptManager, currentGroup } = context
    logger.debug("Call CreateGadget", table)
    scriptManager.CreateGadget(currentGroup.id, table.config_id)
    return 0
  }

  public CreateGadgetByConfigIdByPos(_context: context, configId: number, pos: Vector, rot: Vector) {
    logger.warn("Call unimplemented CreateGadgetByConfigIdByPos", configId, pos, rot)

    return 0
  }

  public CreateGroupTimerEvent(_context: context, var1: number, var2: string, var3: number) {
    logger.warn("Call unimplemented CreateGroupTimerEvent", var1, var2, var3)

    return 0
  }

  public CreateGroupVariable(_context: context, var1: string, var2: number) {
    logger.warn("Call unimplemented CreateGroupVariable", var1, var2)

    return 0
  }

  public CreateMonster(context: context, table: { config_id: number; delay_time: number }) {
    const { scriptManager, currentGroup } = context
    logger.debug("Call CreateMonster", table)
    scriptManager.CreateMonster(currentGroup.id, table.config_id, table.delay_time)
    return 0
  }

  public CreateMonsterByConfigIdByPos(_context: context, var1: number, pos: Vector, rot: Vector) {
    logger.warn("Call unimplemented CreateMonsterByConfigIdByPos", var1, pos, rot)

    return 0
  }

  public CreateMonsterFaceAvatar(
    _context: context,
    table: {
      entity_id: number
      monsters: number[]
      ranges: number[]
      angle: number
    }
  ) {
    logger.warn("Call unimplemented CreateMonsterFaceAvatar", table)

    return 0
  }

  /*  old Code  */
  public SetGadgetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("Call SetGadgetStateByConfigId", configId, gadgetState)
    const gadget = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    if (gadget) gadget.setGadgetState(gadgetState, true)
    else return 1
    return 0
  }
  public SetGroupGadgetStateByConfigId(context: context, groupId: number, configId: number, gadgetState: number) {
    const { scriptManager } = context
    logger.debug("Call SetGroupGadgetStateByConfigId", groupId, configId, gadgetState)
    const group = scriptManager.getGroup(groupId)
    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)
    gadget.setGadgetState(gadgetState)
    return 0
  }
  public SetWorktopOptionsByGroupId(context: context, groupId: number, configId: number, options: number[]) {
    const { scriptManager } = context
    logger.debug("Call SetWorktopOptionsByGroupId", groupId, configId, options)
    const group = scriptManager.getGroup(groupId)
    const gadget = group?.gadgetList.find((gadget) => gadget.configId === configId)
    gadget?.setWorktopOption(options)
    return 0
  }
  public SetWorktopOptions(context: context, options: number[]) {
    logger.debug("Call SetWorktopOptions", options)
    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === Number(context.args.param1))
      .setWorktopOption(options)
    return 0
  }
  public DelWorktopOptionByGroupId(context: context, groupId: number, configId: number, option: number) {
    const { scriptManager } = context
    logger.debug("Call DelWorktopOptionByGroupId", groupId, configId, option)
    const gadget = scriptManager.getGroup(groupId).gadgetList.find((gadget) => gadget.configId === configId)
    gadget.setWorktopOption(gadget.worktopOption.filter((Option) => Option != option))
    return 0
  }

  public GetGroupMonsterCountByGroupId(context: context, groupId: number) {
    const { scriptManager } = context
    logger.debug("Call GetGroupMonsterCountByGroupId", groupId)
    const group = scriptManager.getGroup(groupId)
    return group.aliveMonsterCount
  }
  public GetGroupVariableValue(context: context, variable: string) {
    variable = toCamelCase(variable)
    logger.debug("Call GetGroupVariableValue", variable)
    const groupVariable = context.currentGroup.Variables.find((Variable) => Variable.Name === variable)
    return groupVariable?.Value
  }
  public SetGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("Call SetGroupVariableValue", variable, value)
    const oldvalue = Number(this.GetGroupVariableValue(context, variable))
    context.currentGroup.scene.scriptManager.emit(
      EventTypeEnum.EVENT_VARIABLE_CHANGE,
      context.currentGroup.id,
      oldvalue,
      value
    )
    return 0
  }
  public PrintContextLog(_context: context, msg: string) {
    logger.debug(msg)
  }
  public GetGroupVariableValueByGroup(context: context, name: string, groupId: number) {
    logger.debug("Call GetGroupVariableValueByGroup", name, groupId)
    return context.scriptManager.getGroup(groupId)?.Variables?.find((Variable) => Variable.Name === name)?.Value
  }
  public KillEntityByConfigId(context: context, table: { config_id: number }) {
    logger.debug("Call KillEntityByConfigId", table)
    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === table.config_id)
      .kill(null, PlayerDieTypeEnum.PLAYER_DIE_NONE)
    return 0
  }
  public SetGroupVariableValueByGroup(context: context, key: string, value: number, groupId: number) {
    const { scriptManager } = context
    logger.debug("Call SetGroupVariableValueByGroup", key, value, groupId)
    const variable = scriptManager.getGroup(groupId)?.Variables.find((Variable) => Variable.Name === key)
    if (variable.Value) variable.Value = value
    else return 1
    return 0
  }

  public RefreshGroup(context: context, table: { group_id: number; suite: number }) {
    const { scriptManager } = context
    logger.debug("Call RefreshGroup", table)
    const groupId = context.currentGroup.block.groupList.find((group) => group.id === table.group_id)?.id
    if (groupId) scriptManager.RefreshGroup(groupId, table.suite)
    else return 1
    return 0
  }
}
