import { GadgetState } from "./constant/gadgetState"
import context from "./scriptLibContext"

import Logger from "@/logger"

const logger = new Logger("ScriptLib", 0xff7f50)

export default class ScriptLib {
  public SetGadGetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGadGetStateByConfigId", configId, gadgetState)

    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === configId)
    if (!entity) {
      return 1
    } else {
      entity.setGadgetState(gadgetState)
      return 0
    }
  }

  public SetGroupGadgetStateByConfigId(context: context, groupId: number, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGroupGadgetStateByConfigId", groupId, configId, gadgetState)
    return 1
  }

  public SetWorktopOptionsByGroupId(context: context, groupId: number, configId: number, options: number[]) {
    logger.debug("[lua] Call SetWorktopOptionsByGroupId", groupId, configId, options)
    return 1
  }

  public SetWorktopOptions(context: context, table: any) {
    logger.debug("[lua] Call SetWorktopOptions", table)
    return 1
  }

  public DelWorktopOptionByGroupId(context: context, groupId: number, configId: number, option: number) {
    logger.debug("[lua] Call DelWorktopOptionByGroupId", groupId, configId, option)
    return 1
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
    return 1
  }

  public AddExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call AddExtraGroupSuite", groupId, suite)
    return 1
  }

  public GoToGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call GoToGroupSuite", groupId, suite)
    return 1
  }

  public RemoveExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call RemoveExtraGroupSuite", groupId, suite)
    return 1
  }

  public KillExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call KillExtraGroupSuite", groupId, suite)
    return 1
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
      context,
      challengeId,
      challengeIndex,
      timeLimitOrGroupId,
      groupId,
      objectiveKills,
      param5
    )
    return 1
  }

  public GetGroupMonsterCountByGroupId(context: context, groupId: number) {
    logger.debug("[lua] Call GetGroupMonsterCountByGroupId", groupId)
    return 1
  }

  public GetGroupVariableValue(context: context, variable: string) {
    logger.debug("[lua] Call GetGroupVariableValue", variable)
    return 1
  }

  public SetGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call SetGroupVariableValue", variable, value)
    return 1
  }

  public ChangeGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call ChangeGroupVariableValue", variable, value)
    return 1
  }

  public PrintContextLog(context: context, msg: string) {
    logger.debug(msg)
    return 1
  }

  public TowerCountTimeStatus(context: context, isDone: number) {
    logger.debug("[lua] Call TowerCountTimeStatus", isDone)
    return 1
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("[lua] Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount
  }

  public SetMonsterBattleByGroupId(context: context, var1: number, var2: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroupId", var1, var2)
    return 1
  }

  public CauseDungeonFail(context: context) {
    logger.debug("[lua] Call CauseDungeonFail")
    return 1
  }

  public GetGroupVariableValueByGroup(context: context, name: string, groupId: number) {
    logger.debug("[lua] Call GetGroupVariableValueByGroup", name, groupId)
    return 1
  }

  public SetIsAllowUseSkill(context: context, canUse: number) {
    logger.debug("[lua] Call SetIsAllowUseSkill", canUse)
    return 1
  }

  public KillEntityByConfigId(context: context, table: any) {
    logger.debug("[lua] Call KillEntityByConfigId", table)
    return 1
  }

  public SetGroupVariableValueByGroup(context: context, key: string, value: number, groupId: number) {
    logger.debug("[lua] Call SetGroupVariableValueByGroup", key, value, groupId)
    return 1
  }

  public CreateMonster(context: context, table: any) {
    logger.debug("[lua] Call CreateMonster", table)
    return 1
  }

  public TowerMirrorTeamSetUp(context: context, team: number) {
    logger.debug("[lua] Call TowerMirrorTeamSetUp", team)
    return 1
  }

  public CreateGadget(context: context, table: any) {
    logger.debug("[lua] Call CreateGadget", table)
    return 1
  }

  public CheckRemainGadgetCountByGroupId(context: context, table: any) {
    logger.debug("[lua] Call CheckRemainGadgetCountByGroupId", table)
    return 1
  }

  public GetGadgetStateByConfigId(context: context, groupId: number, configId: number) {
    logger.debug("[lua] Call GetGadgetStateByConfigId", groupId, configId)
    return 1
  }

  public MarkPlayerAction(context: context, var1: number, var2: number, var3: number) {
    logger.debug("[lua] Call MarkPlayerAction", var1, var2, var3)
    return 1
  }

  public AddQuestProgress(context: context, var1: number) {
    logger.debug("[lua] Call AddQuestProgress", var1)
    return 1
  }

  public ChangeGroupGadget(context: context, table: { config_id: number; state: GadgetState } | any) {
    logger.debug("[lua] Call ChangeGroupGadget", table)

    const entity = context.currentGroup.gadgetList.find((gadget) => gadget.configId === table.config_id)

    if (!entity) {
      return 1
    } else {
      entity.setGadgetState(table.state)
      return 0
    }
  }

  public GetEntityType(context: context, entityId: number) {
    logger.debug("[lua] Call GetEntityType", entityId)
    return 1
  }

  public GetQuestState(context: context, entityId: number, questId: number) {
    logger.debug("[lua] Call GetQuestState", entityId, questId)
    return 1
  }

  public ShowReminder(context: context, reminderId: number) {
    logger.debug("[lua] Call ShowReminder", reminderId)
    return 1
  }

  public ShowReminderRadius(context: context, reminderID: number, location: any, var4: number) {
    logger.debug("[lua] Call ShowReminderRadius", reminderID, location, var4)
    return 1
  }

  public BeginCameraSceneLook(context: context, var2: number) {
    logger.debug("[lua] Call BeginCameraSceneLook", var2)
    return 1
  }

  public SetPlatformRouteId(context: context, var2: number, routeId: number) {
    logger.debug("[lua] Call SetPlatformRouteId", var2, routeId)
    return 1
  }

  public CreateGroupTimerEvent(context: context, unk: number, unk2: number, unk3: number) {
    logger.debug("[lua] Call CreateGroupTimerEvent", unk, unk2, unk3)
    return 1
  }

  public SetGroupReplaceable(context: context, unk: number, unk2: number) {
    logger.debug("[lua] Call SetGroupReplaceable", unk, unk2)
    return 1
  }

  public PrintLog(context: context, message: string) {
    logger.debug("[lua] PrintLog: ", message)
    return 1
  }

  public RemoveEntityByConfigId(context: context, groupId: number, entityType: number, configId: number) {
    logger.debug("[lua] Call RemoveEntityByConfigId", groupId, entityType, configId)
    return 1
  }

  public async RefreshGroup(context: context, table: { group_id: number; suite: number } | any) {
    logger.debug("[lua] Call RefreshGroup", table)
    return 1
  }
}
