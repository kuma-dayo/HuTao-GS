import { QuestExec } from "./enum"

import BaseClass from "#/baseClass"
import QuestManager from "$/manager/questManager"
import Player from "$/player"
import Logger from "@/logger"

const logger = new Logger("FinishExecAction", 0xbc9302)
export default class FinishExecAction extends BaseClass {
  manager: QuestManager

  constructor(manager: QuestManager) {
    super()

    this.manager = manager
    super.initHandlers()
  }

  //Hutao-GD https://github.com/kuma-dayo/Hutao-GD/blob/main/src/utils/deobfuscate.ts#L11
  fixString(str: string): string {
    return (str.slice(0, 1).toUpperCase() + str.slice(1)).replace(
      str.includes("Config") ? /_[a-zA-Z]/g : /_[a-z]/g,
      (s) => s.slice(1).toUpperCase()
    )
  }
  async runAction(content: QuestExec, param: string[], player: Player): Promise<void> {
    logger.debug("RunAction:", content, param)
    await this.emit(this.fixString(content.toString().replace("QUEST_EXEC_", "")), param, player)
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
