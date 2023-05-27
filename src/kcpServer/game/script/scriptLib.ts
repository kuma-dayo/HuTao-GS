import context from "./scriptLibContext"

import BeginCameraSceneLook, { BeginCameraSceneLookNotify } from "#/packets/BeginCameraSceneLook"
import ChallengeFactory from "$/challenge/factory"
import Vector from "$/utils/vector"
import Logger from "@/logger"
import { EntityTypeEnum, EventTypeEnum, GadgetStateEnum } from "@/types/enum"
import { PlayerDieTypeEnum } from "@/types/proto/enum"
import { toCamelCase } from "@/utils/string"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  public SetGadgetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("Call SetGadgetStateByConfigId", configId, gadgetState)

    const gadget = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    gadget?.setGadgetState(gadgetState, true)

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

    const group = scriptManager.getGroup(groupId)

    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)

    gadget.setWorktopOption(gadget.worktopOption.filter((Option) => Option != option))
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
    logger.debug("Call AutoMonsterTide", context, chalengeIndex, groupId, ordersConfigId, tideCount, sceneLimit, param6)
  }

  public AddExtraGroupSuite(context: context, groupId: number, suite: number) {
    const { scriptManager } = context

    logger.debug("Call AddExtraGroupSuite", groupId, suite)

    scriptManager.addGroupSuite(groupId, suite)
  }

  public GoToGroupSuite(_context: context, groupId: number, suite: number) {
    logger.debug("Call GoToGroupSuite", groupId, suite)
  }

  public RemoveExtraGroupSuite(context: context, groupId: number, suite: number) {
    const { scriptManager } = context

    logger.debug("Call RemoveExtraGroupSuite", groupId, suite)

    const group = scriptManager.getGroup(groupId)

    // TODO
    // group.removeGroupSuite(suite)
  }

  public KillExtraGroupSuite(_context: context, groupId: number, suite: number) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("Call KillExtraGroupSuite", groupId, suite)
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

  public ChangeGroupVariableValue(context: context, variable: string, value: number) {
    variable = toCamelCase(variable)

    logger.debug("Call ChangeGroupVariableValue", variable, value)

    context.currentGroup.Variables.find((Variable) => Variable.Name === variable).Value += value

    return 0
  }

  public PrintContextLog(_context: context, msg: string) {
    logger.debug(msg)
  }

  public TowerCountTimeStatus(_context: context, isDone: number) {
    logger.debug("Call TowerCountTimeStatus", isDone)
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount
  }

  public SetMonsterBattleByGroupId(_context: context, var1: number, var2: number) {
    logger.debug("Call SetMonsterBattleByGroupId", var1, var2)
  }

  public CauseDungeonFail(_context: context) {
    logger.debug("Call CauseDungeonFail")
  }

  public GetGroupVariableValueByGroup(_context: context, name: string, groupId: number) {
    logger.debug("Call GetGroupVariableValueByGroup", name, groupId)
  }

  public SetIsAllowUseSkill(_context: context, canUse: number) {
    logger.debug("Call SetIsAllowUseSkill", canUse)
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

    context.currentGroup = scriptManager.getGroup(groupId)

    this.ChangeGroupVariableValue(context, key, value)

    return 0
  }

  public CreateMonster(context: context, table: { config_id: number; delay_time: number }) {
    const { scriptManager, currentGroup } = context

    logger.debug("Call CreateMonster", table)

    scriptManager.CreateMonster(currentGroup.id, table.config_id, table.delay_time)

    return 0
  }

  public TowerMirrorTeamSetUp(_context: context, team: number) {
    logger.debug("Call TowerMirrorTeamSetUp", team)
  }

  public CreateGadget(context: context, table: { config_id: number }) {
    const { scriptManager, currentGroup } = context
    logger.debug("Call CreateGadget", table)

    scriptManager.CreateGadget(currentGroup.id, table.config_id)

    return 0
  }

  public CheckRemainGadgetCountByGroupId(_context: context, table: any) {
    logger.debug("Call CheckRemainGadgetCountByGroupId", table)
  }

  public GetGadgetStateByConfigId(_context: context, groupId: number, configId: number) {
    logger.debug("Call GetGadgetStateByConfigId", groupId, configId)
  }

  public MarkPlayerAction(_context: context, var1: number, var2: number, var3: number) {
    logger.debug("Call MarkPlayerAction", var1, var2, var3)
  }

  public AddQuestProgress(_context: context, var1: number) {
    logger.debug("Call AddQuestProgress", var1)
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

  public GetEntityType(_context: context, entityId: number) {
    logger.debug("Call GetEntityType", entityId)
  }

  public GetQuestState(_context: context, entityId: number, questId: number) {
    logger.debug("Call GetQuestState", entityId, questId)
  }

  public ShowReminder(_context: context, reminderId: number) {
    logger.debug("Call ShowReminder", reminderId)
  }

  public ShowReminderRadius(_context: context, reminderID: number, location: any, var4: number) {
    var4 = Number(var4)

    logger.debug("Call ShowReminderRadius", reminderID, location, var4)
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
  public SetPlatformRouteId(_context: context, var2: number, routeId: number) {
    logger.debug("Call SetPlatformRouteId", var2, routeId)
  }

  public CreateGroupTimerEvent(_context: context, unk: number, unk2: number, unk3: number) {
    logger.debug("Call CreateGroupTimerEvent", unk, unk2, unk3)
  }

  public SetGroupReplaceable(_context: context, unk: number, unk2: number) {
    logger.debug("Call SetGroupReplaceable", unk, unk2)
  }

  public PrintLog(_context: context, message: string) {
    logger.debug("PrintLog: ", message)
  }

  public RemoveEntityByConfigId(_context: context, groupId: number, entityType: number, configId: number) {
    logger.debug("Call RemoveEntityByConfigId", groupId, entityType, configId)
  }

  public RefreshGroup(context: context, table: { group_id: number; suite: number }) {
    const { scriptManager } = context
    logger.debug("Call RefreshGroup", table)

    const groupId = context.currentGroup.block.groupList.find((group) => group.id === table.group_id).id
    scriptManager.RefreshGroup(groupId, table.suite)

    return 0
  }

  public GetHostQuestState(_context: context, questId: number) {
    logger.debug("Call GetHostQuestState", questId)
  }

  public SetGadgetEnableInteract(_context: context, groupid: number, gadgetIris: number, unk: boolean) {
    logger.debug("Call SetGadgetEnableInteract", groupid, gadgetIris, unk)
  }

  public StartSealBattle(_context: context, unk: number, table: any) {
    logger.debug("Call StartSealBattle", unk, table)
  }

  public InitTimeAxis(_context: context, unk: string, unk1: number[], unk2: boolean) {
    logger.debug("Call InitTimeAxis", unk, unk1, unk2)
  }

  public SetMonsterHp(_context: context, groupId: number, configId: number, percent: number) {
    logger.debug("Call SetMonsterHp", groupId, configId)
  }

  public SetWeatherAreaState(_context: context, areaId: number, state: number) {
    logger.debug("Call SetWeatherAreaState", areaId, state)
  }

  public GetRegionEntityCount(_context: context, table: { region_eid: number; entity_type: EntityTypeEnum }) {
    logger.debug("Call GetRegionEntityCount", table)
  }
  public SetEntityServerGlobalValueByConfigId(_context: context, entityId: number, value: string, unk: number) {
    logger.debug("Call SetEntityServerGlobalValueByConfigId", entityId, value, unk)
  }

  public SetPlatformPointArray(_context: context, unk: number, unk2: number, unk3: number[], unk4: any) {
    logger.debug("Call SetPlatformPointArray", unk, unk2, unk3, unk4)
  }

  public SetMonsterBattleByGroup(_context: context, configId: number, groupId: number) {
    logger.debug("Call SetMonsterBattleByGroup", configId, groupId)
  }

  public ScenePlaySound(
    _context: context,
    table: {
      play_pos: { x: number; y: number; z: number }
      sound_name: string
      play_type: number
      is_broadcast: boolean
    }
  ) {
    logger.debug("Call ScenePlaySound", table)
  }

  public RefreshBlossomGroup(_context: context, table: { group_id: number; suite: number; exclude_prev: boolean }) {
    logger.debug("Call RefreshBlossomGroup", table)
  }

  public GetServerTimeByWeek(_context: context) {
    logger.debug("Call GetServerTimeByWeek")
  }

  public RefreshHuntingClueGroup(_context: context) {
    logger.debug("Call RefreshHuntingClueGroup")
  }

  public ChangeDeathZone(_context: context, table: { is_open: boolean }) {
    logger.debug("Call ChangeDeathZone", table)
  }

  public GetDeathZoneStatus(_context: context, param1: number) {
    logger.debug("Call GetDeathZoneStatus", param1)
  }

  public CheckIsInGroup(_context: context, groupId: number, configId: number) {
    logger.debug("Call CheckIsInGroup", groupId, configId)
  }

  public SetGroupLogicStateValue(_context: context, param1: string, param2: number) {
    logger.debug("Call SetGroupLogicStateValue", param1, param2)
  }

  public GetGroupLogicStateValue(_context: context, param1: string) {
    logger.debug("Call GetGroupLogicStateValue", param1)
  }

  public CreateChannellerSlabCampRewardGadget(_context: context, configId: number) {
    logger.debug("Call CreateChannellerSlabCampRewardGadget", configId)
  }
}
