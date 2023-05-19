import context from "./scriptLibContext"

import BeginCameraSceneLook, { BeginCameraSceneLookNotify } from "#/packets/BeginCameraSceneLook"
import DungeonChallenge from "$/challenge/dungeonChallenge"
import Vector from "$/utils/vector"
import Logger from "@/logger"
import { EntityTypeEnum, EventTypeEnum, GadgetStateEnum } from "@/types/enum"
import { PlayerDieTypeEnum } from "@/types/proto/enum"
import { toCamelCase } from "@/utils/string"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  public SetGadgetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGadgetStateByConfigId", configId, gadgetState)

    const gadget = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    gadget?.setGadgetState(gadgetState, true)

    return 0
  }

  public SetGroupGadgetStateByConfigId(context: context, groupId: number, configId: number, gadgetState: number) {
    const { scriptManager } = context
    logger.debug("[lua] Call SetGroupGadgetStateByConfigId", groupId, configId, gadgetState)

    const group = scriptManager.findGroup(groupId)

    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)

    gadget.setGadgetState(gadgetState)
    return 0
  }

  public SetWorktopOptionsByGroupId(context: context, groupId: number, configId: number, options: number[]) {
    const { scriptManager } = context
    logger.debug("[lua] Call SetWorktopOptionsByGroupId", groupId, configId, options)

    const group = scriptManager.findGroup(groupId)

    const gadget = group?.gadgetList.find((gadget) => gadget.configId === configId)

    gadget?.setWorktopOption(options)
    return 0
  }

  public SetWorktopOptions(context: context, options: number[]) {
    logger.debug("[lua] Call SetWorktopOptions", options)

    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === Number(context.args.param1))
      .setWorktopOption(options)

    return 0
  }

  public DelWorktopOptionByGroupId(context: context, groupId: number, configId: number, option: number) {
    const { scriptManager } = context
    logger.debug("[lua] Call DelWorktopOptionByGroupId", groupId, configId, option)

    const group = scriptManager.findGroup(groupId)

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
    logger.debug(
      "[lua] Call AutoMonsterTide",
      context,
      chalengeIndex,
      groupId,
      ordersConfigId,
      tideCount,
      sceneLimit,
      param6
    )
  }

  public AddExtraGroupSuite(context: context, groupId: number, suite: number) {
    const { scriptManager } = context

    logger.debug("[lua] Call AddExtraGroupSuite", groupId, suite)

    const group = scriptManager.findGroup(groupId)
    group.addGroupSuite(suite)
  }

  public GoToGroupSuite(_context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call GoToGroupSuite", groupId, suite)
  }

  public RemoveExtraGroupSuite(context: context, groupId: number, suite: number) {
    const { scriptManager } = context

    logger.debug("[lua] Call RemoveExtraGroupSuite", groupId, suite)

    const group = scriptManager.findGroup(groupId)

    // TODO
    // group.removeGroupSuite(suite)
  }

  public KillExtraGroupSuite(_context: context, groupId: number, suite: number) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("[lua] Call KillExtraGroupSuite", groupId, suite)
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
      "[lua] Call ActiveChallenge",
      challengeId,
      challengeIndex,
      timeLimitOrGroupId,
      groupId,
      objectiveKills,
      param5
    )

    const world = new DungeonChallenge(context.currentGroup, challengeId, challengeIndex, [
      objectiveKills,
      timeLimitOrGroupId,
    ])
    world.start()

    return 0
  }

  public GetGroupMonsterCountByGroupId(context: context, groupId: number) {
    const { scriptManager } = context

    logger.debug("[lua] Call GetGroupMonsterCountByGroupId", groupId)

    const group = scriptManager.findGroup(groupId)

    return group.aliveMonsterCount
  }

  public GetGroupVariableValue(context: context, variable: string) {
    variable = toCamelCase(variable)

    logger.debug("[lua] Call GetGroupVariableValue", variable)

    const groupVariable = context.currentGroup.Variables.find((Variable) => Variable.Name === variable)

    return groupVariable?.Value
  }

  public SetGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call SetGroupVariableValue", variable, value)

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

    logger.debug("[lua] Call ChangeGroupVariableValue", variable, value)

    context.currentGroup.Variables.find((Variable) => Variable.Name === variable).Value = value
    return 0
  }

  public PrintContextLog(_context: context, msg: string) {
    logger.debug(msg)
  }

  public TowerCountTimeStatus(_context: context, isDone: number) {
    logger.debug("[lua] Call TowerCountTimeStatus", isDone)
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("[lua] Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount
  }

  public SetMonsterBattleByGroupId(_context: context, var1: number, var2: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroupId", var1, var2)
  }

  public CauseDungeonFail(_context: context) {
    logger.debug("[lua] Call CauseDungeonFail")
  }

  public GetGroupVariableValueByGroup(_context: context, name: string, groupId: number) {
    logger.debug("[lua] Call GetGroupVariableValueByGroup", name, groupId)
  }

  public SetIsAllowUseSkill(_context: context, canUse: number) {
    logger.debug("[lua] Call SetIsAllowUseSkill", canUse)
  }

  public KillEntityByConfigId(context: context, table: { config_id: number }) {
    logger.debug("[lua] Call KillEntityByConfigId", table)

    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === table.config_id)
      .kill(null, PlayerDieTypeEnum.PLAYER_DIE_NONE)

    return 0
  }

  public SetGroupVariableValueByGroup(context: context, key: string, value: number, groupId: number) {
    const { scriptManager } = context

    logger.debug("[lua] Call SetGroupVariableValueByGroup", key, value, groupId)

    context.currentGroup = scriptManager.findGroup(groupId)

    this.ChangeGroupVariableValue(context, key, value)

    return 0
  }

  public CreateMonster(context: context, table: { config_id: number; delay_time: number }) {
    logger.debug("[lua] Call CreateMonster", table)

    context.currentGroup.CreateMonster(table.config_id, table.delay_time)

    return 0
  }

  public TowerMirrorTeamSetUp(_context: context, team: number) {
    logger.debug("[lua] Call TowerMirrorTeamSetUp", team)
  }

  public CreateGadget(context: context, table: { config_id: number }) {
    logger.debug("[lua] Call CreateGadget", table)

    context.currentGroup.CreateGadget(table.config_id)

    return 0
  }

  public CheckRemainGadgetCountByGroupId(_context: context, table: any) {
    logger.debug("[lua] Call CheckRemainGadgetCountByGroupId", table)
  }

  public GetGadgetStateByConfigId(_context: context, groupId: number, configId: number) {
    logger.debug("[lua] Call GetGadgetStateByConfigId", groupId, configId)
  }

  public MarkPlayerAction(_context: context, var1: number, var2: number, var3: number) {
    logger.debug("[lua] Call MarkPlayerAction", var1, var2, var3)
  }

  public AddQuestProgress(_context: context, var1: number) {
    logger.debug("[lua] Call AddQuestProgress", var1)
  }

  public ChangeGroupGadget(context: context, table: { config_id: number; state: GadgetStateEnum }) {
    logger.debug("[lua] Call ChangeGroupGadget", table)

    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === table.config_id)

    if (!entity) {
    } else {
      entity.setGadgetState(table.state)
      return 0
    }
  }

  public GetEntityType(_context: context, entityId: number) {
    logger.debug("[lua] Call GetEntityType", entityId)
  }

  public GetQuestState(_context: context, entityId: number, questId: number) {
    logger.debug("[lua] Call GetQuestState", entityId, questId)
  }

  public ShowReminder(_context: context, reminderId: number) {
    logger.debug("[lua] Call ShowReminder", reminderId)
  }

  public ShowReminderRadius(_context: context, reminderID: number, location: any, var4: number) {
    var4 = Number(var4)

    logger.debug("[lua] Call ShowReminderRadius", reminderID, location, var4)
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
    logger.debug("[lua] Call BeginCameraSceneLook", context.currentGroup.id, table)

    if (is_broadcast) BeginCameraSceneLook.broadcastNotify(context.currentGroup.scene.broadcastContextList, NotifyData)
    else BeginCameraSceneLook.sendNotify(scriptManager.host.context, NotifyData)

    return 0
  }
  public SetPlatformRouteId(_context: context, var2: number, routeId: number) {
    logger.debug("[lua] Call SetPlatformRouteId", var2, routeId)
  }

  public CreateGroupTimerEvent(_context: context, unk: number, unk2: number, unk3: number) {
    logger.debug("[lua] Call CreateGroupTimerEvent", unk, unk2, unk3)
  }

  public SetGroupReplaceable(_context: context, unk: number, unk2: number) {
    logger.debug("[lua] Call SetGroupReplaceable", unk, unk2)
  }

  public PrintLog(_context: context, message: string) {
    logger.debug("[lua] PrintLog: ", message)
  }

  public RemoveEntityByConfigId(_context: context, groupId: number, entityType: number, configId: number) {
    logger.debug("[lua] Call RemoveEntityByConfigId", groupId, entityType, configId)
  }

  public RefreshGroup(context: context, table: { group_id: number; suite: number }) {
    logger.debug("[lua] Call RefreshGroup", table)

    const group = context.currentGroup.block.groupList.find((group) => group.id === table.group_id)
    group.RefreshGroup(table.suite)

    return 0
  }

  public GetHostQuestState(_context: context, questId: number) {
    logger.debug("[lua] Call GetHostQuestState", questId)
  }

  public SetGadgetEnableInteract(_context: context, groupid: number, gadgetIris: number, unk: boolean) {
    logger.debug("[lua] Call SetGadgetEnableInteract", groupid, gadgetIris, unk)
  }

  public StartSealBattle(_context: context, unk: number, table: any) {
    logger.debug("[lua] Call StartSealBattle", unk, table)
  }

  public InitTimeAxis(_context: context, unk: string, unk1: number[], unk2: boolean) {
    logger.debug("[lua] Call InitTimeAxis", unk, unk1, unk2)
  }

  public SetMonsterHp(_context: context, groupId: number, configId: number, percent: number) {
    logger.debug("[lua] Call SetMonsterHp", groupId, configId)
  }

  public SetWeatherAreaState(_context: context, areaId: number, state: number) {
    logger.debug("[lua] Call SetWeatherAreaState", areaId, state)
  }

  public GetRegionEntityCount(_context: context, table: { region_eid: number; entity_type: EntityTypeEnum }) {
    logger.debug("[lua] Call GetRegionEntityCount", table)
  }
  public SetEntityServerGlobalValueByConfigId(_context: context, entityId: number, value: string, unk: number) {
    logger.debug("[lua] Call SetEntityServerGlobalValueByConfigId", entityId, value, unk)
  }

  public SetPlatformPointArray(_context: context, unk: number, unk2: number, unk3: number[], unk4: any) {
    logger.debug("[lua] Call SetPlatformPointArray", unk, unk2, unk3, unk4)
  }

  public SetMonsterBattleByGroup(_context: context, configId: number, groupId: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroup", configId, groupId)
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
    logger.debug("[lua] Call ScenePlaySound", table)
  }
}
