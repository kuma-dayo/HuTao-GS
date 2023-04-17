import context from "./scriptLibContext"

import DungeonChallenge from "$/dungeon/dungeonChallenge"
import Logger from "@/logger"
import { EntityTypeEnum, GadgetStateEnum } from "@/types/enum"
import { PlayerDieTypeEnum } from "@/types/proto/enum"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  public SetGadgetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGadgetStateByConfigId", configId, gadgetState)

    const gadget = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    gadget?.setGadgetState(gadgetState)

    return 0
  }

  public SetGroupGadgetStateByConfigId(context: context, groupId: number, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGroupGadgetStateByConfigId", groupId, configId, gadgetState)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)

    gadget.setGadgetState(gadgetState)
    return 0
  }

  public SetWorktopOptionsByGroupId(context: context, groupId: number, configId: number, options: number[]) {
    logger.debug("[lua] Call SetWorktopOptionsByGroupId", groupId, configId, options)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    const gadget = group?.gadgetList.find((gadget) => gadget.configId === configId)

    if (gadget) {
      gadget.setWorktopOption(options)
      return 0
    }
  }

  public SetWorktopOptions(context: context, options: number[]) {
    logger.debug("[lua] Call SetWorktopOptions", options)

    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === Number(context.args.param1))
      .setWorktopOption(options)

    return 0
  }

  public DelWorktopOptionByGroupId(context: context, groupId: number, configId: number, option: number) {
    logger.debug("[lua] Call DelWorktopOptionByGroupId", groupId, configId, option)

    const group = context.currentGroup.block.groupList.find((group) => group.id === Number(groupId))

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
    logger.debug("[lua] Call AddExtraGroupSuite", groupId, suite)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)
    group.addGroupSuite(suite)
  }

  public GoToGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call GoToGroupSuite", groupId, suite)
  }

  public RemoveExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call RemoveExtraGroupSuite", groupId, suite)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    // TODO
    // group.removeGroupSuite(suite)
  }

  public KillExtraGroupSuite(context: context, groupId: number, suite: number) {
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
    logger.debug("[lua] Call GetGroupMonsterCountByGroupId", groupId)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    return group.aliveMonsterCount
  }

  public GetGroupVariableValue(context: context, variable: string) {
    variable = (variable.slice(0, 1).toUpperCase() + variable.slice(1)).replace(
      variable.includes("Config") ? /_[a-zA-Z]/g : /_[a-z]/g,
      (s) => s.slice(1).toUpperCase()
    )

    logger.debug("[lua] Call GetGroupVariableValue", variable)

    const groupVariable = context.currentGroup.Variables.find((Variable) => Variable.Name === variable)

    return groupVariable?.Value
  }

  public SetGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call SetGroupVariableValue", variable, value)

    const oldvalue = Number(this.GetGroupVariableValue(context, variable))

    context.currentGroup.scriptManager.EVENT_VARIABLE_CHANGE(oldvalue, value)

    return 0
  }

  public ChangeGroupVariableValue(context: context, variable: string, value: number) {
    variable = (variable.slice(0, 1).toUpperCase() + variable.slice(1)).replace(
      variable.includes("Config") ? /_[a-zA-Z]/g : /_[a-z]/g,
      (s) => s.slice(1).toUpperCase()
    )

    logger.debug("[lua] Call ChangeGroupVariableValue", variable, value)

    context.currentGroup.Variables.find((Variable) => Variable.Name === variable).Value = value
    return 0
  }

  public PrintContextLog(context: context, msg: string) {
    logger.debug(msg)
  }

  public TowerCountTimeStatus(context: context, isDone: number) {
    logger.debug("[lua] Call TowerCountTimeStatus", isDone)
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("[lua] Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount
  }

  public SetMonsterBattleByGroupId(context: context, var1: number, var2: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroupId", var1, var2)
  }

  public CauseDungeonFail(context: context) {
    logger.debug("[lua] Call CauseDungeonFail")
  }

  public GetGroupVariableValueByGroup(context: context, name: string, groupId: number) {
    logger.debug("[lua] Call GetGroupVariableValueByGroup", name, groupId)
  }

  public SetIsAllowUseSkill(context: context, canUse: number) {
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
    logger.debug("[lua] Call SetGroupVariableValueByGroup", key, value, groupId)

    context.currentGroup = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    this.ChangeGroupVariableValue(context, key, value)

    return 0
  }

  public CreateMonster(context: context, table: { config_id: number; delay_time: number }) {
    logger.debug("[lua] Call CreateMonster", table)

    context.currentGroup.CreateMonster(table.config_id, table.delay_time)

    return 0
  }

  public TowerMirrorTeamSetUp(context: context, team: number) {
    logger.debug("[lua] Call TowerMirrorTeamSetUp", team)
  }

  public CreateGadget(context: context, table: { config_id: number }) {
    logger.debug("[lua] Call CreateGadget", table)

    context.currentGroup.CreateGadget(table.config_id)

    return 0
  }

  public CheckRemainGadgetCountByGroupId(context: context, table: any) {
    logger.debug("[lua] Call CheckRemainGadgetCountByGroupId", table)
  }

  public GetGadgetStateByConfigId(context: context, groupId: number, configId: number) {
    logger.debug("[lua] Call GetGadgetStateByConfigId", groupId, configId)
  }

  public MarkPlayerAction(context: context, var1: number, var2: number, var3: number) {
    logger.debug("[lua] Call MarkPlayerAction", var1, var2, var3)

    return 0
  }

  public AddQuestProgress(context: context, var1: number) {
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

  public GetEntityType(context: context, entityId: number) {
    logger.debug("[lua] Call GetEntityType", entityId)
  }

  public GetQuestState(context: context, entityId: number, questId: number) {
    logger.debug("[lua] Call GetQuestState", entityId, questId)
  }

  public ShowReminder(context: context, reminderId: number) {
    logger.debug("[lua] Call ShowReminder", reminderId)
  }

  public ShowReminderRadius(context: context, reminderID: number, location: any, var4: number) {
    var4 = Number(var4)

    logger.debug("[lua] Call ShowReminderRadius", reminderID, location, var4)
  }

  public BeginCameraSceneLook(
    context: context,
    table: {
      look_pos: { x: number; y: number; z: number }
      duration: number
      is_force: boolean
      is_broadcast: boolean
      is_recover_keep_current: boolean
      delay: number
    }
  ) {
    logger.debug("[lua] Call BeginCameraSceneLook", table)
  }

  public SetPlatformRouteId(context: context, var2: number, routeId: number) {
    logger.debug("[lua] Call SetPlatformRouteId", var2, routeId)
  }

  public CreateGroupTimerEvent(context: context, unk: number, unk2: number, unk3: number) {
    logger.debug("[lua] Call CreateGroupTimerEvent", unk, unk2, unk3)
  }

  public SetGroupReplaceable(context: context, unk: number, unk2: number) {
    logger.debug("[lua] Call SetGroupReplaceable", unk, unk2)
  }

  public PrintLog(context: context, message: string) {
    logger.debug("[lua] PrintLog: ", message)
  }

  public RemoveEntityByConfigId(context: context, groupId: number, entityType: number, configId: number) {
    logger.debug("[lua] Call RemoveEntityByConfigId", groupId, entityType, configId)
  }

  public RefreshGroup(context: context, table: { group_id: number; suite: number }) {
    logger.debug("[lua] Call RefreshGroup", table)

    const group = context.currentGroup.block.groupList.find((group) => group.id === table.group_id)
    group.RefreshGroup(table.suite)

    return 0
  }

  public GetHostQuestState(context: context, questId: number) {
    logger.debug("[lua] Call GetHostQuestState", questId)
  }

  public SetGadgetEnableInteract(context: context, groupid: number, gadgetIris: number, unk: boolean) {
    logger.debug("[lua] Call SetGadgetEnableInteract", groupid, gadgetIris, unk)
  }

  public StartSealBattle(context: context, unk: number, table: any) {
    logger.debug("[lua] Call StartSealBattle", unk, table)
  }

  public InitTimeAxis(context: context, unk: string, unk1: number[], unk2: boolean) {
    logger.debug("[lua] Call InitTimeAxis", unk, unk1, unk2)
  }

  public SetMonsterHp(context: context, groupId: number, configId: number, percent: number) {
    logger.debug("[lua] Call SetMonsterHp", groupId, configId)
  }

  public SetWeatherAreaState(context: context, areaId: number, state: number) {
    logger.debug("[lua] Call SetWeatherAreaState", areaId, state)
  }

  public GetRegionEntityCount(context: context, table: { region_eid: number; entity_type: EntityTypeEnum }) {
    logger.debug("[lua] Call GetRegionEntityCount", table)
  }
  public SetEntityServerGlobalValueByConfigId(context: context, entityId: number, value: string, unk: number) {
    logger.debug("[lua] Call SetEntityServerGlobalValueByConfigId", entityId, value, unk)
  }

  public SetPlatformPointArray(context: context, unk: number, unk2: number, unk3: number[], unk4: any) {
    logger.debug("[lua] Call SetPlatformPointArray", unk, unk2, unk3, unk4)
  }

  public SetMonsterBattleByGroup(context: context, configId: number, groupId: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroup", configId, groupId)
  }
}
