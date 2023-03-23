import context from "./scriptLibContext"

import Logger from "@/logger"
import { GadgetStateEnum } from "@/types/enum"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  public SetGadgetStateByConfigId(context: context, configId: number | string, gadgetState: number | string) {
    configId = Number(configId)
    gadgetState = Number(gadgetState)

    logger.debug("[lua] Call SetGadgetStateByConfigId", configId, gadgetState)

    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    if (entity) {
      entity.setGadgetState(gadgetState)
      return "0"
    }
  }

  public SetGroupGadgetStateByConfigId(
    context: context,
    groupId: number | string,
    configId: number | string,
    gadgetState: number | string
  ) {
    groupId = Number(groupId)
    configId = Number(configId)
    gadgetState = Number(gadgetState)

    logger.debug("[lua] Call SetGroupGadgetStateByConfigId", groupId, configId, gadgetState)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)

    gadget.setGadgetState(gadgetState)
    return "0"
  }

  public SetWorktopOptionsByGroupId(
    context: context,
    groupId: number | string,
    configId: number | string,
    options: number[] | string[]
  ) {
    groupId = Number(groupId)
    configId = Number(configId)
    options = options.map((option) => Number(option))

    logger.debug("[lua] Call SetWorktopOptionsByGroupId", groupId, configId, options)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    group.gadgetList.find((gadget) => gadget.configId === configId).setWorktopOption(options)

    return "0"
  }

  public SetWorktopOptions(context: context, options: number[] | string[]) {
    options = options.map((option) => Number(option))

    logger.debug("[lua] Call SetWorktopOptions", options)

    context.currentGroup.gadgetList
      .find((gadget) => gadget.configId === Number(context.args.param1))
      .setWorktopOption(options)

    return "0"
  }

  public DelWorktopOptionByGroupId(
    context: context,
    groupId: number | string,
    configId: number | string,
    option: number | string
  ) {
    groupId = Number(groupId)
    configId = Number(configId)
    option = Number(option)

    logger.debug("[lua] Call DelWorktopOptionByGroupId", groupId, configId, option)

    const group = context.currentGroup.block.groupList.find((group) => group.id === Number(groupId))

    const gadget = group.gadgetList.find((gadget) => gadget.configId === configId)

    gadget.setWorktopOption(gadget.worktopOption.filter((Option) => Option != option))
    return "0"
  }

  public AutoMonsterTide(
    context: context,
    chalengeIndex: number | string,
    groupId: number | string,
    ordersConfigId: number | string,
    tideCount: number | string,
    sceneLimit: number | string,
    param6: number | string
  ) {
    chalengeIndex = Number(chalengeIndex)
    groupId = Number(groupId)
    ordersConfigId = Number(ordersConfigId)
    tideCount = Number(tideCount)
    sceneLimit = Number(sceneLimit)
    param6 = Number(param6)

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

  public AddExtraGroupSuite(context: context, groupId: number | string, suite: number | string) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("[lua] Call AddExtraGroupSuite", groupId, suite)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)
    group.addGroupSuite(suite)
  }

  public GoToGroupSuite(context: context, groupId: number | string, suite: number | string) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("[lua] Call GoToGroupSuite", groupId, suite)
  }

  public RemoveExtraGroupSuite(context: context, groupId: number | string, suite: number | string) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("[lua] Call RemoveExtraGroupSuite", groupId, suite)
  }

  public KillExtraGroupSuite(context: context, groupId: number | string, suite: number | string) {
    groupId = Number(groupId)
    suite = Number(suite)

    logger.debug("[lua] Call KillExtraGroupSuite", groupId, suite)
  }

  public ActiveChallenge(
    context: context,
    challengeId: number | string,
    challengeIndex: number | string,
    timeLimitOrGroupId: number | string,
    groupId: number | string,
    objectiveKills: number | string,
    param5: number | string
  ) {
    challengeId = Number(challengeId)
    challengeIndex = Number(challengeIndex)
    timeLimitOrGroupId = Number(timeLimitOrGroupId)
    groupId = Number(groupId)
    objectiveKills = Number(objectiveKills)
    param5 = Number(param5)

    logger.debug(
      "[lua] Call ActiveChallenge",
      challengeId,
      challengeIndex,
      timeLimitOrGroupId,
      groupId,
      objectiveKills,
      param5
    )
  }

  public GetGroupMonsterCountByGroupId(context: context, groupId: number | string) {
    groupId = Number(groupId)

    logger.debug("[lua] Call GetGroupMonsterCountByGroupId", groupId)

    const group = context.currentGroup.block.groupList.find((group) => group.id === groupId)

    return group.aliveMonsterCount.toString()
  }

  public GetGroupVariableValue(context: context, variable: string) {
    variable = `${variable.charAt(0).toUpperCase() + variable.slice(1)}`.replace(/_([a-z])/g, (match, p1) =>
      p1.toUpperCase()
    )

    logger.debug("[lua] Call GetGroupVariableValue", variable)

    const groupVariable = context.currentGroup.Variables.find((Variable) => Variable.Name === variable)

    return groupVariable.Value.toString()
  }

  public SetGroupVariableValue(context: context, variable: string, value: number | string) {
    value = Number(value)

    logger.debug("[lua] Call SetGroupVariableValue", variable, value)
  }

  public ChangeGroupVariableValue(context: context, variable: string, value: number | string) {
    value = Number(value)

    logger.debug("[lua] Call ChangeGroupVariableValue", variable, value)

    context.currentGroup.Variables.find((Variable) => Variable.Name === variable).Value = value
    return "0"
  }

  public PrintContextLog(context: context, msg: string) {
    logger.debug(msg)
  }

  public TowerCountTimeStatus(context: context, isDone: number | string) {
    isDone = Number(isDone)

    logger.debug("[lua] Call TowerCountTimeStatus", isDone)
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("[lua] Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount.toString()
  }

  public SetMonsterBattleByGroupId(context: context, var1: number | string, var2: number | string) {
    var1 = Number(var1)
    var2 = Number(var2)
    logger.debug("[lua] Call SetMonsterBattleByGroupId", var1, var2)
  }

  public CauseDungeonFail(context: context) {
    logger.debug("[lua] Call CauseDungeonFail")
  }

  public GetGroupVariableValueByGroup(context: context, name: string, groupId: number | string) {
    groupId = Number(groupId)

    logger.debug("[lua] Call GetGroupVariableValueByGroup", name, groupId)
  }

  public SetIsAllowUseSkill(context: context, canUse: number | string) {
    canUse = Number(canUse)

    logger.debug("[lua] Call SetIsAllowUseSkill", canUse)
  }

  public KillEntityByConfigId(context: context, table: any) {
    logger.debug("[lua] Call KillEntityByConfigId", table)
  }

  public SetGroupVariableValueByGroup(context: context, key: string, value: number | string, groupId: number | string) {
    value = Number(value)
    groupId = Number(groupId)

    logger.debug("[lua] Call SetGroupVariableValueByGroup", key, value, groupId)
  }

  public CreateMonster(context: context, table: { config_id: number | string; delay_time: number | string }) {
    table.config_id = Number(table.config_id)
    table.delay_time = Number(table.delay_time)

    logger.debug("[lua] Call CreateMonster", table)

    context.currentGroup.CreateMonster(table.config_id, table.delay_time)

    return "0"
  }

  public TowerMirrorTeamSetUp(context: context, team: number | string) {
    team = Number(team)

    logger.debug("[lua] Call TowerMirrorTeamSetUp", team)
  }

  public CreateGadget(context: context, table: any) {
    logger.debug("[lua] Call CreateGadget", table)
  }

  public CheckRemainGadgetCountByGroupId(context: context, table: any) {
    logger.debug("[lua] Call CheckRemainGadgetCountByGroupId", table)
  }

  public GetGadgetStateByConfigId(context: context, groupId: number | string, configId: number | string) {
    groupId = Number(groupId)
    configId = Number(configId)

    logger.debug("[lua] Call GetGadgetStateByConfigId", groupId, configId)
  }

  public MarkPlayerAction(context: context, var1: number | string, var2: number | string, var3: number | string) {
    var1 = Number(var1)
    var2 = Number(var2)
    var3 = Number(var3)

    logger.debug("[lua] Call MarkPlayerAction", var1, var2, var3)
  }

  public AddQuestProgress(context: context, var1: number | string) {
    var1 = Number(var1)

    logger.debug("[lua] Call AddQuestProgress", var1)
  }

  public ChangeGroupGadget(context: context, table: { config_id: number | string; state: GadgetStateEnum }) {
    table.config_id = Number(table.config_id)
    table.state = Number(table.state)

    logger.debug("[lua] Call ChangeGroupGadget", table)

    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === table.config_id)

    if (!entity) {
    } else {
      entity.setGadgetState(table.state)
      return "0"
    }
  }

  public GetEntityType(context: context, entityId: number | string) {
    entityId = Number(entityId)

    logger.debug("[lua] Call GetEntityType", entityId)
  }

  public GetQuestState(context: context, entityId: number | string, questId: number | string) {
    entityId = Number(entityId)

    logger.debug("[lua] Call GetQuestState", entityId, questId)
  }

  public ShowReminder(context: context, reminderId: number | string) {
    reminderId = Number(reminderId)

    logger.debug("[lua] Call ShowReminder", reminderId)
  }

  public ShowReminderRadius(context: context, reminderID: number | string, location: any, var4: number | string) {
    reminderID = Number(reminderID)
    location = Number(location)
    var4 = Number(var4)

    logger.debug("[lua] Call ShowReminderRadius", reminderID, location, var4)
  }

  public BeginCameraSceneLook(
    context: context,
    table: {
      look_pos: { x: string | number; y: string | number; z: string | number }
      duration: string | number
      is_force: boolean
      is_broadcast: boolean
      is_recover_keep_current: boolean
      delay: string | number
    }
  ) {
    table.look_pos.x = Number(table.look_pos.x)
    table.look_pos.y = Number(table.look_pos.y)
    table.look_pos.z = Number(table.look_pos.z)

    table.duration = Number(table.duration)
    table.delay = Number(table.delay)

    logger.debug("[lua] Call BeginCameraSceneLook", table)
  }

  public SetPlatformRouteId(context: context, var2: number | string, routeId: number | string) {
    var2 = Number(var2)

    logger.debug("[lua] Call SetPlatformRouteId", var2, routeId)
  }

  public CreateGroupTimerEvent(context: context, unk: number | string, unk2: number | string, unk3: number | string) {
    unk = Number(unk)
    unk2 = Number(unk2)
    unk3 = Number(unk3)

    logger.debug("[lua] Call CreateGroupTimerEvent", unk, unk2, unk3)
  }

  public SetGroupReplaceable(context: context, unk: number | string, unk2: number | string) {
    unk = Number(unk)
    unk2 = Number(unk2)

    logger.debug("[lua] Call SetGroupReplaceable", unk, unk2)
  }

  public PrintLog(context: context, message: string) {
    logger.debug("[lua] PrintLog: ", message)
  }

  public RemoveEntityByConfigId(
    context: context,
    groupId: number | string,
    entityType: number | string,
    configId: number | string
  ) {
    groupId = Number(groupId)
    entityType = Number(entityType)
    configId = Number(configId)

    logger.debug("[lua] Call RemoveEntityByConfigId", groupId, entityType, configId)
  }

  public RefreshGroup(context: context, table: { group_id: number | string; suite: number | string }) {
    table.group_id = Number(table.group_id)
    table.suite = Number(table.suite)

    logger.debug("[lua] Call RefreshGroup", table)

    const group = context.currentGroup.block.groupList.find((group) => group.id === table.group_id)

    if (group) {
      group.RefreshGroup(table.suite)
      return "0"
    }
  }

  public GetHostQuestState(context: context, questId: number | string) {
    questId = Number(questId)

    logger.debug("[lua] Call GetHostQuestState", questId)
  }
}
