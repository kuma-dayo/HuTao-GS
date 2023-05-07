import { LuaEngine } from "wasmoon"

import ScriptArgs from "./scriptArgs"
import scriptLibContext from "./scriptLibContext"
import scriptManager from "./scriptManager"

import BaseClass from "#/baseClass"
import { EventTypeEnum } from "@/types/enum"
import { getFunctionName, toCamelCase } from "@/utils/string"

interface conditionFunc {
  (scriptLibContext: scriptLibContext, args: ScriptArgs): boolean
}

interface actionFunc {
  (scriptLibContext: scriptLibContext, args: ScriptArgs): void
}

export default class ScriptTrigger extends BaseClass {
  constructor() {
    super()
    super.initHandlers(this)
  }

  async runTrigger(scriptManager: scriptManager, type: EventTypeEnum, ...args: any[]) {
    const { scriptLoader, currentGroup } = scriptManager
    const lua = await scriptLoader.init(currentGroup.block.scene.id, currentGroup.id)

    if (currentGroup.trigger?.length > 0)
      this.emit(toCamelCase(EventTypeEnum[type].replace("EVENT_", "")), scriptManager, lua, ...args)
  }

  /** Event **/

  // None

  // AnyMonsterDie

  handleAnyMonsterDie(scriptManager: scriptManager, lua: LuaEngine, configId: number) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_ANY_MONSTER_DIE) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = { param1: configId }

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_ANY_MONSTER_DIE Condition ${conditionResult} ${args}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_ANY_MONSTER_DIE Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_ANY_MONSTER_DIE Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // AnyGadgetDie

  // VariableChange

  handleVariableChange(scriptManager: scriptManager, lua: LuaEngine, oldValue: number, newValue: number) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_VARIABLE_CHANGE) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = { param1: oldValue, param2: newValue }

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_VARIABLE_CHANGE Condition ${conditionResult} ${args}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_VARIABLE_CHANGE Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_VARIABLE_CHANGE Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // EnterRegion

  handleEnterRegion(scriptManager: scriptManager, lua: LuaEngine, configId: number) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_ENTER_REGION) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = { param1: configId }

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_ENTER_REGION Condition ${conditionResult} ${args}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_ENTER_REGION Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_ENTER_REGION Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // LeaveRegion

  // GadgetCreate

  handleGadgetCreate(scriptManager: scriptManager, lua: LuaEngine, configIdList: number[]) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_GADGET_CREATE) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        configIdList.forEach((configId) => {
          const context: scriptLibContext = { currentGroup: currentGroup }
          const args: ScriptArgs = { param1: configId }

          if (Condition) {
            const conditionResult: boolean = condition({ ...context, args }, args)
            logger.verbose(`[lua] EVENT_GADGET_CREATE Condition ${conditionResult} ${args}`)

            if (conditionResult && Action) {
              logger.verbose("[lua] EVENT_GADGET_CREATE Action")
              action({ ...context, args }, args)
            }
          } else if (Action) {
            logger.verbose("[lua] EVENT_GADGET_CREATE Action")
            action({ ...context, args }, args)
          }
        })
      })
    } finally {
      lua.global.close()
    }
  }

  // GadgetStateChange

  handleGadgetStateChange(scriptManager: scriptManager, lua: LuaEngine, configId: number, state: number) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_GADGET_STATE_CHANGE) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = { param1: state, param2: configId }

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_GADGET_STATE_CHANGE Condition ${conditionResult} ${args}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_GADGET_STATE_CHANGE Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // DungeonSettle

  handleDungeonSettle(scriptManager: scriptManager, lua: LuaEngine) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.block.groupList.forEach((sceneGroup) => {
        sceneGroup.trigger.forEach(({ Event, Condition, Action }) => {
          if (Event !== EventTypeEnum.EVENT_DUNGEON_SETTLE) return

          const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
          const action: actionFunc = lua.global.get(getFunctionName(Action))

          const context: scriptLibContext = { currentGroup: sceneGroup }
          const args: ScriptArgs = { param1: sceneGroup.scene.ischallenge ? 0 : 1 }

          if (Condition) {
            const conditionResult: boolean = condition({ ...context, args }, args)
            logger.verbose(`[lua] EVENT_DUNGEON_SETTLE Condition ${conditionResult}`)

            if (conditionResult && Action) {
              logger.verbose("[lua] EVENT_DUNGEON_SETTLE Action")
              action({ ...context, args }, args)
            }
          } else if (Action) {
            logger.verbose("[lua] EVENT_DUNGEON_SETTLE Action")
            action({ ...context, args }, args)
          }
        })

        lua.global.resetThread()
      })
    } finally {
      lua.global.close()
    }
  }

  // SelectOption

  handleSelectOption(scriptManager: scriptManager, lua: LuaEngine, configId: number, optionid: number) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_SELECT_OPTION) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = { param1: configId, param2: optionid }

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_SELECT_OPTION Condition ${conditionResult} ${args}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_SELECT_OPTION Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_SELECT_OPTION Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // ClientExecute

  // AnyMonsterLive

  handleAnyMonsterLive(scriptManager: scriptManager, lua: LuaEngine, configIdList: number[]) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_ANY_MONSTER_LIVE) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        configIdList.forEach((configId) => {
          const context: scriptLibContext = { currentGroup: currentGroup }
          const args: ScriptArgs = { param1: configId }

          if (Condition) {
            const conditionResult: boolean = condition({ ...context, args }, args)
            logger.verbose(`[lua] EVENT_ANY_MONSTER_LIVE Condition ${conditionResult} ${args}`)

            if (conditionResult && Action) {
              logger.verbose("[lua] EVENT_ANY_MONSTER_LIVE Action")
              action({ ...context, args }, args)
            }
          } else if (Action) {
            logger.verbose("[lua] EVENT_ANY_MONSTER_LIVE Action")
            action({ ...context, args }, args)
          }
        })
      })
    } finally {
      lua.global.close()
    }
  }
  // SpecificMonsterHPChange

  // CityLevelupUnlockDungeonEntry

  // DungeonBroadcastOnTimer

  // TimerEvent

  // ChallengeSuccess

  handleChallengeSuccess(scriptManager: scriptManager, lua: LuaEngine) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_CHALLENGE_SUCCESS) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = null

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_CHALLENGE_SUCCESS Condition ${conditionResult}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_CHALLENGE_SUCCESS Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_CHALLENGE_SUCCESS Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }

  // ChallengeFail

  handleChallengeFail(scriptManager: scriptManager, lua: LuaEngine) {
    const { currentGroup, logger } = scriptManager

    try {
      currentGroup.trigger.forEach(({ Event, Condition, Action }) => {
        if (Event !== EventTypeEnum.EVENT_CHALLENGE_FAIL) return

        const condition: conditionFunc = lua.global.get(getFunctionName(Condition))
        const action: actionFunc = lua.global.get(getFunctionName(Action))

        const context: scriptLibContext = { currentGroup: currentGroup }
        const args: ScriptArgs = null

        if (Condition) {
          const conditionResult: boolean = condition({ ...context, args }, args)
          logger.verbose(`[lua] EVENT_CHALLENGE_FAIL Condition ${conditionResult}`)

          if (conditionResult && Action) {
            logger.verbose("[lua] EVENT_CHALLENGE_FAIL Action")
            action({ ...context, args }, args)
          }
        } else if (Action) {
          logger.verbose("[lua] EVENT_CHALLENGE_FAIL Action")
          action({ ...context, args }, args)
        }

        return
      })
    } finally {
      lua.global.close()
    }
  }
  // SealBattleBegin

  // SealBattleEnd

  // Gather

  // QuestFinish

  // MonsterBattle

  // CityLevelup

  // CutsceneEnd

  // AvatarNearPlatform

  // PlatformReachPoint

  // UnlockTransPoint

  // QuestStart

  // GroupLoad

  // GroupWillUnload

  // GroupWillRefresh

  // GroupRefresh

  // DungeonRewardGet

  // SpecificGadgetHPChange

  // MonsterTideOver

  // MonsterTideCreate

  // MonsterTideDie

  // SealampPhaseChange

  // BlossomProgressFinish

  // BlossomChestDie

  // GadgetPlayStart

  // GadgetPlayStartCD

  // GadgetPlayStop

  // GadgetLuaNotify

  // MPPlayPrepare

  // MPPlayBattle

  // MPPlayPrepareInterrupt

  // SelectDifficulty

  // SceneMPPlayBattleState

  // SceneMPPlayBattleStageChange

  // SceneMPPlayBattleResult

  // SealBattleProgressDecrease

  // GeneralRewardDie

  // SceneMPPlayBattleInterrupt

  // MonsterDieBeforeLeaveScene

  // SceneMPPlayOpen

  // OfferingLevelup

  // DungeonRevive

  // SceneMPPlayAllAvatarDie

  // DungeonAllAvatarDie

  // GeneralRewardTaken

  // PlatformReachArrayPoint

  // SceneMultistagePlayStageEnd

  // SceneMultistagePlayEndStageReq

  // MechanicusPickedCard

  // PoolMonsterTideOver

  // PoolMonsterTideCreate

  // PoolMonsterTideDie

  // DungeonAvatarSlipDie

  // GalleryStart

  // GalleryStop

  // TimeAxisPass

  // FleurFairDungeonAllPlayerEnter

  // GadgetTalkDone

  // SetGameTime

  // HideAndSeekPlayerQuit

  // AvatarDie

  // SceneMultistagePlayStageStart

  // GalleryProgressPass

  // GalleryProgressEmpty

  // GalleryProgressFull

  // HuntingFinishFinal

  // UseWidgetToyFoxCamera

  // LunaRiteSacrifice

  // SumoSwitchTeamEvent

  // FishingStart

  // FishingStop

  // FishingQTEFinish

  // FishingTimeoutFlee

  // RogueCellStateChange

  // RogueCellConstruct

  // RogueCellFinishSelectCard

  // AnyMonsterCapture

  // ActivityInteractGadget

  // ChallengePause

  // LevelTagChange

  // CustomDungeonStart

  // CustomDungeonRestart

  // CustomDungeonReactive

  // CustomDungeonOutStuck

  // CustomDungeonExitTry

  // CustomDungeonOfficialRestart

  // AnyMonsterCaptureAndDisappear

  // MichiaeInteract

  // SelectUIInteract

  // LuaNotify

  // PhotoFinish

  // IrodoriMasterReady

  // RogueStartFight

  // RogueCreageFightGadget

  // RogueCreageRepairGadget

  // RogueOpenAccess

  // GadgetGivingFinished

  // ObservationPointNotify

  // GadgetGivingTakeback

  // EchoShellInteract

  // PlatformArrival

  // PlayerBackGalleryRevivePoint

  // GalleryCannotStartAfterCountdown
}
