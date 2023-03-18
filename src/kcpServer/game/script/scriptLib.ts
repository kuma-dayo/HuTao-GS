import Logger from "@/logger"
import context from "./scriptLibContext"

const logger = new Logger("ScriptLib")

export default class ScriptLib {
  public SetGadGetStateByConfigId(context: context, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGadGetStateByConfigId", context, configId, gadgetState)
    const entityList = context.currentGroup.gadgetList.filter((gadget) => gadget.configId === configId)
    if (!entityList[0]) {
      return 1
    } else {
      for (const entity of entityList) {
        entity.setGadgetState(gadgetState)
      }
      return 0
    }
  }

  public SetGroupGadgetStateByConfigId(context: context, groupId: number, configId: number, gadgetState: number) {
    logger.debug("[lua] Call SetGroupGadgetStateByConfigId", context, groupId, configId, gadgetState)
  }

  public SetWorktopOptionsByGroupId(context: context, groupId: number, configId: number, options: number[]) {
    logger.debug("[lua] Call SetWorktopOptionsByGroupId", context, groupId, configId, options)
  }

  public SetWorktopOptions(context: context, table: any) {
    logger.debug("[lua] Call SetWorktopOptions", context, table)
  }

  public DelWorktopOptionByGroupId(context: context, groupId: number, configId: number, option: number) {
    logger.debug("[lua] Call DelWorktopOptionByGroupId", context, groupId, configId, option)
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
    logger.debug("[lua] Call AddExtraGroupSuite", context, groupId, suite)
  }

  public GoToGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call GoToGroupSuite", context, groupId, suite)
  }

  public RemoveExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call RemoveExtraGroupSuite", context, groupId, suite)
  }

  public KillExtraGroupSuite(context: context, groupId: number, suite: number) {
    logger.debug("[lua] Call KillExtraGroupSuite", context, groupId, suite)
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
  }

  public GetGroupMonsterCountByGroupId(context: context, groupId: number) {
    logger.debug("[lua] Call GetGroupMonsterCountByGroupId", context, groupId)
  }

  public GetGroupVariableValue(context: context, variable: string) {
    logger.debug("[lua] Call GetGroupVariableValue", context, variable)
  }

  public SetGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call SetGroupVariableValue", context, variable, value)
  }

  public ChangeGroupVariableValue(context: context, variable: string, value: number) {
    logger.debug("[lua] Call ChangeGroupVariableValue", context, variable, value)
  }

  public PrintContextLog(context: context, msg: string) {
    logger.debug("[lua] ", context, msg)
  }

  public TowerCountTimeStatus(context: context, isDone: number) {
    logger.debug("[lua] Call TowerCountTimeStatus", context, isDone)
  }

  public GetGroupMonsterCount(context: context) {
    logger.debug("[lua] Call GetGroupMonsterCount")
    return context.currentGroup.aliveMonsterCount
  }

  public SetMonsterBattleByGroupId(context: context, var1: number, var2: number) {
    logger.debug("[lua] Call SetMonsterBattleByGroupId", context, var1, var2)
  }

  public CauseDungeonFail(context: context) {
    logger.debug("[lua] Call CauseDungeonFail")
  }

  public GetGroupVariableValueByGroup(context: context, name: string, groupId: number) {
    logger.debug("[lua] Call GetGroupVariableValueByGroup", context, name, groupId)
  }

  public SetIsAllowUseSkill(context: context, canUse: number) {
    logger.debug("[lua] Call SetIsAllowUseSkill", context, canUse)
  }

  public KillEntityByConfigId(context: context, table: any) {
    logger.debug("[lua] Call KillEntityByConfigId", context, table)
  }

  public SetGroupVariableValueByGroup(context: context, key: string, value: number, groupId: number) {
    logger.debug("[lua] Call SetGroupVariableValueByGroup", context, key, value, groupId)
  }

  public CreateMonster(context: context, table: any) {
    logger.debug("[lua] Call CreateMonster", context, table)
  }

  public TowerMirrorTeamSetUp(context: context, team: number) {
    logger.debug("[lua] Call TowerMirrorTeamSetUp", context, team)
  }

  public CreateGadget(context: context, table: any) {
    logger.debug("[lua] Call CreateGadget", context, table)
  }

  public CheckRemainGadgetCountByGroupId(context: context, table: any) {
    logger.debug("[lua] Call CheckRemainGadgetCountByGroupId", context, table)
  }

  public GetGadgetStateByConfigId(context: context, groupId: number, configId: number) {
    logger.debug("[lua] Call GetGadgetStateByConfigId", context, groupId, configId)
  }

  public MarkPlayerAction(context: context, var1: number, var2: number, var3: number) {
    logger.debug("[lua] Call MarkPlayerAction", context, var1, var2, var3)
  }

  public AddQuestProgress(context: context, var1: number) {
    logger.debug("[lua] Call AddQuestProgress", context, var1)
  }

  public ChangeGroupGadget(context: context, table: any) {
    //table : { config_id: number, state: gadgetstate}
    logger.debug("[lua] Call ChangeGroupGadget", context, table)

    const entityList = context.currentGroup.gadgetList.filter((gadget) => gadget.configId === table.config_id)

    if (!entityList[0]) {
      return 1
    } else {
      for (const entity of entityList) {
        entity.setGadgetState(table.state)
      }
      return 0
    }
  }

  public GetEntityType(context: context, entityId: number) {
    logger.debug("[lua] Call GetEntityType", context, entityId)
  }

  public GetQuestState(context: context, entityId: number, questId: number) {
    logger.debug("[lua] Call GetQuestState", context, entityId, questId)
  }

  public ShowReminder(context: context, reminderId: number) {
    logger.debug("[lua] Call ShowReminder", context, reminderId)
  }

  public ShowReminderRadius(context: context, reminderID: number, location: any, var4: number) {
    logger.debug("[lua] Call ShowReminderRadius", context, reminderID, location, var4)
  }

  public BeginCameraSceneLook(context: context, var2: number) {
    logger.debug("[lua] Call BeginCameraSceneLook", context, var2)
  }

  public SetPlatformRouteId(context: context, var2: number, routeId: number) {
    logger.debug("[lua] Call SetPlatformRouteId", context, var2, routeId)
  }

  public CreateGroupTimerEvent(context: context, unk: number, unk2: number, unk3: number) {
    logger.debug("[lua] Call CreateGroupTimerEvent", context, unk, unk2, unk3)
  }

  public SetGroupReplaceable(context: context, unk: number, unk2: number) {
    logger.debug("[lua] Call SetGroupReplaceable", context, unk, unk2)
  }

  public PrintLog(context: context, message: string) {
    logger.debug("[lua] PrintLog: ", context, message)
  }

  public RemoveEntityByConfigId(context: context, groupId: number, entityType: number, configId: number) {
    logger.debug("[lua] Call RemoveEntityByConfigId", context, groupId, entityType, configId)
  }
}
