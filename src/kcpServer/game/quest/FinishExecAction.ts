import { QuestExec } from "./enum"

import BaseClass from "#/baseClass"
import QuestManager from "$/manager/questManager"
import Player from "$/player"
import Logger from "@/logger"
import { toCamelCase } from "@/utils/string"

const logger = new Logger("FinishExecAction", 0xbc9302)
export default class FinishExecAction extends BaseClass {
  manager: QuestManager

  constructor(manager: QuestManager) {
    super()

    this.manager = manager
    super.initHandlers(this)
  }

  async runAction(content: QuestExec, param: string[], player: Player): Promise<void> {
    logger.debug("FinishExecAction:", content, param)
    await this.emit(toCamelCase(QuestExec[content].replace("QUEST_EXEC_", "")), param, player)
  }

  /** Event **/

  // None

  // DelPackItem

  // UnlockPoint

  // UnlockArea

  // UnlockForce

  // LockForce

  // ChangeAvatarElement

  // RefreshGroupMonster

  // SetIsFlyable

  // SetIsWeatherLocked

  // SetIsGameTimeLocked

  // SetIsTransferable

  // GrantTrialAvatar

  // OpenBored

  // RollbackQuest

  // NotifyGroupLua

  // SetOpenState

  // LockPoint

  // DelPackItemBatch

  // RefreshGroupSuite

  // RemoveTrialAvatar

  // SetGameTime

  // SetWeatherGadget

  // AddQuestProgress

  // NotifyDailyTask

  // CreatePatternGroup

  // RemovePatternGroup

  // RefreshGroupSuiteRandom

  // ActiveItemGiving

  // DelAllSpecificPackItem

  // RollbackParentQuest

  // LockAvatarTeam

  // UnlockAvatarTeam

  // UpdateParentQuestRewardIndex

  // SetDailyTaskVar

  // IncDailyTaskVar

  // DecDailyTaskVar

  // ActiveActivityCondState

  // InactiveActivityCondState

  // AddCurAvatarEnergy

  // StartBargain

  // StopBargain

  // SetQuestGlobalVar

  // IncQuestGlobalVar

  // DecQuestGlobalVar

  // RegisterDynamicGroup

  // UnregisterDynamicGroup

  // SetQuestVar

  // IncQuestVar

  // DecQuestVar

  // RandomQuestVar

  // ActivateScanningPic

  // ReloadSceneTag

  // RegisterDynamicGroupOnly

  // ChangeSkillDepot

  // AddSceneTag

  // DelSceneTag

  // InitTimeVar

  // ClearTimeVar

  // ModifyClimateArea

  // GrantTrialAvatarAndLockTeam

  // ChangeMapAreaState

  // DeactiveItemGiving

  // ChangeSceneLevelTag

  // UnlockPlayerWorldScene

  // LockPlayerWorldScene

  // FailMainCoop

  // ModifyWeatherArea

  // ModifyAranaraCollectionState

  // GrantTrialAvatarBatchAndLockTeam

  // Unknown
}
